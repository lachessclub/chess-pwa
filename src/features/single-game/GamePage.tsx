import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GameMetaContainer } from "./GameMetaContainer";
import { GameControlPanelContainer } from "./GameControlPanelContainer";
import { SingleGameBoardContainer } from "./SingleGameBoardContainer";
import { fetchGame } from "./singleGameSlice";
import { AppDispatch } from "../../app/store";
import { Chat } from "../chat/Chat";
import { fetchChatMessages } from "../chat/chatSlice";

interface GamePageParams {
  id: string;
}

const GamePage: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams<GamePageParams>();

  const idAsNumber = Number(id);

  useEffect(() => {
    dispatch(fetchGame(idAsNumber));
    dispatch(fetchChatMessages(idAsNumber));
  }, [dispatch, idAsNumber]);

  return (
    <div className="row">
      <div className="col-3">
        <GameMetaContainer id={idAsNumber} />

        <Chat gameId={idAsNumber} />
      </div>
      <div className="col-6">
        <SingleGameBoardContainer id={idAsNumber} />
      </div>
      <div className="col-3">
        <GameControlPanelContainer id={idAsNumber} />
      </div>
    </div>
  );
};

export default GamePage;
