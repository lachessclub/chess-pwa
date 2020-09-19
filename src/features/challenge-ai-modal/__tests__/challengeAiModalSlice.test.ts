import challengeAiModalReducer, {
  showChallengeAiModal,
  hideChallengeAiModal,
} from "../challengeAiModalSlice";
import { challengeAiSuccess } from "../../challenge/challengeSlice";

describe("challengeAiModalSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      challengeAiModalReducer(undefined, {
        type: "",
      })
    ).toEqual({ isChallengeAiModalVisible: false });
  });

  it("should handle showChallengeAiModal", () => {
    expect(
      challengeAiModalReducer(
        {
          isChallengeAiModalVisible: false,
        },
        {
          type: showChallengeAiModal.type,
        }
      )
    ).toEqual({
      isChallengeAiModalVisible: true,
    });
  });

  it("should handle hideChallengeAiModal", () => {
    expect(
      challengeAiModalReducer(
        {
          isChallengeAiModalVisible: true,
        },
        {
          type: hideChallengeAiModal.type,
        }
      )
    ).toEqual({
      isChallengeAiModalVisible: false,
    });
  });

  it("should handle challengeAiSuccess", () => {
    expect(
      challengeAiModalReducer(
        {
          isChallengeAiModalVisible: true,
        },
        {
          type: challengeAiSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      isChallengeAiModalVisible: false,
    });
  });
});
