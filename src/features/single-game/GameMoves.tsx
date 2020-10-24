/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */ // @todo
/* eslint-disable jsx-a11y/interactive-supports-focus */ // @todo

import React, { FC, useEffect, useRef } from "react";
import { chunk as _chunk } from "lodash";
import { Move } from "chess.js";
import cx from "classnames";
import Game from "../../interfaces/Game";
import makeChessInstance from "../../utils/makeChessInstance";
import css from "./GameMoves.module.scss";
import { GameControlPanelStatus } from "./GameControlPanelStatus";
import GameStatus from "../../types/GameStatus";

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
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const lastMovesQnt = useRef<number>(-1);
  const lastGameStatus = useRef<GameStatus>();

  // @todo. add unit test
  useEffect(() => {
    if (!game) {
      return;
    }

    const chess = makeChessInstance(game);
    const movesHistory = chess.history();

    if (
      (lastMovesQnt.current !== movesHistory.length ||
        lastGameStatus.current !== game.status) &&
      rewindToMoveIndex === null
    ) {
      if (scrollElementRef.current) {
        scrollElementRef.current.scrollTop =
          scrollElementRef.current.scrollHeight;
      }
    }
    lastMovesQnt.current = movesHistory.length;
    lastGameStatus.current = game.status;
  }, [game, lastMovesQnt, lastGameStatus, rewindToMoveIndex, scrollElementRef]);

  if (!game) {
    return null;
  }

  const chess = makeChessInstance(game);

  const movesHistory = chess.history({ verbose: true });

  const movesQnt = movesHistory.length;

  const movesPairs = _chunk(movesHistory, 2);

  const makeRewindToMoveHandler = (moveIndex: number) => {
    return () => {
      if (onRewindToMove) {
        onRewindToMove(moveIndex);
      }
    };
  };

  return (
    <div className={css.movesWrapper} ref={scrollElementRef}>
      {movesPairs.map((pair, index) => {
        const whiteMoveIndex = index * 2 + 1;
        const blackMoveIndex = index * 2 + 2;

        return (
          <React.Fragment key={`move-${index}`}>
            <div className={css.moveNumber}>{index + 1}</div>
            <div
              data-testid={`move-${whiteMoveIndex}`}
              onClick={makeRewindToMoveHandler(whiteMoveIndex)}
              role="button"
              className={cx(css.move, {
                [css.selected]:
                  rewindToMoveIndex === whiteMoveIndex ||
                  (rewindToMoveIndex === null && movesQnt === whiteMoveIndex),
              })}
            >
              {formatMove(pair[0])}
            </div>
            {pair[1] && (
              <div
                data-testid={`move-${blackMoveIndex}`}
                onClick={makeRewindToMoveHandler(blackMoveIndex)}
                role="button"
                className={cx(css.move, {
                  [css.selected]:
                    rewindToMoveIndex === blackMoveIndex ||
                    (rewindToMoveIndex === null && movesQnt === blackMoveIndex),
                })}
              >
                {formatMove(pair[1])}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {game.status !== "started" && <GameControlPanelStatus game={game} />}
    </div>
  );
};
