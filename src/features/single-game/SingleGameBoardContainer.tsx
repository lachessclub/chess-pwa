/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Move } from "ii-react-chessboard";
import { denormalize } from "normalizr";
import {
  useDeepEqualSelector,
  useShallowEqualSelector,
} from "ii-react-libraries";
import { RootState } from "../../app/rootReducer";
import gameSchema from "../../normalizr/schemas/gameSchema";
import { SingleGameBoard } from "./SingleGameBoard";
import User from "../../interfaces/User";
import userSchema from "../../normalizr/schemas/userSchema";
import { defaultSingleGameItemState } from "./singleGameSlice";
import { makeMove } from "../move/moveSlice";
import { AppDispatch } from "../../app/store";

export interface SingleGameBoardProps {
  id: number;
}

export const SingleGameBoardContainer: FC<SingleGameBoardProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const game = useDeepEqualSelector(
    (state: RootState) => denormalize(id, gameSchema, state.entities),
    (_value: any, _other: any, indexOrKey: any) => {
      // ignore time to improve performance
      if (indexOrKey === "wtime" || indexOrKey === "btime") {
        return true;
      }
      return undefined;
    }
  );

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

  const singleGameItemState =
    useSelector((state: RootState) => state.singleGame[id]) ||
    defaultSingleGameItemState;

  const handleMove = useCallback(
    (move: Move) => {
      dispatch(makeMove(id, `${move.from}${move.to}`));
    },
    [dispatch, id]
  );

  return (
    <SingleGameBoard
      game={game}
      currentUser={currentUser}
      isFlipped={singleGameItemState.isFlipped}
      rewindToMoveIndex={singleGameItemState.rewindToMoveIndex}
      onMove={handleMove}
      isLoading={singleGameItemState.isLoading}
      error={singleGameItemState.error}
    />
  );
};
