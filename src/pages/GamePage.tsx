import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { SingleGameContainer } from "../containers/SingleGameContainer";

const GamePage: FC<unknown> = () => {
  const { id } = useParams();

  return <SingleGameContainer id={Number(id)} />;
};

export default GamePage;
