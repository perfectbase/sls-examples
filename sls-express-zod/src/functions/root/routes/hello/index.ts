import { buildHandler } from "@libs/express-helper";
import { inputSchema, outputSchema } from "./schema";

const hello = buildHandler({
  inputSchema,
  outputSchema,
  handler: async (req) => {
    const { name } = req.body;
    return {
      message: `Hello ${name}!`,
    };
  },
});

export default hello;
