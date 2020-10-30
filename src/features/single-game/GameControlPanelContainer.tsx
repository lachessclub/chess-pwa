import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { denormalize } from "normalizr";
import {
  useDeepEqualSelector,
  useShallowEqualSelector,
} from "ii-react-libraries";
import { RootState } from "../../app/rootReducer";
import gameSchema from "../../normalizr/schemas/gameSchema";
import { GameControlPanelWrapper } from "./GameControlPanelWrapper";
import User from "../../interfaces/User";
import userSchema from "../../normalizr/schemas/userSchema";
import {
  abortGame,
  acceptDrawOffer,
  declineDrawOffer,
  defaultSingleGameItemState,
  flipBoard,
  offerDraw,
  resignGame,
  rewindToMove,
} from "./singleGameSlice";
import { AppDispatch } from "../../app/store";

export interface SingleGameControlPanelContainerProps {
  id: number;
}

export const GameControlPanelContainer: FC<SingleGameControlPanelContainerProps> = ({
  id,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const game = useDeepEqualSelector((state: RootState) =>
    denormalize(id, gameSchema, state.entities)
  );

  const singleGameItemState =
    useSelector((state: RootState) => state.singleGame[id]) ||
    defaultSingleGameItemState;

  const currentUser: User | undefined = useShallowEqualSelector(
    (state: RootState) => {
      if (state.currentUser.userId) {
        return denormalize(
          state.currentUser.userId,
          userSchema,
          state.entities
        );
      }
      return undefined;
    }
  );

  const handleFlipBoard = useCallback(() => {
    dispatch(flipBoard(id));
  }, [dispatch, id]);

  const handleAbortGame = useCallback(() => {
    dispatch(abortGame(id));
  }, [dispatch, id]);

  const handleAcceptDrawOffer = useCallback(() => {
    dispatch(acceptDrawOffer(id));
  }, [dispatch, id]);

  const handleDeclineDrawOffer = useCallback(() => {
    dispatch(declineDrawOffer(id));
  }, [dispatch, id]);

  const handleResignGame = useCallback(() => {
    dispatch(resignGame(id));
  }, [dispatch, id]);

  const handleOfferDraw = useCallback(() => {
    dispatch(offerDraw(id));
  }, [dispatch, id]);

  const handleRewindToMove = useCallback(
    (moveIndex: number | null) => {
      dispatch(
        rewindToMove({
          moveIndex,
          gameId: id,
        })
      );
    },
    [dispatch, id]
  );

  if (game) {
    return (
      <GameControlPanelWrapper
        game={game}
        currentUser={currentUser}
        isFlipped={singleGameItemState.isFlipped}
        rewindToMoveIndex={singleGameItemState.rewindToMoveIndex}
        onFlipBoard={handleFlipBoard}
        onAbortGame={handleAbortGame}
        onAcceptDrawOffer={handleAcceptDrawOffer}
        onDeclineDrawOffer={handleDeclineDrawOffer}
        onOfferDraw={handleOfferDraw}
        onResignGame={handleResignGame}
        onRewindToMove={handleRewindToMove}
      />
    );
  }
  return null;
};
