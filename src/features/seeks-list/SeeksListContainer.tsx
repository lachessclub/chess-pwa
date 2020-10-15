/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { denormalize } from "normalizr";
import seekSchema from "../../normalizr/schemas/seekSchema";
import { RootState } from "../../app/rootReducer";
import { SeeksList } from "./SeeksList";
import { acceptSeek } from "../challenge/challengeSlice";
import { AppDispatch } from "../../app/store";
import { Seek } from "../../interfaces/Seek";

const SeeksListContainer: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const history = useHistory();

  const currentUserId = useSelector(
    (state: RootState) => state.currentUser.userId
  );

  const seeks = useSelector((state: RootState) =>
    denormalize(state.seeksList.items, [seekSchema], state.entities)
  );

  const acceptSeekRequest = useSelector(
    (state: RootState) => state.acceptSeekRequest
  );

  const acceptInProcess = acceptSeekRequest.inProcess
    ? acceptSeekRequest.itemId
    : null;

  const handlePlay = useCallback(
    (seekId: number) => {
      return dispatch(acceptSeek(seekId))
        .then((seek: Seek) => {
          history.push(`/game/${seek.game!.id}`);
        })
        .catch(() => {});
    },
    [dispatch, history]
  );

  return (
    <SeeksList
      currentUserId={currentUserId}
      seeks={seeks}
      onPlay={handlePlay}
      acceptInProcess={acceptInProcess}
    />
  );
};

export default SeeksListContainer;
