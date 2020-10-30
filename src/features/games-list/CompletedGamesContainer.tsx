import React, { FC } from "react";
import { denormalize } from "normalizr";
import { useSelector } from "react-redux";
import { GamePreviewsList } from "./GamePreviewsList";
import { RootState } from "../../app/rootReducer";
import gameSchema from "../../normalizr/schemas/gameSchema";
import Game from "../../interfaces/Game";

const limit = 9;

const CompletedGamesContainer: FC<unknown> = () => {
  const games = useSelector(
    (state: RootState) =>
      denormalize(
        Object.keys(state.entities.games),
        [gameSchema],
        state.entities
      )
        .filter(
          (game: Game) => game.status !== "started" && game.status !== "aborted"
        )
        .sort((a: Game, b: Game) => b.createdAt - a.createdAt)
        .slice(0, limit),
    (a: Game[], b: Game[]) => {
      return (
        JSON.stringify(a.map((item) => item.id)) ===
        JSON.stringify(b.map((item) => item.id))
      );
    } // since the games are over, we check only arrays of ids to improve performance
  );

  const isLoading = useSelector(
    (state: RootState) => state.gamesList.isLoading
  );
  const error = useSelector((state: RootState) => state.gamesList.error);

  return (
    <GamePreviewsList
      games={games}
      isLoading={isLoading}
      error={error}
      emptyContentMessage="There is no finished games yet"
    />
  );
};

export default CompletedGamesContainer;
