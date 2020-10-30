import mountTest from "../../test-utils/mountTest";
import { Button } from "../Button";

describe("Button", () => {
  mountTest(Button, {
    label: "OK",
  });

  mountTest(Button, {
    label: "OK",
    primary: true,
  });
});
