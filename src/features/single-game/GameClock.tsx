import React, { FC } from "react";
import moment from "moment";

export interface GameClockProps {
  time?: number; // in msec
}

export const GameClock: FC<GameClockProps> = ({ time = 0 }) => {
  const formattedTime = moment()
    .startOf("day")
    .milliseconds(time)
    .format("mm : ss");

  return <div data-testid="time">{formattedTime}</div>;
};
