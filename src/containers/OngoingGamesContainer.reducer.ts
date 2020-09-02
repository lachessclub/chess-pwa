import { createReducer } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import Game from "../interfaces/Game";
import { SubscriptionData } from "../interfaces/SubscriptionData";

export interface State {
  games: Game[];
}

export type Action =
  | { type: "GET_GAMES"; payload: Game[] }
  | { type: "UPDATE_GAME"; payload: SubscriptionData }
  | { type: "CREATE_GAME"; payload: SubscriptionData };

const getGames = (state: State, { payload }: Action): State => ({
  games: payload as Game[],
});

const updateGame = (state: State, { payload }: Action): State => {
  const subscriptionData = payload as SubscriptionData;

  const game = {
    ...subscriptionData.previous,
    ...subscriptionData.data,
  };

  const index: number = findIndex(state.games, {
    id: subscriptionData.id,
  });

  if (index !== -1) {
    return {
      games: state.games.map((item, itemIndex) => {
        if (itemIndex === index) {
          return game;
        }
        return item;
      }),
    };
  }

  return {
    games: [...state.games, game],
  };
};

const createGame = (state: State, { payload }: Action): State => ({
  games: [...state.games, (payload as SubscriptionData).data],
});

export const reducer = createReducer<State>(
  {
    games: [],
  },
  {
    GET_GAMES: getGames,
    UPDATE_GAME: updateGame,
    CREATE_GAME: createGame,
  }
);
