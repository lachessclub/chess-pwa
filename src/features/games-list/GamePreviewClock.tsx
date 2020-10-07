import React, { FC } from "react";
import moment from "moment";
import cx from "classnames";
import css from "./GamePreviewClock.module.scss";

export interface GamePreviewClockProps {
  time?: number; // in msec
  isRunning?: boolean;
}

export const GamePreviewClock: FC<GamePreviewClockProps> = ({
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
      className={cx(css.clock, { [css.clockRun]: isRunning })}
    >
      {formattedTime}
    </div>
  );
};
