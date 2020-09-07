/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC, useEffect, useState } from "react";
import { Move } from "ii-react-chessboard";
import { getGame, makeMove, watchGames } from "../services/api";
import Game from "../interfaces/Game";
import { SingleGame } from "../components/SingleGame";

export interface SingleGameContainerProps {
  id: number;
}

export const SingleGameContainer: FC<SingleGameContainerProps> = ({ id }) => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    let mounted = true;

    getGame(id).then((res) => {
      if (!mounted) {
        return;
      }

      setGame(res);
    });

    watchGames((subscriptionData) => {
      if (!mounted) {
        return;
      }

      if (subscriptionData.id === id) {
        if (subscriptionData.verb === "updated") {
          setGame({
            ...subscriptionData.previous,
            ...subscriptionData.data,
          });
        }
      }
    });

    return () => {
      mounted = false;
    };
  }, [id]);

  const onMove = (move: Move) => {
    setGame({
      ...(game as Game),
      moves: `${game!.moves} ${move.from}${move.to}`.trim(),
    });

    makeMove(id, `${move.from}${move.to}`).then((updatedGame) => {
      setGame(updatedGame);
    });
  };

  if (game) {
    return <SingleGame game={game} onMove={onMove} />;
  }
  return null;
};
