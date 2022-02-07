import context from "./context.js";
import { execute } from "./executor.js";
import AWS from "aws-sdk";

export default {
  async run(js, data) {
    let $ = context.build(data);
    return await execute($, js);
  },
  configure({ accessKeyId, secretAccessKey, region }) {
    if (region) AWS.config.region = region;
    if (accessKeyId && secretAccessKey) {
      AWS.config.credentials = new AWS.Credentials({
        accessKeyId,
        secretAccessKey,
      });
    }
  },
};
