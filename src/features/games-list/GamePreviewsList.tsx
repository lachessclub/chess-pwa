import React, { FC } from "react";
import Game from "../../interfaces/Game";
import css from "./GamePreviewsList.module.scss";
import { GamePreviewsListItem } from "./GamePreviewsListItem";

export interface GamePreviewsListProps {
  games?: Game[];
}

export const GamePreviewsList: FC<GamePreviewsListProps> = ({ games = [] }) => {
  return (
    <div className={css.grid}>
      {games.map((item) => (
        <GamePreviewsListItem game={item} key={item.id} />
      ))}
    </div>
  );
};
