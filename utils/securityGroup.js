/**
 * This file contains the util functions in `$.utils.securityGroup`
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
 *     type: 'any|cidr|no',
 *     cidr: [], // if type == 'cidr'
 *   },
 *   portPeer: {
 *     type: 'any|cidr|no',
 *     cidr: [], // if type == 'cidr'
 *   }
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
    ...(await checkPort({ $, direction, securityGroupIds, protocol, port })),
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
 *     type: 'any|cidr|no',
 *     cidr: [], // if type == 'cidr'
 *   },
 *   portPeer: {
 *     type: 'any|cidr|no',
 *     cidr: [], // if type == 'cidr'
 *   }
 * }
 * ```
 */
async function checkPort({ $, direction, securityGroupIds, protocol, port }) {
  let res;
  let result = {};
  try {
    res = await $.aws.ec2.describeSecurityGroups({
      GroupIds: securityGroupIds,
    });
  } catch (err) {
    return { err };
  }

  let anyTrafficPeer = allowAnyPeer({
    cidr: getAnyTrafficCidr({ $, res, direction }),
  });

  if (anyTrafficPeer.type == "any") {
    return { anyTrafficPeer, res };
  } else {
    result.anyTrafficPeer = anyTrafficPeer;
  }

  result.portPeer = allowAnyPeer({
    cidr: getPortCidr({ $, res, direction, protocol, port }),
  });
  result.res = res;
  return result;
}

/**
 * ## Params
 *
 * - `$`: context
 * - `res`: the response of `describeSecurityGroups`, see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/interfaces/describesecuritygroupscommandoutput.html
 * - `direction`: `'in'`/`'out'`
 *
 * ## Return
 *
 * A list of CIDR. E.g.: `['0.0.0.0/0', '192.168.0.0/16']`.
 */
function getAnyTrafficCidr({ $, res, direction }) {
  return $.jp.query(
    res,
    `$..${
      direction == "in" ? "IpPermissions" : "IpPermissionsEgress"
    }[?(@.IpProtocol=='-1')]..CidrIp`
  );
}

/**
 * ## Params
 *
 * - `cidr`: A list of CIDR, e.g. `['0.0.0.0/0', '192.168.0.0'16']`.
 *
 * ## Return
 *
 * ```
 * {
 *   type: 'any|cidr|no',
 *   cidr: ['192.168.0.0/16'], // if type == 'cidr'
 * }
 * ```
 */
function allowAnyPeer({ cidr }) {
  if (cidr.length === 0) {
    return { type: "no" };
  } else {
    if (cidr.indexOf("0.0.0.0/0" != -1)) {
      return { type: "any" };
    } else {
      return { type: "cidr", cidr };
    }
  }
}

/**
 * ## Params
 *
 * - `$`: context
 * - `res`: the response of `describeSecurityGroups`, see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/interfaces/describesecuritygroupscommandoutput.html
 * - `direction`: `'in'`/`'out'`
 * - `protocol`: `'tcp'`/`'ucp'`/`'icmp'`
 * - `port`
 *
 * ## Return
 *
 * A list of CIDR. E.g.: `['0.0.0.0/0', '192.168.0.0/16']`.
 */
function getPortCidr({ $, res, direction, protocol, port }) {
  return $.jp.query(
    res,
    `$..${
      direction == "in" ? "IpPermissions" : "IpPermissionsEgress"
    }[?(@.IpProtocol=='${protocol}' && (@.FromPort==${port} || @.FromPort==-1))]..CidrIp`
  );
}

/**
 * ## Params
 *
 * - `$`: context
 * - `res`: the response of `describeSecurityGroups`, see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/interfaces/describesecuritygroupscommandoutput.html
 * - `direction`: `'in'`/`'out'`
 * - `protocol`: `'tcp'`/`'ucp'`/`'icmp'`
 * - `port`
 *
 * ## Return
 *
 * A list of security group ids.
 */
function getPortPeerSecurityGroup({ $, res, direction, protocol, port }) {
  return $.jp.query(
    res,
    `$..${
      direction == "in" ? "IpPermissions" : "IpPermissionsEgress"
    }[?(@.IpProtocol=='${protocol}' && (@.FromPort==${port} || @.FromPort==-1))]..GroupId`
  );
}

export default {
  checkPort,
  getAnyTrafficCidr,
  allowAnyPeer,
  getPortCidr,
  checkEC2Instances,
  getPortPeerSecurityGroup,
};
