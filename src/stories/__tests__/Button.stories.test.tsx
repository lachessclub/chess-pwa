import mountTest from "../../test-utils/mountTest";
import { Large, Primary, Secondary, Small } from "../Button.stories";

describe("Button.stories", () => {
  mountTest(Primary, {
    label: "OK",
  });
  mountTest(Secondary, {
    label: "OK",
  });
  mountTest(Large, {
    label: "OK",
  });
  mountTest(Small, {
    label: "OK",
  });
});
