import { EntitiesState } from "../../features/entities/entitiesSlice";

export const emptyEntities: EntitiesState = {
  users: {},
  seeks: {},
  games: {},
};

// @todo. use this functions to create samples.
export const makeEntitiesSample = (
  data: Partial<EntitiesState>,
  originalEntitiesSample = emptyEntities
): EntitiesState => ({
  ...originalEntitiesSample,
  ...data,
});
