import { EC2 } from "@aws-sdk/client-ec2";
import { RDS } from "@aws-sdk/client-rds";
import { ElasticLoadBalancingV2 } from "@aws-sdk/client-elastic-load-balancing-v2";

// init `aws` with all client sdk
let aws = { EC2, RDS, ElasticLoadBalancingV2 };

function configure({ accessKeyId, secretAccessKey, region }) {
  let config = {
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region,
  };

  // init all clients
  aws["ec2"] = new EC2(config);
  aws["rds"] = new RDS(config);
  aws["elbv2"] = new ElasticLoadBalancingV2(config);
}

aws["configure"] = configure;

export { aws };
