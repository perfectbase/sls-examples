import { handlerPath } from "@libs/handler-resolver";
import type { AWS } from "@serverless/typescript";

const fnConfig: Exclude<AWS["functions"], undefined>[string] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "any",
        path: "/{proxy+}",
      },
    },
  ],
};

export default fnConfig;
