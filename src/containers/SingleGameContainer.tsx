import React, { FC, useEffect } from "react";
import { denormalize } from "normalizr";
import { useDispatch, useSelector } from "react-redux";
import { Move } from "ii-react-chessboard";
import { SingleGame } from "../components/SingleGame";
import { AppDispatch } from "../app/store";
import { RootState } from "../app/rootReducer";
import gameSchema from "../redux/schemas/gameSchema";
import { fetchGame } from "../redux/slices/singleGameSlice";
import { makeMove } from "../redux/slices/moveSlice";
import User from "../interfaces/User";
import userSchema from "../redux/schemas/userSchema";

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

  useEffect(() => {
    dispatch(fetchGame(id));
  }, [dispatch, id]);

  const onMove = (move: Move) => {
    dispatch(makeMove(id, `${move.from}${move.to}`));
  };

  if (game) {
    return <SingleGame game={game} currentUser={currentUser} onMove={onMove} />;
  }
  return null;
};
