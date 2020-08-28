/**
 * Renders a chess board using React
 */
import React, { FC } from "react";
import { Board } from "ii-react-chessboard";
import Game from "../interfaces/Game";
import css from "./GamePreviewsList.module.scss";

const initialBoardFen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export interface GamePreviewsListProps {
  games?: Game[];
}

export const GamePreviewsList: FC<GamePreviewsListProps> = ({ games = [] }) => {
  return (
    <div className={css.grid}>
      {games.map((item) => {
        let fen: string = item.initialFen;
        if (fen === "startpos") {
          fen = initialBoardFen;
        }

        return (
          <div className={css.cell} key={item.id}>
            <Board position={fen} viewOnly={false} width={240} />
          </div>
        );
      })}
    </div>
  );
};
