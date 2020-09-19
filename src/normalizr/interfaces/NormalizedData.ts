import NormalizedUserEntity from "./NormalizedUserEntity";
import NormalizedGameEntity from "./NormalizedGameEntity";

export default interface NormalizedData<
  R,
  E = Partial<{
    users: Record<string, NormalizedUserEntity>;
    games: Record<string, NormalizedGameEntity>;
  }>
> {
  result: R;
  entities: E;
}
