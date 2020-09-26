import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { DrawOfferDialog } from "../DrawOfferDialog";

describe("DrawOfferDialog", () => {
  describe("Events", () => {
    it("onAccept", () => {
      const onAccept = jest.fn();

      const { getByTestId } = render(<DrawOfferDialog onAccept={onAccept} />);

      fireEvent.click(getByTestId("accept-btn"));

      expect(onAccept).toBeCalledTimes(1);
      expect(onAccept).toBeCalledWith();
    });

    it("onDecline", () => {
      const onDecline = jest.fn();

      const { getByTestId } = render(<DrawOfferDialog onDecline={onDecline} />);

      fireEvent.click(getByTestId("decline-btn"));

      expect(onDecline).toBeCalledTimes(1);
      expect(onDecline).toBeCalledWith();
    });
  });
});
