import React, { FC, useEffect } from "react";
import { denormalize } from "normalizr";
import { useDispatch, useSelector } from "react-redux";
import { GamePreviewsList } from "../components/GamePreviewsList";
import { RootState } from "../app/rootReducer";
import { fetchOngoingGames } from "../redux/slices/ongoingGamesSlice";
import gameSchema from "../redux/schemas/gameSchema";

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
