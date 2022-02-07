# awsome-doctor-core

[![npm](https://img.shields.io/npm/v/awsome-doctor-core)](https://www.npmjs.com/package/awsome-doctor-core)

Workflow executor & plugins of [Awsome Doctor](https://discretetom.github.io/awsome-doctor/).

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

- [awsome-doctor](https://github.com/DiscreteTom/awsome-doctor)
- [awsome-doctor-cli](https://github.com/DiscreteTom/awsome-doctor-cli)
- [awsome-doctor-view](https://github.com/DiscreteTom/awsome-doctor-view)
- [awsome-doctor-core](https://github.com/DiscreteTom/awsome-doctor-core)
- [awsome-doctor-utils](https://github.com/DiscreteTom/awsome-doctor-utils)
