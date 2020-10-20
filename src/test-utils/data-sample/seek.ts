import { Seek } from "../../interfaces/Seek";
import { userSample1, userSample2 } from "./user";
import { gameSample2 } from "./game";
import NormalizedSeekEntity from "../../normalizr/interfaces/NormalizedSeekEntity";

export const seekSample1: Seek = {
  id: 1,
  color: "white",
  clockLimit: 300,
  createdAt: 0,
  clockIncrement: 5,
  createdBy: userSample1,
  game: null,
};

export const normalizedSeekSample1: NormalizedSeekEntity = {
  id: 1,
  color: "white",
  clockLimit: 300,
  createdAt: 0,
  clockIncrement: 5,
  createdBy: 1,
  game: null,
};

export const seekSample2: Seek = {
  id: 2,
  color: "black",
  clockLimit: 300,
  createdAt: 0,
  clockIncrement: 5,
  createdBy: userSample2,
  game: gameSample2,
};

export const normalizedSeekSample2: NormalizedSeekEntity = {
  id: 2,
  color: "black",
  clockLimit: 300,
  createdAt: 0,
  clockIncrement: 5,
  createdBy: 2,
  game: 2,
};

export const makeSeekSample = (
  data: Partial<Seek>,
  originalSeekSample = seekSample1
): Seek => ({
  ...originalSeekSample,
  ...data,
});

export const makeNormalizedSeekSample = (
  data: Partial<NormalizedSeekEntity>,
  originalSeekSample = normalizedSeekSample1
): NormalizedSeekEntity => ({
  ...originalSeekSample,
  ...data,
});
