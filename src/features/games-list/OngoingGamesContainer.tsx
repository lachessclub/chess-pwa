import React, { FC } from "react";
import { denormalize } from "normalizr";
import { useSelector } from "react-redux";
import { GamePreviewsList } from "./GamePreviewsList";
import { RootState } from "../../app/rootReducer";
import gameSchema from "../../normalizr/schemas/gameSchema";
import Game from "../../interfaces/Game";

const limit = 9;

const OngoingGamesContainer: FC<unknown> = () => {
  const games = useSelector((state: RootState) =>
    denormalize(Object.keys(state.entities.games), [gameSchema], state.entities)
      .filter((game: Game) => game.status === "started")
      .sort((a: Game, b: Game) => b.createdAt - a.createdAt)
      .slice(0, limit)
  );

  return <GamePreviewsList games={games} />;
};

export default OngoingGamesContainer;
