import { JWR } from "sails.io.js";
import getErrorMessageFromJWR from "../getErrorMessageFromJWR";

const responseSample1: Pick<JWR, "body" | "headers"> = {
  body: "Error message from body",
  headers: {
    "X-Exit-Description": "Error message from X-Exit-Description header",
    statusCode: "404",
  },
};

const responseSample2: Pick<JWR, "body" | "headers"> = {
  body: "Error message from body",
  headers: {
    statusCode: "404",
  },
};

const responseSample3: Pick<JWR, "body" | "headers"> = {
  body: {
    foo: "bar",
  },
  headers: {
    statusCode: "500",
  },
};

it("getErrorMessageFromJWR", () => {
  expect(getErrorMessageFromJWR(responseSample1)).toBe(
    "Error message from X-Exit-Description header"
  );
  expect(getErrorMessageFromJWR(responseSample2)).toBe(
    "Error message from body"
  );
  expect(getErrorMessageFromJWR(responseSample3)).toBe("Internal server error");
  expect(getErrorMessageFromJWR(responseSample3, "error text")).toBe(
    "error text"
  );
});
