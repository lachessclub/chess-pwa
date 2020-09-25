import { ValidMoves } from "ii-react-chessboard";
import Game from "../../interfaces/Game";

export const gameSample: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "startpos",
  turn: "white",
  wtime: 310000,
  btime: 365000,
  moves: "",
  status: "started",
  white: null,
  black: null,
  winner: null,
};
export const gameSampleFen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// @todo. use this function to create samples.
export const makeGameSample = (data: Partial<Game>): Game => ({
  ...gameSample,
  ...data,
});

export const gameWith10Plus5MinControlSample: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 600,
  clockIncrement: 5,
  initialFen: "startpos",
  turn: "white",
  wtime: 600000,
  btime: 600000,
  moves: "",
  status: "started",
  white: null,
  black: null,
  winner: null,
};

export const gameWithSmallAmountOfPiecesSample: Game = {
  id: 2,
  aiLevel: 3,
  clockLimit: 600,
  clockIncrement: 5,
  initialFen: "8/4p3/8/5k2/8/3p4/4PP2/4K3 w KQkq - 0 1",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: null,
  winner: null,
};
export const gameWithSmallAmountOfPiecesSampleValidMoves: ValidMoves = {
  e1: ["d2", "f1", "d1", "g1", "c1"],
  e2: ["e3", "e4", "d3"],
  f2: ["f3", "f4"],
};

export const whiteOutOfTimeGameSample: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "startpos",
  turn: "white",
  wtime: 0,
  btime: 300000,
  moves: "",
  status: "outoftime",
  white: null,
  black: null,
  winner: "black",
};

export const blackOutOfTimeGameSample: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 0,
  moves: "",
  status: "outoftime",
  white: null,
  black: null,
  winner: "white",
};

// with black user
export const gameSample2: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: {
    id: 1,
    fullName: "Thomas Miller",
  },
  winner: null,
};

// with white user
export const gameSample3: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: {
    id: 1,
    fullName: "Thomas Miller",
  },
  black: null,
  winner: null,
};

export const gameWithMovesSample: Game = {
  id: 2,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "e2e4 e7e5 g1f3 g8f6",
  status: "started",
  white: null,
  black: null,
  winner: null,
};
export const gameWithMovesSampleFen =
  "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3";
export const gameWithMovesRewoundToIndex2SampleFen =
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2";
export const gameWithMovesAndUserSample: Game = {
  id: 2,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "e2e4 e7e5 g1f3 g8f6",
  status: "started",
  white: {
    id: 1,
    fullName: "Thomas Miller",
  },
  black: null,
  winner: null,
};

export const gameWithCheckmateByWhiteSample: Game = {
  id: 3,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "4k3/4Q3/4K3/8/8/8/8/8 b - - 0 1",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "mate",
  white: null,
  black: null,
  winner: "white",
};

export const gameWithCheckmateByBlackSample: Game = {
  id: 3,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "4k3/4Q3/4K3/8/8/8/8/8 b - - 0 1",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "mate",
  white: null,
  black: null,
  winner: "black",
};

export const gameWithDrawSample: Game = {
  id: 3,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "4k3/4Q3/4K3/8/8/8/8/8 b - - 0 1",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "draw",
  white: null,
  black: null,
  winner: null,
};

export const gameWithStalemateSample: Game = {
  id: 3,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "4k3/4Q3/4K3/8/8/8/8/8 b - - 0 1",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "stalemate",
  white: null,
  black: null,
  winner: null,
};

export const blackTurnGameSample: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "startpos",
  turn: "black",
  wtime: 300000,
  btime: 300000,
  moves: "e2e4 e7e5 g1f3",
  status: "started",
  white: null,
  black: null,
  winner: null,
};

export const whiteTurnGameSample: Game = {
  id: 2,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR b KQkq - 0 1",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "e8e7",
  status: "started",
  white: null,
  black: null,
  winner: null,
};

export const gameWithIncorrectMoveSample: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "e2e4 e7e5", // e2e4 is incorrect
  status: "started",
  white: null,
  black: null,
  winner: null,
};

export const blackResignedGameSample: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 0,
  moves: "",
  status: "resign",
  white: null,
  black: null,
  winner: "white",
};

export const whiteResignedGameSample: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 0,
  moves: "",
  status: "resign",
  white: null,
  black: null,
  winner: "black",
};

export const abortedGameSample: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 0,
  moves: "",
  status: "aborted",
  white: null,
  black: null,
  winner: null,
};
