/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

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

let getGameDelay = 0;
export const setGetGameDelay = (value: number): void => {
  getGameDelay = value;
};

let statusCode = 200;
let mockGameResponse: any;
export const setMockGame = (data: any, _statusCode: number = 200): void => {
  mockGameResponse = data;
  statusCode = _statusCode;
};

export const getOngoingGames = (): Promise<Game[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ongoingGames);
    }, ongoingGamesDelay);
  });
};

export const getGame = (): Promise<Game> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (statusCode === 200) {
        resolve(mockGameResponse);
      } else {
        reject({
          body: mockGameResponse,
          statusCode,
        });
      }
    }, getGameDelay);
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

export const makeMove = jest.fn();
