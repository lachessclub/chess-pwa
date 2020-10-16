import React, { FC } from "react";
import Game from "../../interfaces/Game";
import css from "./GamePreviewsList.module.scss";
import { GamePreviewsListItem } from "./GamePreviewsListItem";
import { ContentLoadingStatus } from "../../components/ContentLoadingStatus";

export interface GamePreviewsListProps {
  games?: Game[];
  isLoading?: boolean;
  error?: string | null;
  emptyContentMessage?: string;
}

export const GamePreviewsList: FC<GamePreviewsListProps> = ({
  games = [],
  isLoading = false,
  error = null,
  emptyContentMessage,
}) => {
  return (
    <div>
      <ContentLoadingStatus
        isLoading={isLoading}
        error={error}
        isEmpty={games.length === 0}
        emptyContentMessage={emptyContentMessage}
      />
      <div className={css.grid}>
        {games.map((item) => (
          <GamePreviewsListItem game={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
