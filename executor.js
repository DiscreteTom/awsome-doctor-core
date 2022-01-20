export async function execute($, js) {
  try {
    await eval(`(async ()=>{${js}})()`);
  } catch (e) {
    console.log(e);
    return { err: e };
  }

  return {
    ok: $.ok,
    info: $.info,
    err: $.err,
  };
}
