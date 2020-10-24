import { FormikHelpers } from "formik";
import React, { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  PostChatMessageForm,
  PostChatMessageFormData,
} from "./PostChatMessageForm";
import { createChatMessage } from "./chatSlice";

export interface PostChatMessageFormContainerProps {
  gameId: number;
}

export const PostChatMessageFormContainer: FC<PostChatMessageFormContainerProps> = ({
  gameId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = useCallback(
    (
      values: PostChatMessageFormData,
      formikHelpers: FormikHelpers<PostChatMessageFormData>
    ) => {
      formikHelpers.resetForm();

      return dispatch(createChatMessage(gameId, values.text));
    },
    [dispatch, gameId]
  );

  return <PostChatMessageForm onSubmit={handleSubmit} />;
};
