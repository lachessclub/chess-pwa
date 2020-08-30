/* eslint-disable import/prefer-default-export */

import Game from "../interfaces/Game";

export const getOngoingGames = (): Promise<Game[]> => {
  return fetch("http://localhost:1337/api/v1/game/playing").then((response) => {
    return response.json();
  });
};
