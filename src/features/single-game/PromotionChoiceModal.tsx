import React, { FC } from "react";
import classNames from "classnames";
import { Modal } from "react-bootstrap";
import { PieceType } from "chess.js";
import { PieceColor } from "../../types/PieceColor";
import css from "./PromotionChoiceModal.module.scss";

export interface PromotionChoiceModalProps {
  show?: boolean;
  turnColor?: PieceColor;
  onPromotion?: (promotionPiece: Exclude<PieceType, "p">) => void;
}

export const PromotionChoiceModal: FC<PromotionChoiceModalProps> = ({
  show = false,
  turnColor = "white",
  onPromotion,
}) => {
  const makePromotionHandler = (promotionPiece: Exclude<PieceType, "p">) => {
    return () => {
      if (onPromotion) {
        onPromotion(promotionPiece);
      }
    };
  };

  return (
    <Modal show={show} animation={false} backdrop="static">
      <Modal.Body>
        <div style={{ textAlign: "center", cursor: "pointer" }}>
          <span
            data-testid="promotion-q"
            role="presentation"
            onClick={makePromotionHandler("q")}
          >
            <div
              className={classNames(css.piece, {
                [css.wQ]: turnColor === "white",
                [css.bQ]: turnColor === "black",
              })}
            />
          </span>
          <span
            data-testid="promotion-r"
            role="presentation"
            onClick={makePromotionHandler("r")}
          >
            <div
              className={classNames(css.piece, {
                [css.wR]: turnColor === "white",
                [css.bR]: turnColor === "black",
              })}
            />
          </span>
          <span
            data-testid="promotion-b"
            role="presentation"
            onClick={makePromotionHandler("b")}
          >
            <div
              className={classNames(css.piece, {
                [css.wB]: turnColor === "white",
                [css.bB]: turnColor === "black",
              })}
            />
          </span>
          <span
            data-testid="promotion-n"
            role="presentation"
            onClick={makePromotionHandler("n")}
          >
            <div
              className={classNames(css.piece, {
                [css.wN]: turnColor === "white",
                [css.bN]: turnColor === "black",
              })}
            />
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};
