import acceptSeekRequestReducer from "../acceptSeekRequestSlice";
import {
  acceptSeekRequest,
  acceptSeekSuccess,
  acceptSeekError,
} from "../../challenge/challengeSlice";
import { seekSample1 } from "../../../test-utils/data-sample/seek";

describe("challengeSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      acceptSeekRequestReducer(undefined, {
        type: "",
      })
    ).toEqual({
      inProcess: false,
      itemId: null,
      error: null,
    });
  });

  it("should handle acceptSeekRequest", () => {
    expect(
      acceptSeekRequestReducer(
        {
          inProcess: false,
          itemId: 5,
          error: "error text",
        },
        {
          type: acceptSeekRequest.type,
          payload: 6,
        }
      )
    ).toEqual({
      inProcess: true,
      itemId: 6,
      error: null,
    });
  });

  it("should handle acceptSeekSuccess", () => {
    expect(
      acceptSeekRequestReducer(
        {
          inProcess: true,
          itemId: 5,
          error: null,
        },
        {
          type: acceptSeekSuccess.type,
          payload: {
            result: 1,
            entities: {
              seeks: {
                1: seekSample1,
              },
            },
          },
        }
      )
    ).toEqual({
      inProcess: false,
      itemId: null,
      error: null,
    });
  });

  it("should handle acceptSeekError", () => {
    expect(
      acceptSeekRequestReducer(
        {
          inProcess: true,
          itemId: 5,
          error: null,
        },
        {
          type: acceptSeekError.type,
          payload: {
            itemId: 5,
            error: "error text",
          },
        }
      )
    ).toEqual({
      inProcess: false,
      itemId: 5,
      error: "error text",
    });
  });
});
