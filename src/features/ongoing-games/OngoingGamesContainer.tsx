import React, { FC, useEffect } from "react";
import { denormalize } from "normalizr";
import { useDispatch, useSelector } from "react-redux";
import { GamePreviewsList } from "./GamePreviewsList";
import { RootState } from "../../app/rootReducer";
import { fetchOngoingGames } from "./ongoingGamesSlice";
import gameSchema from "../../normalizr/schemas/gameSchema";

const OngoingGamesContainer: FC<unknown> = () => {
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) =>
    denormalize(state.ongoingGames.items, [gameSchema], state.entities)
  );

  useEffect(() => {
    dispatch(fetchOngoingGames());
  }, [dispatch]);

  return <GamePreviewsList games={items} />;
};

export default OngoingGamesContainer;
