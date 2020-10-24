/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC, FormEvent } from "react";
import { Formik, FormikHelpers } from "formik";
import { Button, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import css from "./PostChatMessageForm.module.scss";

export interface PostChatMessageFormData {
  text: string;
}

export interface PostChatMessageFormProps {
  onSubmit?(
    values: PostChatMessageFormData,
    formikHelpers: FormikHelpers<PostChatMessageFormData>
  ): void | Promise<any>;
}

export const PostChatMessageForm: FC<PostChatMessageFormProps> = ({
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={{
        text: "",
      }}
      onSubmit={(values, formikHelpers): Promise<any> | void => {
        if (onSubmit) {
          return onSubmit(
            values as PostChatMessageFormData,
            formikHelpers as FormikHelpers<PostChatMessageFormData>
          );
        }
        return undefined;
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setStatus,
      }) => (
        <Form
          noValidate
          onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
          onChange={() => setStatus("")}
        >
          <div className="d-flex">
            <div className="flex-grow-1 mr-2">
              <Form.Control
                className={css.textInput}
                name="text"
                autoComplete="off"
                placeholder="Please be nice in the chat!"
                onBlur={handleBlur}
                value={values.text}
                onChange={handleChange}
              />
            </div>
            <div>
              <Button
                disabled={isSubmitting || values.text === ""}
                type="submit"
              >
                {isSubmitting && (
                  <Spinner
                    animation="border"
                    data-testid="submit-btn-spinner"
                    size="sm"
                    className="mr-2"
                  >
                    <span className="sr-only">Sending...</span>
                  </Spinner>
                )}
                <FontAwesomeIcon icon={faPaperPlane} />
                <span className="sr-only">Offer a draw</span>
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
