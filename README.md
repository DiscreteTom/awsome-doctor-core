# awsome-doctor-core

Workflow executor, plugins & util functions of [Awsome Doctor](https://discretetom.github.io/awsome-doctor/).

## Installation

```bash
npm install awsome-doctor-core
```

## Usage

```js
import executor from "awsome-doctor-core";

// use default credential provider & region
executor.configure({});
// or specify a region
executor.configure({ region: "us-east-1" });
// or use custom ak/sk
executor.configure({ accessKeyId, secretAccessKey, region });

// run workflow step
executor.run(step.js, workflowData);
```

## [CHANGELOG](https://github.com/DiscreteTom/awsome-doctor-core/blob/main/CHANGELOG.md)

## Related Projects

- [awsome-doctor](https://github.com/DiscreteTom/awsome-doctor): A browser based AWS troubleshooting tool.
- [awsome-doctor-cli](https://github.com/DiscreteTom/awsome-doctor-cli): Command line interface version of Awsome Doctor.
- [awsome-doctor-view](https://github.com/DiscreteTom/awsome-doctor-view): Frontend code of Awsome Doctor.
- [awsome-doctor-core](https://github.com/DiscreteTom/awsome-doctor-core): Workflow executor, plugins and util functions of Awsome Doctor.
