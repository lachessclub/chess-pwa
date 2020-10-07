import React, { FC } from "react";
import moment from "moment";
import cx from "classnames";
import css from "./GameClock.module.scss";

export interface GameClockProps {
  time?: number; // in msec
  isRunning?: boolean;
}

export const GameClock: FC<GameClockProps> = ({
  time = 0,
  isRunning = false,
}) => {
  const formattedTime = moment()
    .startOf("day")
    .milliseconds(time)
    .format("mm:ss");

  return (
    <div
      data-testid="time"
      className={cx(css.clock, {
        [css.clockRun]: isRunning,
        [css.clockEmerg]: time < 10000,
      })}
    >
      {formattedTime}
    </div>
  );
};
