import AWS from "aws-sdk";
import jp from "jsonpath";
import * as yaml from "js-yaml";
import axios from "axios";
import StepStopper from "./model.js";

export default {
  build(data) {
    return {
      AWS,
      data,
      axios,
      jp,
      yaml,
      err: "",
      ok: "",
      info: "",
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
