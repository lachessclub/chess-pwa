import authModalReducer, {
  showAuthModal,
  hideAuthModal,
} from "../authModalSlice";
import {
  loginSuccess,
  registerSuccess,
} from "../../current-user/currentUserSlice";

describe("authModalSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      authModalReducer(undefined, {
        type: "",
      })
    ).toEqual({ isAuthModalVisible: false });
  });

  it("should handle showAuthModal", () => {
    expect(
      authModalReducer(
        {
          isAuthModalVisible: false,
        },
        {
          type: showAuthModal.type,
        }
      )
    ).toEqual({
      isAuthModalVisible: true,
    });
  });

  it("should handle hideAuthModal", () => {
    expect(
      authModalReducer(
        {
          isAuthModalVisible: true,
        },
        {
          type: hideAuthModal.type,
        }
      )
    ).toEqual({
      isAuthModalVisible: false,
    });
  });

  it("should handle loginSuccess", () => {
    expect(
      authModalReducer(
        {
          isAuthModalVisible: true,
        },
        {
          type: loginSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      isAuthModalVisible: false,
    });
  });

  it("should handle registerSuccess", () => {
    expect(
      authModalReducer(
        {
          isAuthModalVisible: true,
        },
        {
          type: registerSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      isAuthModalVisible: false,
    });
  });
});
