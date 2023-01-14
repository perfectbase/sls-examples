import { z } from "zod";

export const inputSchema = z.object({
  name: z.string(),
});

export const outputSchema = z.object({
  message: z.string(),
});
