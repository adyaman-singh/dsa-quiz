import Ajv from "ajv";
import { ValidatorMiddleware } from "../helper/validator.js";

const ajv = new Ajv();

const checkDailyFrequencySchema = {
  type: "object",
  properties: {
    params: {
      type: "object",
      additionalProperties: false,
    },
    query: {
      type: "object",
      additionalProperties: false,
    },
    body: {
      type: "object",
      properties: {
        email: { type: "string" },
      },
      required: ["email"],
      additionalProperties: false, // Prevents additional fields in the body
    },
  },
  required: ["body"], // Ensures the body is not empty
  additionalProperties: false, // Prevents additional top-level fields
};

export const checkDailyFrequencySchemaValidator = ValidatorMiddleware(
  ajv.compile(checkDailyFrequencySchema)
);

export default {
  checkDailyFrequencySchemaValidator,
};
