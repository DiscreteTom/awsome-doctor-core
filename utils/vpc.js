/**
 * This file contains the util functions in `$.utils.vpc`
 */

/**
 * ## Params
 *
 * - `$`: context
 * - `subnetId`
 * - `vpcId`: optional VPC Id
 *
 * ## Return
 *
 * ```
 * {
 *   err,
 *   type: 'any|cidr|no',
 *   cidr: [], // if type == 'cidr
 * }
 * ```
 */
async function checkSubnetIgw({ $, subnetId, vpcId }) {
  let res = await getSubnetRouteTable({ $, subnetId, vpcId });

  if (res.err) {
    return res;
  }

  let igwCidr = $.jp.query(
    res.rt,
    `$.Routes[?(@.GatewayId.startsWith('igw-'))].DestinationCidrBlock`
  );

  if (igwCidr.length !== 0) {
    if (igwCidr.includes("0.0.0.0/0")) {
      return { type: "any" };
    } else {
      return { type: "cidr", cidr: igwCidr };
    }
  } else {
    return { type: "no" };
  }
}

/**
 * ## Params
 *
 * - `$`: context
 * - `subnetId`
 * - `vpcId`: optional VPC Id
 *
 * ## Return
 *
 * ```
 * {
 *   err,
 *   rt, // route table, see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/modules/routetable.html
 * }
 * ```
 */
async function getSubnetRouteTable({ $, subnetId, vpcId }) {
  try {
    let res;
    // find route table by subnet id
    res = await $.aws.ec2.describeRouteTables({
      Filters: [{ Name: "association.subnet-id", Values: [subnetId] }],
    });

    if (res.RouteTables.length !== 0) {
      // route table explicitly associated with the subnet
      return { rt: res.RouteTables[0] };
    } else {
      // use VPC main route table
      if (!vpcId) {
        res = await $.aws.ec2.describeSubnets({
          Filters: [{ Name: "subnet-id", Values: [subnetId] }],
        });
        vpcId = $.jp.query(res, `$..VpcId`)[0];
      }

      res = await $.aws.ec2.describeRouteTables({
        Filters: [{ Name: "vpc-id", Values: [vpcId] }],
      });

      let routeTableId = $.jp.query(
        res,
        "$..Associations[?(@.Main)].RouteTableId"
      )[0];
      return {
        rt: $.jp.query(
          res,
          `$..RouteTables[?(@.RouteTableId=='${routeTableId}')]`
        )[0],
      };
    }
  } catch (err) {
    return { err };
  }
}

export default {
  checkSubnetIgw,
  getSubnetRouteTable,
};
