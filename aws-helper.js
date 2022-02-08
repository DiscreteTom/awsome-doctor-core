import AWS from "aws-sdk";

export let aws = new Proxy(
  {},
  {
    get: function (_, name) {
      let client = new AWS[name.toUpperCase()]();
      return new Proxy(client, {
        get(target, name) {
          return async (param) => {
            return await target[name](param).promise();
          };
        },
      });
    },
  }
);
