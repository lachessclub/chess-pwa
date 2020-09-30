import React, { FC } from "react";
import { useSelector } from "react-redux";
import { denormalize } from "normalizr";
import { RootState } from "../../app/rootReducer";
import gameSchema from "../../normalizr/schemas/gameSchema";
import { GameMeta } from "./GameMeta";

export interface SingleGameMetaContainerProps {
  id: number;
}

export const GameMetaContainer: FC<SingleGameMetaContainerProps> = ({ id }) => {
  const game = useSelector((state: RootState) =>
    denormalize(id, gameSchema, state.entities)
  );

  if (game) {
    return <GameMeta game={game} />;
  }
  return null;
};
