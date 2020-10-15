import seekModalReducer, {
  showSeekModal,
  hideSeekModal,
} from "../seekModalSlice";
import {
  createSeekRequest,
  createSeekSuccess,
  createSeekError,
} from "../../challenge/challengeSlice";

describe("seekModalSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      seekModalReducer(undefined, {
        type: "",
      })
    ).toEqual({ isSeekModalVisible: false, allowCloseSeekModal: true });
  });

  it("should handle showSeekModal", () => {
    expect(
      seekModalReducer(
        {
          isSeekModalVisible: false,
          allowCloseSeekModal: false,
        },
        {
          type: showSeekModal.type,
        }
      )
    ).toEqual({
      isSeekModalVisible: true,
      allowCloseSeekModal: false,
    });
  });

  it("should handle hideSeekModal", () => {
    expect(
      seekModalReducer(
        {
          isSeekModalVisible: true,
          allowCloseSeekModal: false,
        },
        {
          type: hideSeekModal.type,
        }
      )
    ).toEqual({
      isSeekModalVisible: false,
      allowCloseSeekModal: false,
    });
  });

  it("should handle createSeekRequest", () => {
    expect(
      seekModalReducer(
        {
          isSeekModalVisible: true,
          allowCloseSeekModal: true,
        },
        {
          type: createSeekRequest.type,
        }
      )
    ).toEqual({
      isSeekModalVisible: true,
      allowCloseSeekModal: false,
    });
  });

  it("should handle createSeekSuccess", () => {
    expect(
      seekModalReducer(
        {
          isSeekModalVisible: true,
          allowCloseSeekModal: false,
        },
        {
          type: createSeekSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      isSeekModalVisible: false,
      allowCloseSeekModal: true,
    });
  });

  it("should handle createSeekError", () => {
    expect(
      seekModalReducer(
        {
          isSeekModalVisible: true,
          allowCloseSeekModal: false,
        },
        {
          type: createSeekError.type,
          payload: "error text",
        }
      )
    ).toEqual({
      isSeekModalVisible: true,
      allowCloseSeekModal: true,
    });
  });
});
