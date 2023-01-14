/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject, z } from "zod";
import { ZodError } from "zod";
import { InputValidationError } from "./errors/InputValidationError";

type TypedRequest<T> = Omit<Request<T>, "body"> & { body: T };
type TypedHandler<I extends AnyZodObject, O extends AnyZodObject> = (
  req: TypedRequest<z.infer<I>>,
  res: Response,
  next: NextFunction
) => z.infer<O> | Promise<z.infer<O>>;

export const buildHandler = <
  I extends AnyZodObject,
  O extends AnyZodObject
>(params: {
  inputSchema?: I;
  outputSchema?: O;
  handler: TypedHandler<I, O>;
}) => {
  return async (
    req: TypedRequest<z.infer<I>>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // validate input and return 400 if invalid
      validateInput({ schema: params.inputSchema, value: req.body });
      // run handler
      const result = await params.handler(req, res, next);
      // validate output and return 500 if invalid
      params.outputSchema?.parse(result);
      // return result
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      if (error instanceof InputValidationError) {
        return res.status(400).json({
          message: "Bad request",
          errors: error.zodError.issues,
        });
      }
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
};

const validateInput = (params: { schema?: AnyZodObject; value: any }) => {
  const { schema, value } = params;
  try {
    schema?.parse(value);
  } catch (e) {
    if (e instanceof ZodError) {
      throw new InputValidationError(e);
    }
    throw e;
  }
};
