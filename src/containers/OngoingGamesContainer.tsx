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
    getOngoingGames().then((res) => {
      dispatch({ type: "GET_GAMES", payload: res });
    });

    watchGames((subscriptionData) => {
      if (subscriptionData.verb === "updated") {
        dispatch({ type: "UPDATE_GAME", payload: subscriptionData });
      } else if (subscriptionData.verb === "created") {
        dispatch({ type: "CREATE_GAME", payload: subscriptionData });
      }
    });
  }, []);

  return <GamePreviewsList games={state.games} />;
};
