import React, { FC, useEffect, useState } from "react";
import { getGame, watchGames } from "../services/api";
import Game from "../interfaces/Game";
import { SingleGame } from "../components/SingleGame";

export interface SingleGameContainerProps {
  id: number;
}

export const SingleGameContainer: FC<SingleGameContainerProps> = ({ id }) => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    let mounted = true;

    getGame(id)
      .then((res) => {
        if (!mounted) {
          return;
        }

        setGame(res);
      })
      .catch(() => {});

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

  if (game) {
    return <SingleGame game={game} />;
  }
  return null;
};
