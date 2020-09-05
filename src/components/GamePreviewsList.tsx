import React, { FC } from "react";
import { Board } from "ii-react-chessboard";
import { Link } from "react-router-dom";
import Game from "../interfaces/Game";
import css from "./GamePreviewsList.module.scss";
import calculateGameFen from "../utils/calculateGameFen";

export interface GamePreviewsListProps {
  games?: Game[];
}

export const GamePreviewsList: FC<GamePreviewsListProps> = ({ games = [] }) => {
  return (
    <div className={css.grid}>
      {games.map((item) => {
        const fen: string = calculateGameFen(item);

        return (
          <Link to={`/game/${item.id}`} key={item.id}>
            <div className={css.cell}>
              <Board position={fen} viewOnly={false} width={240} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};
