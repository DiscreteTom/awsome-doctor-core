import AWS from "aws-sdk";

let serviceNameMapping = {
  accessanalyzer: "AccessAnalyzer",
  account: "Account",
  acm: "ACM",
  acmpca: "ACMPCA",
  alexaforbusiness: "AlexaForBusiness",
  amp: "Amp",
  amplify: "Amplify",
  amplifybackend: "AmplifyBackend",
  amplifyuibuilder: "AmplifyUIBuilder",
  apigateway: "APIGateway",
  apigatewaymanagementapi: "ApiGatewayManagementApi",
  apigatewayv2: "ApiGatewayV2",
  appconfig: "AppConfig",
  appconfigdata: "AppConfigData",
  appflow: "Appflow",
  appintegrations: "AppIntegrations",
  applicationautoscaling: "ApplicationAutoScaling",
  applicationcostprofiler: "ApplicationCostProfiler",
  applicationinsights: "ApplicationInsights",
  appmesh: "AppMesh",
  apprunner: "AppRunner",
  appstream: "AppStream",
  appsync: "AppSync",
  athena: "Athena",
  auditmanager: "AuditManager",
  augmentedairuntime: "AugmentedAIRuntime",
  autoscaling: "AutoScaling",
  autoscalingplans: "AutoScalingPlans",
  backup: "Backup",
  backupgateway: "BackupGateway",
  batch: "Batch",
  braket: "Braket",
  budgets: "Budgets",
  chime: "Chime",
  chimesdkidentity: "ChimeSDKIdentity",
  chimesdkmeetings: "ChimeSDKMeetings",
  chimesdkmessaging: "ChimeSDKMessaging",
  cloud9: "Cloud9",
  cloudcontrol: "CloudControl",
  clouddirectory: "CloudDirectory",
  cloudformation: "CloudFormation",
  cloudfront: "CloudFront",
  cloudhsm: "CloudHSM",
  cloudhsmv2: "CloudHSMV2",
  cloudsearch: "CloudSearch",
  cloudsearchdomain: "CloudSearchDomain",
  cloudtrail: "CloudTrail",
  cloudwatch: "CloudWatch",
  cloudwatchevents: "CloudWatchEvents",
  cloudwatchlogs: "CloudWatchLogs",
  codeartifact: "CodeArtifact",
  codebuild: "CodeBuild",
  codecommit: "CodeCommit",
  codedeploy: "CodeDeploy",
  codeguruprofiler: "CodeGuruProfiler",
  codegurureviewer: "CodeGuruReviewer",
  codepipeline: "CodePipeline",
  codestar: "CodeStar",
  codestarconnections: "CodeStarconnections",
  codestarnotifications: "CodeStarNotifications",
  cognitoidentity: "CognitoIdentity",
  cognitoidentityserviceprovider: "CognitoIdentityServiceProvider",
  cognitosync: "CognitoSync",
  comprehend: "Comprehend",
  comprehendmedical: "ComprehendMedical",
  computeoptimizer: "ComputeOptimizer",
  configservice: "ConfigService",
  connect: "Connect",
  connectcontactlens: "ConnectContactLens",
  connectparticipant: "ConnectParticipant",
  costexplorer: "CostExplorer",
  cur: "CUR",
  customerprofiles: "CustomerProfiles",
  databrew: "DataBrew",
  dataexchange: "DataExchange",
  datapipeline: "DataPipeline",
  datasync: "DataSync",
  dax: "DAX",
  detective: "Detective",
  devicefarm: "DeviceFarm",
  devopsguru: "DevOpsGuru",
  directconnect: "DirectConnect",
  directoryservice: "DirectoryService",
  discovery: "Discovery",
  dlm: "DLM",
  dms: "DMS",
  docdb: "DocDB",
  drs: "Drs",
  dynamodb: "DynamoDB",
  dynamodbstreams: "DynamoDBStreams",
  ebs: "EBS",
  ec2: "EC2",
  ec2instanceconnect: "EC2InstanceConnect",
  ecr: "ECR",
  ecrpublic: "ECRPUBLIC",
  ecs: "ECS",
  efs: "EFS",
  eks: "EKS",
  elasticache: "ElastiCache",
  elasticbeanstalk: "ElasticBeanstalk",
  elasticinference: "ElasticInference",
  elastictranscoder: "ElasticTranscoder",
  elb: "ELB",
  elbv2: "ELBv2",
  emr: "EMR",
  emrcontainers: "EMRcontainers",
  es: "ES",
  eventbridge: "EventBridge",
  evidently: "Evidently",
  finspace: "Finspace",
  finspacedata: "Finspacedata",
  firehose: "Firehose",
  fis: "Fis",
  fms: "FMS",
  forecastqueryservice: "ForecastQueryService",
  forecastservice: "ForecastService",
  frauddetector: "FraudDetector",
  fsx: "FSx",
  gamelift: "GameLift",
  glacier: "Glacier",
  globalaccelerator: "GlobalAccelerator",
  glue: "Glue",
  grafana: "Grafana",
  greengrass: "Greengrass",
  greengrassv2: "GreengrassV2",
  groundstation: "GroundStation",
  guardduty: "GuardDuty",
  health: "Health",
  healthlake: "HealthLake",
  honeycode: "Honeycode",
  iam: "IAM",
  identitystore: "IdentityStore",
  imagebuilder: "Imagebuilder",
  importexport: "ImportExport",
  inspector: "Inspector",
  inspector2: "Inspector2",
  iot: "Iot",
  iot1clickdevicesservice: "IoT1ClickDevicesService",
  iot1clickprojects: "IoT1ClickProjects",
  iotanalytics: "IoTAnalytics",
  iotdata: "IotData",
  iotdeviceadvisor: "IotDeviceAdvisor",
  iotevents: "IoTEvents",
  ioteventsdata: "IoTEventsData",
  iotfleethub: "IoTFleetHub",
  iotjobsdataplane: "IoTJobsDataPlane",
  iotsecuretunneling: "IoTSecureTunneling",
  iotsitewise: "IoTSiteWise",
  iotthingsgraph: "IoTThingsGraph",
  iottwinmaker: "IoTTwinMaker",
  iotwireless: "IoTWireless",
  ivs: "IVS",
  kafka: "Kafka",
  kafkaconnect: "KafkaConnect",
  kendra: "Kendra",
  kinesis: "Kinesis",
  kinesisanalytics: "KinesisAnalytics",
  kinesisanalyticsv2: "KinesisAnalyticsV2",
  kinesisvideo: "KinesisVideo",
  kinesisvideoarchivedmedia: "KinesisVideoArchivedMedia",
  kinesisvideomedia: "KinesisVideoMedia",
  kinesisvideosignalingchannels: "KinesisVideoSignalingChannels",
  kms: "KMS",
  lakeformation: "LakeFormation",
  lambda: "Lambda",
  lexmodelbuildingservice: "LexModelBuildingService",
  lexmodelsv2: "LexModelsV2",
  lexruntime: "LexRuntime",
  lexruntimev2: "LexRuntimeV2",
  licensemanager: "LicenseManager",
  lightsail: "Lightsail",
  location: "Location",
  lookoutequipment: "LookoutEquipment",
  lookoutmetrics: "LookoutMetrics",
  lookoutvision: "LookoutVision",
  machinelearning: "MachineLearning",
  macie: "Macie",
  macie2: "Macie2",
  managedblockchain: "ManagedBlockchain",
  marketplacecatalog: "MarketplaceCatalog",
  marketplacecommerceanalytics: "MarketplaceCommerceAnalytics",
  marketplaceentitlementservice: "MarketplaceEntitlementService",
  marketplacemetering: "MarketplaceMetering",
  mediaconnect: "MediaConnect",
  mediaconvert: "MediaConvert",
  medialive: "MediaLive",
  mediapackage: "MediaPackage",
  mediapackagevod: "MediaPackageVod",
  mediastore: "MediaStore",
  mediastoredata: "MediaStoreData",
  mediatailor: "MediaTailor",
  memorydb: "MemoryDB",
  mgn: "Mgn",
  migrationhub: "MigrationHub",
  migrationhubconfig: "MigrationHubConfig",
  migrationhubrefactorspaces: "MigrationHubRefactorSpaces",
  migrationhubstrategy: "MigrationHubStrategy",
  mobile: "Mobile",
  mobileanalytics: "MobileAnalytics",
  mq: "MQ",
  mturk: "MTurk",
  mwaa: "MWAA",
  neptune: "Neptune",
  networkfirewall: "NetworkFirewall",
  networkmanager: "NetworkManager",
  nimble: "Nimble",
  opensearch: "OpenSearch",
  opsworks: "OpsWorks",
  opsworkscm: "OpsWorksCM",
  organizations: "Organizations",
  outposts: "Outposts",
  panorama: "Panorama",
  personalize: "Personalize",
  personalizeevents: "PersonalizeEvents",
  personalizeruntime: "PersonalizeRuntime",
  pi: "PI",
  pinpoint: "Pinpoint",
  pinpointemail: "PinpointEmail",
  pinpointsmsvoice: "PinpointSMSVoice",
  polly: "Polly",
  pricing: "Pricing",
  proton: "Proton",
  qldb: "QLDB",
  qldbsession: "QLDBSession",
  quicksight: "QuickSight",
  ram: "RAM",
  rbin: "Rbin",
  rds: "RDS",
  rdsdataservice: "RDSDataService",
  redshift: "Redshift",
  redshiftdata: "RedshiftData",
  rekognition: "Rekognition",
  resiliencehub: "Resiliencehub",
  resourcegroups: "ResourceGroups",
  resourcegroupstaggingapi: "ResourceGroupsTaggingAPI",
  robomaker: "RoboMaker",
  route53: "Route53",
  route53domains: "Route53Domains",
  route53recoverycluster: "Route53RecoveryCluster",
  route53recoverycontrolconfig: "Route53RecoveryControlConfig",
  route53recoveryreadiness: "Route53RecoveryReadiness",
  route53resolver: "Route53Resolver",
  rum: "RUM",
  s3: "S3",
  s3control: "S3Control",
  s3outposts: "S3Outposts",
  sagemaker: "SageMaker",
  sagemakeredge: "SagemakerEdge",
  sagemakerfeaturestoreruntime: "SageMakerFeatureStoreRuntime",
  sagemakerruntime: "SageMakerRuntime",
  savingsplans: "SavingsPlans",
  schemas: "Schemas",
  secretsmanager: "SecretsManager",
  securityhub: "SecurityHub",
  serverlessapplicationrepository: "ServerlessApplicationRepository",
  servicecatalog: "ServiceCatalog",
  servicecatalogappregistry: "ServiceCatalogAppRegistry",
  servicediscovery: "ServiceDiscovery",
  servicequotas: "ServiceQuotas",
  ses: "SES",
  sesv2: "SESV2",
  shield: "Shield",
  signer: "Signer",
  simpledb: "SimpleDB",
  sms: "SMS",
  snowball: "Snowball",
  snowdevicemanagement: "SnowDeviceManagement",
  sns: "SNS",
  sqs: "SQS",
  ssm: "SSM",
  ssmcontacts: "SSMContacts",
  ssmincidents: "SSMIncidents",
  sso: "SSO",
  ssoadmin: "SSOAdmin",
  ssooidc: "SSOOIDC",
  stepfunctions: "StepFunctions",
  storagegateway: "StorageGateway",
  sts: "STS",
  support: "Support",
  swf: "SWF",
  synthetics: "Synthetics",
  textract: "Textract",
  timestreamquery: "TimestreamQuery",
  timestreamwrite: "TimestreamWrite",
  transcribeservice: "TranscribeService",
  transfer: "Transfer",
  translate: "Translate",
  voiceid: "VoiceID",
  waf: "WAF",
  wafregional: "WAFRegional",
  wafv2: "WAFV2",
  wellarchitected: "WellArchitected",
  wisdom: "Wisdom",
  workdocs: "WorkDocs",
  worklink: "WorkLink",
  workmail: "WorkMail",
  workmailmessageflow: "WorkMailMessageFlow",
  workspaces: "WorkSpaces",
  workspacesweb: "WorkSpacesWeb",
  xray: "XRay",
};

export let aws = new Proxy(
  {},
  {
    get: function (_, name) {
      let client = new AWS[serviceNameMapping[name]]();
      return new Proxy(client, {
        get(target, name) {
          return async (param) => {
            return await target[name](param).promise();
          };
        },
      });
    },
  }
);
