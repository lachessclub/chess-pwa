import React, { FC } from "react";
import Game from "../../interfaces/Game";
import getGameStatusText from "../../utils/getGameStatusText";

export interface GameMetaProps {
  game?: Game;
}

export const GameMeta: FC<GameMetaProps> = ({ game }) => {
  if (!game) {
    return null;
  }

  return (
    <>
      <div>{getGameStatusText(game)}</div>
      <div>
        {game.clockLimit / 60} + {game.clockIncrement}
      </div>
      <div data-testid="white-user">
        White: {game.white ? game.white.fullName : `AI level ${game.aiLevel}`}
      </div>
      <div data-testid="black-user">
        Black: {game.black ? game.black.fullName : `AI level ${game.aiLevel}`}
      </div>
    </>
  );
};
