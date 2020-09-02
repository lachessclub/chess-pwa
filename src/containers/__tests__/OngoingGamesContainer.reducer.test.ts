import { reducer, State } from "../OngoingGamesContainer.reducer";

const emptyState: State = {
  games: [],
};

const notEmptyState: State = {
  games: [
    {
      id: 1,
      initialFen: "startpos",
      wtime: 300000,
      btime: 300000,
      moves: "",
      status: "started",
      white: null,
      black: null,
    },
    {
      id: 2,
      initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
      wtime: 300000,
      btime: 300000,
      moves: "",
      status: "started",
      white: null,
      black: null,
    },
  ],
};

describe("OngoingGamesContainer.reducer", () => {
  it("GET_GAMES action", () => {
    const state = reducer(emptyState, {
      type: "GET_GAMES",
      payload: [
        {
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
        {
          id: 2,
          initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
      ],
    });

    expect(state).toEqual({
      games: [
        {
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
        {
          id: 2,
          initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
      ],
    });
  });

  it("UPDATE_GAME action", () => {
    let state = reducer(notEmptyState, {
      type: "UPDATE_GAME",
      payload: {
        verb: "updated",
        data: {
          id: 1,
          moves: "e2e4",
        },
        previous: {
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
        id: 1,
      },
    });

    expect(state).toEqual({
      games: [
        {
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "e2e4",
          status: "started",
          white: null,
          black: null,
        },
        {
          id: 2,
          initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
      ],
    });

    state = reducer(notEmptyState, {
      type: "UPDATE_GAME",
      payload: {
        verb: "updated",
        data: {
          id: 3,
          status: "started",
        },
        previous: {
          id: 3,
          initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
          wtime: 500000,
          btime: 500000,
          moves: "",
          status: "resign",
          white: null,
          black: null,
        },
        id: 3,
      },
    });

    expect(state).toEqual({
      games: [
        {
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
        {
          id: 2,
          initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
        {
          id: 3,
          initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
          wtime: 500000,
          btime: 500000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
      ],
    });
  });

  it("CREATE_GAME action", () => {
    const state = reducer(notEmptyState, {
      type: "CREATE_GAME",
      payload: {
        verb: "created",
        data: {
          id: 3,
          initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
          wtime: 500000,
          btime: 500000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
        id: 3,
      },
    });

    expect(state).toEqual({
      games: [
        {
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
        {
          id: 2,
          initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
        {
          id: 3,
          initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
          wtime: 500000,
          btime: 500000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        },
      ],
    });
  });
});
