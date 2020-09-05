import React, { FC, useEffect, useReducer } from "react";
import { GamePreviewsList } from "../components/GamePreviewsList";
import { getOngoingGames, watchGames } from "../services/api";
import { reducer } from "./OngoingGamesContainer.reducer";

export type OngoingGamesContainerProps = Record<string, unknown>;

export const OngoingGamesContainer: FC<OngoingGamesContainerProps> = () => {
  const [state, dispatch] = useReducer(reducer, {
    games: [],
  });

  useEffect(() => {
    let mounted = true;

    getOngoingGames().then((res) => {
      if (!mounted) {
        return;
      }

      dispatch({ type: "GET_GAMES", payload: res });
    });

    watchGames((subscriptionData) => {
      if (!mounted) {
        return;
      }

      if (subscriptionData.verb === "updated") {
        dispatch({ type: "UPDATE_GAME", payload: subscriptionData });
      } else if (subscriptionData.verb === "created") {
        dispatch({ type: "CREATE_GAME", payload: subscriptionData });
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return <GamePreviewsList games={state.games} />;
};
