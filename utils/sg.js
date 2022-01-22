/**
 * This file contains the util functions in `$.utils.sg`
 */

/**
 * ## Params
 *
 * - `$`: context
 * - `instanceIds`: A **list** of EC2 instance id
 * - `direction`: `'in'`/`'out'`
 * - `protocol`: e.g. `'tcp'`/`'udp'`/`'icmp'`
 * - `port`: e.g. `22`
 *
 * ## Return
 *
 * ```
 * {
 *   err,
 *   res, // the response of `describeSecurityGroups`, see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/interfaces/describesecuritygroupscommandoutput.html
 *   securityGroupIds: [],
 *   anyTrafficPeer: {
 *     any: true,
 *     cidr: [],
 *     prefix: [],
 *     sg: [{
 *       UserId: '', // aws account id
 *       GroupId: '', // sg id
 *     }],
 *   },
 *   peer: {
 *     any: true,
 *     cidr: [],
 *     prefix: [],
 *     sg: [{
 *       UserId: '', // aws account id
 *       GroupId: '', // sg id
 *     }],
 *   },
 * }
 * ```
 */
async function checkEC2Instances({
  $,
  instanceIds,
  direction,
  protocol,
  port,
}) {
  let securityGroupIds;
  try {
    let res = await $.aws.ec2.describeInstances({ InstanceIds: instanceIds });
    securityGroupIds = $.jp.query(res, "$..SecurityGroups[*].GroupId");
  } catch (err) {
    return { err };
  }

  return {
    securityGroupIds,
    ...(await checkPort({
      $,
      direction,
      securityGroupIds,
      protocol,
      port,
    })),
  };
}

/**
 * ## Params
 *
 * - `$`: context
 * - `direction`: `'in'`/`'out'`
 * - `securityGroupIds`: A **list** of security group id
 * - `protocol`: e.g. `'tcp'`/`'udp'`/`'icmp'`
 * - `port`: e.g. `22`
 *
 * ## Return
 *
 * ```
 * {
 *   err,
 *   res, // the response of `describeSecurityGroups`, see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/interfaces/describesecuritygroupscommandoutput.html
 *   anyTrafficPeer: {
 *     any: true,
 *     cidr: [],
 *     prefix: [],
 *     sg: [{
 *       UserId: '', // aws account id
 *       GroupId: '', // sg id
 *     }],
 *   },
 *   peer: {
 *     any: true,
 *     cidr: [],
 *     prefix: [],
 *     sg: [{
 *       UserId: '', // aws account id
 *       GroupId: '', // sg id
 *     }],
 *   },
 * }
 * ```
 */
async function checkPort({ $, direction, securityGroupIds, protocol, port }) {
  let res;
  try {
    res = await $.aws.ec2.describeSecurityGroups({
      GroupIds: securityGroupIds,
    });
  } catch (err) {
    return { err };
  }

  return {
    anyTrafficPeer: getPeer({ $, res, direction, protocol: "-1" }),
    peer: getPeer({ $, res, direction, protocol, port }),
    res,
  };
}

/**
 * ## Params
 *
 * - `$`: context
 * - `res`: the response of `describeSecurityGroups`, see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/interfaces/describesecuritygroupscommandoutput.html
 * - `direction`: `'in'`/`'out'`
 * - `protocol`: `'tcp'`/`'ucp'`/`'icmp'`/`'-1'`(all)
 * - `port`
 *
 * ## Return
 *
 * ```
 * {
 *   any: true,
 *   cidr: [],
 *   prefix: [],
 *   sg: [{
 *     UserId: '', // aws account id
 *     GroupId: '', // sg id
 *   }],
 * }
 * ```
 */
function getPeer({ $, res, direction, protocol, port }) {
  let result = {
    any: false,
    cidr: [],
    prefix: [],
    sg: [],
  };

  let portCondition =
    protocol == "-1"
      ? "true"
      : `(@.FromPort == -1 || (@.FromPort <= ${port} && @.ToPort >= ${port}))`;

  // get sg rules
  let ipPermissions = $.jp.query(
    res,
    `$..${
      direction == "in" ? "IpPermissions" : "IpPermissionsEgress"
    }[?(@.IpProtocol == '${protocol}' && ${portCondition})]`
  );

  if (ipPermissions.length == 0) return result;

  // get cidrs
  $.jp.query(ipPermissions, `$..CidrIp`).map((cidr) => {
    if (cidr == "0.0.0.0/0") {
      result.any = true;
    } else {
      result.cidr.push(cidr);
    }
  });

  // get prefix ids
  $.jp.query(ipPermissions, `$..PrefixListId`).map((prefix) => {
    result.prefix.push(prefix);
  });

  // get peer sgs
  $.jp
    .query(ipPermissions, `$..UserIdGroupPairs`)
    .flat()
    .map((userSgPair) => {
      result.sg.push(userSgPair);
    });

  return result;
}

export default {
  checkPort,
  getPeer,
  checkEC2Instances,
};
