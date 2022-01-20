import context from "./context";
import { execute } from "./executor";
import { aws } from "./aws";

export default {
  async run(js, data) {
    let $ = context.build(data);
    return await execute($, js);
  },
  configure: aws.configure,
};
