import StepStopper from "./model.js";

export async function execute($, js) {
  try {
    await eval(`(async ()=>{${js}})()`);
  } catch (e) {
    if (e instanceof StepStopper) {
      if (e.type == "ok") return { ok: e.msg };
      else if (e.type == "err") {
        console.log(e);
        return { err: e.msg };
      }
    } else {
      console.log(e);
      return { err: e };
    }
  }

  return {
    ok: $.ok,
    info: $.info,
    err: $.err,
  };
}
