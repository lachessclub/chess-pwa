import modalReducer, { showModal, hideModal } from "../modalSlice";
import {
  challengeAiSuccess,
  createSeekError,
  createSeekRequest,
  createSeekSuccess,
} from "../../challenge/challengeSlice";
import {
  loginSuccess,
  registerSuccess,
} from "../../current-user/currentUserSlice";

describe("modalSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      modalReducer(undefined, {
        type: "",
      })
    ).toEqual({
      allowClose: true,
      showModal: null,
    });
  });

  it("should handle showModal", () => {
    expect(
      modalReducer(
        {
          showModal: null,
          allowClose: false,
        },
        {
          type: showModal.type,
          payload: {
            name: "auth",
            allowClose: true,
          },
        }
      )
    ).toEqual({
      showModal: "auth",
      allowClose: true,
    });
  });

  it("should handle hideModal", () => {
    expect(
      modalReducer(
        {
          showModal: "auth",
          allowClose: false,
        },
        {
          type: hideModal.type,
        }
      )
    ).toEqual({
      showModal: null,
      allowClose: true,
    });
  });

  it("should handle createSeekRequest", () => {
    expect(
      modalReducer(
        {
          showModal: "seek",
          allowClose: true,
        },
        {
          type: createSeekRequest.type,
        }
      )
    ).toEqual({
      showModal: "seek",
      allowClose: false,
    });
  });

  it("should handle createSeekSuccess", () => {
    expect(
      modalReducer(
        {
          showModal: "seek",
          allowClose: false,
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
      showModal: null,
      allowClose: true,
    });
  });

  it("should handle createSeekError", () => {
    expect(
      modalReducer(
        {
          showModal: "seek",
          allowClose: false,
        },
        {
          type: createSeekError.type,
          payload: "error text",
        }
      )
    ).toEqual({
      showModal: "seek",
      allowClose: true,
    });
  });

  it("should handle loginSuccess", () => {
    expect(
      modalReducer(
        {
          showModal: "auth",
          allowClose: false,
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
      showModal: null,
      allowClose: true,
    });
  });

  it("should handle registerSuccess", () => {
    expect(
      modalReducer(
        {
          showModal: "auth",
          allowClose: false,
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
      showModal: null,
      allowClose: true,
    });
  });

  it("should handle challengeAiSuccess", () => {
    expect(
      modalReducer(
        {
          showModal: "challengeAi",
          allowClose: false,
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
      showModal: null,
      allowClose: true,
    });
  });
});
