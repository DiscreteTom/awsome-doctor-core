import context from "./context.js";
import { execute } from "./executor.js";
import { aws } from "./aws.js";

export default {
  async run(js, data) {
    let $ = context.build(data);
    return await execute($, js);
  },
  configure: aws.configure,
};
