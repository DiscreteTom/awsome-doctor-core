import { CloudFront } from "@aws-sdk/client-cloudfront";
import { EC2 } from "@aws-sdk/client-ec2";
import { ElasticLoadBalancingV2 } from "@aws-sdk/client-elastic-load-balancing-v2";
import { ElastiCache } from "@aws-sdk/client-elasticache";
import { GameLift } from "@aws-sdk/client-gamelift";
import { Lambda } from "@aws-sdk/client-lambda";
import { RDS } from "@aws-sdk/client-rds";

// init `aws` with all client sdk
let aws = {
  CloudFront,
  EC2,
  ElasticLoadBalancingV2,
  ElastiCache,
  GameLift,
  Lambda,
  RDS,
};

function configure({ accessKeyId, secretAccessKey, region }) {
  let config = {
    region: region || "us-east-1",
  };

  if (accessKeyId && secretAccessKey) {
    config.credentials = {
      accessKeyId,
      secretAccessKey,
    };
  }
  // init all clients
  aws["cloudfront"] = new CloudFront(config);
  aws["ec2"] = new EC2(config);
  aws["elbv2"] = new ElasticLoadBalancingV2(config);
  aws["elasticache"] = new ElastiCache(config);
  aws["gamelift"] = new GameLift(config);
  aws["lambda"] = new Lambda(config);
  aws["rds"] = new RDS(config);
}

aws["configure"] = configure;

export { aws };
