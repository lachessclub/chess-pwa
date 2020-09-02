/* eslint-disable import/prefer-default-export */

import Game from "../../interfaces/Game";
import { SubscriptionData } from "../../interfaces/SubscriptionData";

/**
 * delay in msec
 */
let ongoingGamesDelay = 0;
export const setGetOngoingGamesDelay = (value: number): void => {
  ongoingGamesDelay = value;
};
let watchDelay = 0;
export const setWatchDelay = (value: number): void => {
  watchDelay = value;
};

let ongoingGames: Game[] = [];
export const setMockOngoingGames = (games: Game[]): void => {
  ongoingGames = games;
};

export const getOngoingGames = (): Promise<Game[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ongoingGames);
    }, ongoingGamesDelay);
  });
};

let subscriptionData: SubscriptionData;
export const setMockSubscriptionData = (data: SubscriptionData): void => {
  subscriptionData = data;
};

export const watchGames = (cb: (data: SubscriptionData) => void): void => {
  if (subscriptionData === undefined) {
    return;
  }

  setTimeout(() => {
    cb(subscriptionData);
  }, watchDelay);
};
