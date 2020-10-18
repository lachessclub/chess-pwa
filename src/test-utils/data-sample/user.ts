import User from "../../interfaces/User";
import NormalizedUserEntity from "../../normalizr/interfaces/NormalizedUserEntity";

export const userSample1: User = {
  id: 1,
  fullName: "Thomas Miller",
};
export const normalizedUserSample1: NormalizedUserEntity = userSample1;

export const userSample2: User = {
  id: 2,
  fullName: "Robert Johnson",
};
export const normalizedUserSample2: NormalizedUserEntity = userSample2;
