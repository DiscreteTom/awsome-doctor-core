import { aws } from "./aws";
import jp from "jsonpath";
import * as yaml from "js-yaml";
import workflowUtils from "./utils";
import axios from "@nuxtjs/axios";

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
    };
  },
};
