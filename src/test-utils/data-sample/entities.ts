import { EntitiesState } from "../../features/entities/entitiesSlice";

export const emptyEntities: EntitiesState = {
  users: {},
  seeks: {},
  games: {},
};

export const makeEntitiesSample = (
  data: Partial<EntitiesState>,
  originalEntitiesSample = emptyEntities
): EntitiesState => ({
  ...originalEntitiesSample,
  ...data,
});
