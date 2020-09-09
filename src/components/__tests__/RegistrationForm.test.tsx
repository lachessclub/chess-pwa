import mountTest from "../../tests/mountTest";
import { RegistrationForm } from "../RegistrationForm";

// @todo. add tests

describe("RegistrationForm", () => {
  mountTest(RegistrationForm, {
    onSubmit() {},
  });
});
