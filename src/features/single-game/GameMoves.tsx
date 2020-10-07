/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */ // @todo
/* eslint-disable jsx-a11y/interactive-supports-focus */ // @todo

import React, { FC } from "react";
import { chunk as _chunk } from "lodash";
import { Move } from "chess.js";
import cx from "classnames";
import Game from "../../interfaces/Game";
import makeChessInstance from "../../utils/makeChessInstance";
import css from "./GameMoves.module.scss";
import { GameControlPanelStatus } from "./GameControlPanelStatus";

export interface GameMovesProps {
  game?: Game;
  rewindToMoveIndex?: number | null;
  onRewindToMove?(moveIndex: number): void;
}

const formatMove = (move: Move): string => {
  return `${move.from}${move.to}`;
};

export const GameMoves: FC<GameMovesProps> = ({
  game,
  rewindToMoveIndex = null,
  onRewindToMove,
}) => {
  if (!game) {
    return null;
  }

  const chess = makeChessInstance(game);

  const movesHistory = chess.history({ verbose: true });

  const movesPairs = _chunk(movesHistory, 2);

  const makeRewindToMoveHandler = (moveIndex: number) => {
    return () => {
      if (onRewindToMove) {
        onRewindToMove(moveIndex);
      }
    };
  };

  return (
    <div className={css.movesWrapper}>
      {movesPairs.map((pair, index) => (
        <React.Fragment key={`move-${index}`}>
          <div className={css.moveNumber}>{index + 1}</div>
          <div
            data-testid={`move-${index * 2}`}
            onClick={makeRewindToMoveHandler(index * 2)}
            role="button"
            className={cx(css.move, {
              [css.selected]: rewindToMoveIndex === index * 2,
            })}
          >
            {formatMove(pair[0])}
          </div>
          {pair[1] && (
            <div
              data-testid={`move-${index * 2 + 1}`}
              onClick={makeRewindToMoveHandler(index * 2 + 1)}
              role="button"
              className={cx(css.move, {
                [css.selected]: rewindToMoveIndex === index * 2 + 1,
              })}
            >
              {formatMove(pair[1])}
            </div>
          )}
        </React.Fragment>
      ))}

      {game.status !== "started" && <GameControlPanelStatus game={game} />}
    </div>
  );
};
