import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { SingleGameContainer } from "../features/single-game/SingleGameContainer";

interface GamePageParams {
  id: string;
}

const GamePage: FC<unknown> = () => {
  const { id } = useParams<GamePageParams>();

  return <SingleGameContainer id={Number(id)} />;
};

export default GamePage;
