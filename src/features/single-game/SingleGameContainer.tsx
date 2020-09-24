import React, { FC, useCallback, useEffect } from "react";
import { denormalize } from "normalizr";
import { useDispatch, useSelector } from "react-redux";
import { Move } from "ii-react-chessboard";
import { SingleGame } from "./SingleGame";
import { AppDispatch } from "../../app/store";
import { RootState } from "../../app/rootReducer";
import gameSchema from "../../normalizr/schemas/gameSchema";
import {
  defaultSingleGameItemState,
  fetchGame,
  flipBoard,
} from "./singleGameSlice";
import { makeMove } from "../move/moveSlice";
import User from "../../interfaces/User";
import userSchema from "../../normalizr/schemas/userSchema";

export interface SingleGameContainerProps {
  id: number;
}

export const SingleGameContainer: FC<SingleGameContainerProps> = ({ id }) => {
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

  useEffect(() => {
    dispatch(fetchGame(id));
  }, [dispatch, id]);

  const onMove = useCallback(
    (move: Move) => {
      dispatch(makeMove(id, `${move.from}${move.to}`));
    },
    [dispatch, id]
  );
  const onFlipBoard = useCallback(() => {
    dispatch(flipBoard(id));
  }, [dispatch, id]);

  if (game) {
    return (
      <SingleGame
        game={game}
        currentUser={currentUser}
        onMove={onMove}
        onFlipBoard={onFlipBoard}
        isFlipped={singleGameItemState.isFlipped}
      />
    );
  }
  return null;
};
