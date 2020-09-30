import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GameMetaContainer } from "./GameMetaContainer";
import { GameControlPanelContainer } from "./GameControlPanelContainer";
import { SingleGameBoardContainer } from "./SingleGameBoardContainer";
import { fetchGame } from "./singleGameSlice";
import { AppDispatch } from "../../app/store";

interface GamePageParams {
  id: string;
}

const GamePage: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams<GamePageParams>();

  const idAsNumber = Number(id);

  useEffect(() => {
    dispatch(fetchGame(idAsNumber));
  }, [dispatch, idAsNumber]);

  return (
    <>
      <GameMetaContainer id={idAsNumber} />
      <GameControlPanelContainer id={idAsNumber} />
      <SingleGameBoardContainer id={idAsNumber} />
    </>
  );
};

export default GamePage;
