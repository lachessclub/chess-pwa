import Game from "../../interfaces/Game";

export const gameSample: Game = {
  id: 1,
  initialFen: "startpos",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: null,
};

// with black user
export const gameSample2: Game = {
  id: 1,
  initialFen: "startpos",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: {
    id: 1,
    fullName: "Thomas Miller",
  },
};

// with white user
export const gameSample3: Game = {
  id: 1,
  initialFen: "startpos",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: {
    id: 1,
    fullName: "Thomas Miller",
  },
  black: null,
};
export const gameSampleFen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const gameWithMovesSample: Game = {
  id: 2,
  initialFen: "startpos",
  wtime: 300000,
  btime: 300000,
  moves: "e2e4 e7e5",
  status: "started",
  white: null,
  black: null,
};
export const gameWithMovesSampleFen =
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2";

export const gameWithCheckmateSample: Game = {
  id: 3,
  initialFen: "4k3/4Q3/4K3/8/8/8/8/8 b - - 0 1",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "mate",
  white: null,
  black: null,
};

export const blackTurnGameSample: Game = {
  id: 1,
  initialFen: "startpos",
  wtime: 300000,
  btime: 300000,
  moves: "e2e4 e7e5 g1f3",
  status: "started",
  white: null,
  black: null,
};

export const whiteTurnGameSample: Game = {
  id: 2,
  initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR b KQkq - 0 1",
  wtime: 300000,
  btime: 300000,
  moves: "e8e7",
  status: "started",
  white: null,
  black: null,
};
