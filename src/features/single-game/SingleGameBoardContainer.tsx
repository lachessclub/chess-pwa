import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Move } from "ii-react-chessboard";
import { denormalize } from "normalizr";
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

  const game = useSelector((state: RootState) =>
    denormalize(id, gameSchema, state.entities)
  );

  const currentUser: User | undefined = useSelector((state: RootState) => {
    if (state.currentUser.userId) {
      return denormalize(state.currentUser.userId, userSchema, state.entities);
    }
    return undefined;
  });

  const singleGameItemState =
    useSelector((state: RootState) => state.singleGame[id]) ||
    defaultSingleGameItemState;

  const handleMove = useCallback(
    (move: Move) => {
      dispatch(makeMove(id, `${move.from}${move.to}`));
    },
    [dispatch, id]
  );

  if (game) {
    return (
      <SingleGameBoard
        game={game}
        currentUser={currentUser}
        isFlipped={singleGameItemState.isFlipped}
        rewindToMoveIndex={singleGameItemState.rewindToMoveIndex}
        onMove={handleMove}
      />
    );
  }
  return null;
};
