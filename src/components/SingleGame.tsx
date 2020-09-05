import React, { FC } from "react";
import { Board } from "ii-react-chessboard";
import Game from "../interfaces/Game";
import calculateGameFen from "../utils/calculateGameFen";

export interface SingleGameProps {
  game?: Game;
}

export const SingleGame: FC<SingleGameProps> = ({ game }) => {
  if (!game) {
    return null;
  }

  const fen: string = calculateGameFen(game);

  return <Board position={fen} />;
};
