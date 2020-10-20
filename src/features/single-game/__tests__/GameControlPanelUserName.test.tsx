import React from "react";
import { render } from "@testing-library/react";
import { makeGameSample } from "../../../test-utils/data-sample/game";
import { GameControlPanelUserName } from "../GameControlPanelUserName";
import {
  makeUserSample,
  userSample1,
} from "../../../test-utils/data-sample/user";

describe("GameControlPanelUserName", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameControlPanelUserName />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain online/offline icon", () => {
      const onlineUserSample = makeUserSample({
        isOnline: true,
      });
      const offlineUserSample = makeUserSample({
        isOnline: false,
      });

      const onlineVsOfflineGameSample = makeGameSample({
        white: onlineUserSample,
        black: offlineUserSample,
      });

      const { queryByTestId, rerender } = render(
        <GameControlPanelUserName game={onlineVsOfflineGameSample} />
      );

      expect(queryByTestId("online-icon")).toBeInTheDocument();
      expect(queryByTestId("offline-icon")).not.toBeInTheDocument();

      rerender(
        <GameControlPanelUserName
          game={onlineVsOfflineGameSample}
          color="black"
        />
      );
      expect(queryByTestId("online-icon")).not.toBeInTheDocument();
      expect(queryByTestId("offline-icon")).toBeInTheDocument();
    });

    it("should contain player name", () => {
      const playerVsAiGameSample = makeGameSample({
        aiLevel: 3,
        white: userSample1,
        black: null,
      });

      const { queryByTestId, rerender } = render(
        <GameControlPanelUserName game={playerVsAiGameSample} />
      );

      expect(queryByTestId("user-name")).toHaveTextContent("Thomas Miller");

      rerender(
        <GameControlPanelUserName game={playerVsAiGameSample} color="black" />
      );

      expect(queryByTestId("user-name")).toHaveTextContent("AI level 3");
    });
  });
});
