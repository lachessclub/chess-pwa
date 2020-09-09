import mountTest from "../../tests/mountTest";
import { LoginForm } from "../LoginForm";

// @todo. add tests

describe("LoginForm", () => {
  mountTest(LoginForm, {
    onSubmit() {},
  });
});
