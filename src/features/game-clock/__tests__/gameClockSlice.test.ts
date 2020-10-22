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

    expect(result).toBeInstanceOf(Function);

    expect(dispatch).toBeCalledTimes(0);

    jest.advanceTimersByTime(1000);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith({
      type: oneSecondPassed.type,
    });
    dispatch.mockClear();

    jest.advanceTimersByTime(1000);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith({
      type: oneSecondPassed.type,
    });
    dispatch.mockClear();

    result(); // stop timer
    jest.advanceTimersByTime(1000);
    expect(dispatch).toBeCalledTimes(0);
  });
});
