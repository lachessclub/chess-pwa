import { reducer, State } from "../App.reducer";

const stateSample1: State = {
  user: null,
  isAuthModalVisible: false,
};

const stateSample2: State = {
  user: {
    id: 2,
    fullName: "Robert Johnson",
  },
  isAuthModalVisible: true,
};

const stateSample3: State = {
  user: null,
  isAuthModalVisible: true,
};

const stateSample4: State = {
  user: {
    id: 2,
    fullName: "Robert Johnson",
  },
  isAuthModalVisible: false,
};

describe("App.reducer", () => {
  it("GET_CURRENT_USER action", () => {
    let state = reducer(stateSample1, {
      type: "GET_CURRENT_USER",
      payload: {
        id: 1,
        fullName: "Mary Smith",
      },
    });

    expect(state).toEqual({
      user: {
        id: 1,
        fullName: "Mary Smith",
      },
      isAuthModalVisible: false,
    });

    state = reducer(stateSample2, {
      type: "GET_CURRENT_USER",
      payload: null,
    });

    expect(state).toEqual({
      user: null,
      isAuthModalVisible: true,
    });
  });

  it("LOGIN action", () => {
    const state = reducer(stateSample3, {
      type: "LOGIN",
      payload: {
        id: 1,
        fullName: "Mary Smith",
      },
    });

    expect(state).toEqual({
      user: {
        id: 1,
        fullName: "Mary Smith",
      },
      isAuthModalVisible: false,
    });
  });

  it("LOGOUT action", () => {
    const state = reducer(stateSample2, {
      type: "LOGOUT",
    });

    expect(state).toEqual({
      user: null,
      isAuthModalVisible: true,
    });
  });

  it("SHOW_AUTH_MODAL action", () => {
    const state = reducer(stateSample4, {
      type: "SHOW_AUTH_MODAL",
    });

    expect(state).toEqual({
      user: {
        id: 2,
        fullName: "Robert Johnson",
      },
      isAuthModalVisible: true,
    });
  });

  it("HIDE_AUTH_MODAL action", () => {
    const state = reducer(stateSample2, {
      type: "HIDE_AUTH_MODAL",
    });

    expect(state).toEqual({
      user: {
        id: 2,
        fullName: "Robert Johnson",
      },
      isAuthModalVisible: false,
    });
  });
});
