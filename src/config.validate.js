import Ajv from "ajv";
import schema from "../config.schema.json";
import cfg from "./config.json";
const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);
if (!validate(cfg)) {
  console.error("config.json invalid:", validate.errors);
  throw new Error("Invalid config.json");
}
export default true;