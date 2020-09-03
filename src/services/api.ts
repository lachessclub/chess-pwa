import { JWR } from "sails.io.js";
import Game from "../interfaces/Game";
import ioClient from "./ioClient";
import { SubscriptionData } from "../interfaces/SubscriptionData";

export const getOngoingGames = (): Promise<Game[]> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.get("/api/v1/game/playing", (body: Game[], jwr: JWR) => {
      if (jwr.statusCode === 200) {
        resolve(body);
      } else {
        reject(jwr);
      }
    });
  });
};

export const watchGames = (cb: (data: SubscriptionData) => void): void => {
  ioClient.socket.on("game", (msg: SubscriptionData) => {
    cb(msg);
  });
};
