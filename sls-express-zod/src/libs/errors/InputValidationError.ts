import type { ZodError } from "zod";

export class InputValidationError extends Error {
  zodError: ZodError;

  constructor(zodError: ZodError) {
    super(JSON.stringify(zodError.issues, null, 2));
    this.name = "InputValidationError";
    this.zodError = zodError;
  }
}
