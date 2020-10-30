import React, { FC } from "react";
import { denormalize } from "normalizr";
import { useDeepEqualSelector } from "ii-react-libraries";
import { RootState } from "../../app/rootReducer";
import gameSchema from "../../normalizr/schemas/gameSchema";
import { GameMeta } from "./GameMeta";

export interface SingleGameMetaContainerProps {
  id: number;
}

export const GameMetaContainer: FC<SingleGameMetaContainerProps> = ({ id }) => {
  const game = useDeepEqualSelector(
    (state: RootState) => denormalize(id, gameSchema, state.entities),
    (_value: unknown, _other: unknown, indexOrKey: unknown) => {
      // ignore time to improve performance
      if (indexOrKey === "wtime" || indexOrKey === "btime") {
        return true;
      }
      return undefined;
    }
  );

  if (!game) {
    return null;
  }

  return <GameMeta game={game} />;
};
