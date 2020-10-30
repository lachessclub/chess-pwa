/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Board,
  getValidMoves,
  isValidMove,
  Move,
  PieceColor,
  ValidMoves,
} from "ii-react-chessboard";
import { ChessInstance, PieceType, ShortMove, Square } from "chess.js";
import Game from "../../interfaces/Game";
import makeChessInstance from "../../utils/makeChessInstance";
import User from "../../interfaces/User";
import css from "./SingleGameBoard.module.scss";
import { ContentLoadingStatus } from "../../components/ContentLoadingStatus";
import GameStatus from "../../types/GameStatus";
import {
  playEndGameSound,
  playMoveSound,
  playStartGameSound,
} from "../../utils/sounds";
import { getMovesQnt, isPromotionMove } from "../../utils/chess";
import { PromotionChoiceModal } from "./PromotionChoiceModal";

export interface SingleGameBoardProps {
  currentUser?: User;
  game?: Game;
  isFlipped?: boolean;
  onMove?(move: ShortMove): void;
  rewindToMoveIndex?: number | null;
  isLoading?: boolean;
  error?: string | null;
}

export const SingleGameBoard: FC<SingleGameBoardProps> = ({
  currentUser,
  game,
  isFlipped = false,
  onMove,
  rewindToMoveIndex = null,
  isLoading = false,
  error = null,
}) => {
  const premove = useRef<[Move, () => void, () => void] | null>(null);

  // @todo. test useEffect
  const lastStatus = useRef<GameStatus | null>(null);
  useEffect(() => {
    if (!game) {
      return;
    }

    if (lastStatus.current === "started" && game.status !== "started") {
      playEndGameSound();
    }
    lastStatus.current = game.status;
  }, [game, lastStatus]);

  // cancel premove if game is over or if we rewind moves
  // @todo. test useEffect
  useEffect(() => {
    if (!game) {
      return;
    }

    if (
      premove.current &&
      (game.status !== "started" || rewindToMoveIndex !== null)
    ) {
      premove.current[2](); // cancelPremove()
    }
  }, [game, rewindToMoveIndex]);

  // @todo. test useEffect
  const lastSelectedMoveIndex = useRef<number | null>(null);
  useEffect(() => {
    if (!game) {
      return;
    }

    const movesQnt = getMovesQnt(game);

    if (lastSelectedMoveIndex.current === null && movesQnt === 0) {
      playStartGameSound();
    }

    const selectedMoveIndex =
      rewindToMoveIndex === null ? movesQnt : rewindToMoveIndex;

    if (
      lastSelectedMoveIndex.current !== null &&
      selectedMoveIndex === lastSelectedMoveIndex.current + 1
    ) {
      playMoveSound();
    }

    lastSelectedMoveIndex.current = selectedMoveIndex;
  }, [game, lastSelectedMoveIndex, rewindToMoveIndex]);

  // play premove
  // @todo. test useEffect
  const lastMovesQnt = useRef<number | null>(null);
  useEffect(() => {
    if (!game) {
      return;
    }

    const movesQnt = getMovesQnt(game);

    if (
      premove.current &&
      lastMovesQnt.current !== null &&
      movesQnt === lastMovesQnt.current + 1 &&
      game.status === "started" &&
      rewindToMoveIndex === null
    ) {
      const chess: ChessInstance = makeChessInstance(game);

      if (isValidMove(chess, premove.current[0])) {
        premove.current[1](); // playPremove()
        premove.current = null;
      } else {
        premove.current[2](); // cancelPremove()
      }
    }

    lastMovesQnt.current = movesQnt;
  }, [game, lastMovesQnt, rewindToMoveIndex]);

  const handleSetPremove = useCallback(
    (move: Move, playPremove: () => void, cancelPremove: () => void) => {
      premove.current = [move, playPremove, cancelPremove];
    },
    [premove]
  );

  const handleUnsetPremove = useCallback(() => {
    premove.current = null;
  }, [premove]);

  const [showPromotionChoice, setShowPromotionChoice] = useState<boolean>(
    false
  );

  // @todo. test useEffect
  useEffect(() => {
    if (!game) {
      return;
    }

    if (showPromotionChoice && game.status !== "started") {
      setShowPromotionChoice(false);
    }
  }, [showPromotionChoice, game]);

  const promotionMove = useRef<Move | null>(null);

  const handleMove = useCallback(
    (move: Move) => {
      if (!onMove) {
        return;
      }

      if (isPromotionMove(game!, move)) {
        setShowPromotionChoice(true);
        promotionMove.current = move;
      } else {
        onMove(move as ShortMove);
      }
    },
    [onMove, game]
  );

  const handlePromotion = useCallback(
    (promotionPiece: Exclude<PieceType, "p">): void => {
      setShowPromotionChoice(false);

      const chess: ChessInstance = makeChessInstance(game!);

      if (
        onMove &&
        promotionMove.current &&
        isValidMove(chess, promotionMove.current)
      ) {
        const move: ShortMove = {
          from: promotionMove.current.from as Square,
          to: promotionMove.current.to as Square,
          promotion: promotionPiece,
        };
        onMove(move);
      }
    },
    [onMove, game]
  );

  let boardContent = null;

  if (game) {
    const chessWithAllMoves: ChessInstance = makeChessInstance(game);

    const chess =
      rewindToMoveIndex === null
        ? chessWithAllMoves
        : makeChessInstance(game, rewindToMoveIndex);

    const fen: string = chess.fen();

    const check: boolean = chess.in_check();

    const turnColor: PieceColor = game.turn;

    const validMoves: ValidMoves = getValidMoves(chess);

    let viewOnly = true;
    if (
      currentUser &&
      (currentUser.id === game.white?.id ||
        currentUser.id === game.black?.id) &&
      game.status === "started" &&
      rewindToMoveIndex === null
    ) {
      viewOnly = false;
    }

    let movableColor: PieceColor | undefined;
    if (currentUser && currentUser.id === game.white?.id) {
      movableColor = "white";
    }
    if (currentUser && currentUser.id === game.black?.id) {
      movableColor = "black";
    }

    let orientation: PieceColor = "white";
    if (currentUser && currentUser.id === game.black?.id) {
      orientation = "black";
    }
    if (isFlipped) {
      orientation = orientation === "white" ? "black" : "white";
    }

    const movesHistory = chessWithAllMoves.history({ verbose: true });

    let lastMoveSquares: string[] | undefined;
    if (rewindToMoveIndex === null) {
      if (movesHistory.length) {
        const lastMove = movesHistory[movesHistory.length - 1];
        lastMoveSquares = [lastMove.from, lastMove.to];
      }
    } else if (rewindToMoveIndex > 0) {
      const lastMove = movesHistory[rewindToMoveIndex - 1];
      lastMoveSquares = [lastMove.from, lastMove.to];
    }

    boardContent = (
      <>
        <PromotionChoiceModal
          show={showPromotionChoice}
          turnColor={game.turn}
          onPromotion={handlePromotion}
        />
        <div className={css.singleGameBoard}>
          <Board
            allowMarkers
            check={check}
            clickable
            draggable
            lastMoveSquares={lastMoveSquares}
            movableColor={movableColor}
            onMove={handleMove}
            onSetPremove={handleSetPremove}
            onUnsetPremove={handleUnsetPremove}
            orientation={orientation}
            position={fen}
            premovable
            turnColor={turnColor}
            validMoves={validMoves}
            viewOnly={viewOnly}
          />
        </div>
      </>
    );
  }

  return (
    <div>
      <ContentLoadingStatus
        isLoading={isLoading}
        error={error}
        isEmpty={!game}
      />
      {boardContent}
    </div>
  );
};
