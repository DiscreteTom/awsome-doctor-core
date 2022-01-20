/**
 * This file contains the util functions in `$.utils.securityGroup`
 */

/**
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
    return { err: res.err };
  }

  let igwCidr = $.jp.query(
    res.rt,
    `$.Routes[?(@.GatewayId.startsWith('igw-'))].DestinationCidrBlock`
  );

  if (igwCidr.length !== 0) {
    if (igwCidr.indexOf("0.0.0.0/0") != -1) {
      return { type: "any" };
    } else {
      return { type: "cidr", cidr: igwCidr };
    }
  } else {
    return { type: "no" };
  }
}

/**
 * ## Return
 *
 * ```
 * {
 *   err,
 *   rt, // route table, see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/modules/routetable.html
 * }
 * ```
 */
async function getSubnetRouteTable({ $, vpcId, subnetId }) {
  try {
    let res;
    // find route table by subnet id
    res = await $.aws.ec2.describeRouteTables({
      Filters: [{ Name: "association.subnet-id", Values: [subnetId] }],
    });

    if (res.RouteTables.length !== 0) {
      // which means explicitly associated a route table
      return { rt: res.RouteTables[0] };
    } else {
      // use VPC main route table
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
