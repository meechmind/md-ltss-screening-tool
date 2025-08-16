import { describe, it, expect } from "vitest";
import Ajv from "ajv";
import schema from "../../config.schema.json";
import config from "../config.json";

describe("config schema", () => {
  it("validates config.json against schema", () => {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(config);
    expect(valid, JSON.stringify(validate.errors)).toBe(true);
  });
});
