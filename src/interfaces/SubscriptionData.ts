/* eslint-disable @typescript-eslint/no-explicit-any */

import Game from "./Game";

export interface SubscriptionData {
  verb: "created" | "updated";
  data: any;
  previous?: Game;
  id: number;
}
