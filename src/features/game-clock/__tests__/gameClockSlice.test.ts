import gameClockReducer, {
  oneSecondPassed,
  startGameClock,
} from "../gameClockSlice";
import { defaultState } from "../../../test-utils/data-sample/state";

jest.useFakeTimers();

describe("gameClockSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      gameClockReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle oneSecondPassed", () => {
    expect(
      gameClockReducer(
        {},
        {
          type: oneSecondPassed.type,
        }
      )
    ).toEqual({});
  });

  it("should handle startGameClock", () => {
    const dispatch = jest.fn();

    const result = startGameClock()(dispatch, () => defaultState, null);

    expect(result).toBeUndefined();

    expect(dispatch).toBeCalledTimes(0);

    jest.advanceTimersByTime(1000);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: oneSecondPassed.type,
    });

    jest.advanceTimersByTime(1000);
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: oneSecondPassed.type,
    });
  });
});
