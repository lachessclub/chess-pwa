import React, { FC, useEffect, useState } from "react";
import { getGame, watchGames } from "../services/api";
import Game from "../interfaces/Game";
import { SingleGame } from "../components/SingleGame";

export interface GameContainerProps {
  id: number;
}

export const SingleGameContainer: FC<GameContainerProps> = ({ id }) => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    getGame(id)
      .then((res) => setGame(res))
      .catch(() => {});

    watchGames((subscriptionData) => {
      if (subscriptionData.id === id) {
        if (subscriptionData.verb === "updated") {
          setGame({
            ...subscriptionData.previous,
            ...subscriptionData.data,
          });
        }
      }
    });
  }, [id]);

  if (game) {
    return <SingleGame game={game} />;
  }
  return null;
};
