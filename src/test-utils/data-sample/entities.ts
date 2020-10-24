import { EntitiesState } from "../../features/entities/entitiesSlice";

export const emptyEntities: EntitiesState = {
  users: {},
  seeks: {},
  games: {},
  chatMessages: {},
};

export const makeEntitiesSample = (
  data: Partial<EntitiesState>,
  originalEntitiesSample = emptyEntities
): EntitiesState => ({
  ...originalEntitiesSample,
  ...data,
});
