import { JWR } from "sails.io.js";
import { isString as _isString } from "lodash";

export default (
  jwr: Pick<JWR, "body" | "headers">,
  defaultErrorMessage = "Internal server error"
): string => {
  if (jwr.headers["X-Exit-Description"]) {
    return jwr.headers["X-Exit-Description"];
  }
  if (_isString(jwr.body)) {
    return jwr.body;
  }

  return defaultErrorMessage;
};
