import NormalizedUserEntity from "./NormalizedUserEntity";
import NormalizedGameEntity from "./NormalizedGameEntity";
import NormalizedChatMessageEntity from "./NormalizedChatMessageEntity";
import NormalizedSeekEntity from "./NormalizedSeekEntity";

export default interface NormalizedData<
  R,
  E = Partial<{
    users: Record<string, NormalizedUserEntity>;
    games: Record<string, NormalizedGameEntity>;
    seeks: Record<string, NormalizedSeekEntity>;
    chatMessages: Record<string, NormalizedChatMessageEntity>;
  }>
> {
  result: R;
  entities: E;
}
