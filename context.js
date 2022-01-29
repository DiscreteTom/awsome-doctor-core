import { aws } from "./aws.js";
import jp from "jsonpath";
import * as yaml from "js-yaml";
import workflowUtils from "./utils/index.js";
import axios from "axios";
import StepStopper from "./model.js";

export default {
  build(data) {
    return {
      aws,
      data,
      axios,
      jp,
      yaml,
      err: "",
      ok: "",
      info: "",
      utils: workflowUtils,
      stop: false,
      panic(msg) {
        throw new StepStopper("err", msg, this);
      },
      done(msg) {
        throw new StepStopper("ok", msg, this);
      },
    };
  },
};
