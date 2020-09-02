import Game from "../interfaces/Game";
import ioClient from "./ioClient";
import { SubscriptionData } from "../interfaces/SubscriptionData";

export const getOngoingGames = (): Promise<Game[]> => {
  return new Promise((resolve) => {
    ioClient.socket.get("/api/v1/game/playing", (body: Game[]) => {
      resolve(body);
    });
  });
};

export const watchGames = (cb: (data: SubscriptionData) => void): void => {
  ioClient.socket.on("game", (msg: SubscriptionData) => {
    cb(msg);
  });
};
