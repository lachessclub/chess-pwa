import { ValidMoves } from "ii-react-chessboard";
import Game from "../../interfaces/Game";
import NormalizedGameEntity from "../../normalizr/interfaces/NormalizedGameEntity";

export const gameSample1: Game = {
  id: 1,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  createdAt: 0,
  drawOffer: null,
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
export const gameSample1Fen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const normalizedGameSample1: NormalizedGameEntity = gameSample1 as NormalizedGameEntity;

export const gameSample2: Game = {
  id: 2,
  aiLevel: 3,
  clockLimit: 300,
  clockIncrement: 3,
  createdAt: 0,
  drawOffer: null,
  initialFen: "startpos",
  turn: "white",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: null,
  winner: null,
};

export const normalizedGameSample2: NormalizedGameEntity = gameSample2 as NormalizedGameEntity;

export const gameSample3: Game = {
  id: 2,
  aiLevel: 3,
  clockLimit: 600,
  clockIncrement: 5,
  createdAt: 0,
  drawOffer: null,
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

export const normalizedGameSample3: NormalizedGameEntity = gameSample3 as NormalizedGameEntity;

export const gameSample3ValidMoves: ValidMoves = {
  e1: ["d2", "f1", "d1", "g1", "c1"],
  e2: ["e3", "e4", "d3"],
  f2: ["f3", "f4"],
};

// @todo. use this function to create samples.
export const makeGameSample = (
  data: Partial<Game>,
  originalGameSample = gameSample1
): Game => ({
  ...originalGameSample,
  ...data,
});

export const makeNormalizedGameSample = (
  data: Partial<NormalizedGameEntity>,
  originalGameSample = normalizedGameSample1
): NormalizedGameEntity => ({
  ...originalGameSample,
  ...data,
});
