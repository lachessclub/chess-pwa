import React from "react";
import TestRenderer from "react-test-renderer";
import { MemoryRouter, Route } from "react-router-dom";
import { SingleGameContainer } from "../../containers/SingleGameContainer";
import GamePage from "../GamePage";

describe("GamePage", () => {
  describe("children components", () => {
    it("contains OngoingGamesContainer", () => {
      const testRenderer = TestRenderer.create(
        <MemoryRouter initialEntries={["/game/1"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SingleGameContainer).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("SingleGameContainer", () => {
      it("id", () => {
        const testRenderer = TestRenderer.create(
          <MemoryRouter initialEntries={["/game/2"]}>
            <Route path="/game/:id">
              <GamePage />
            </Route>
          </MemoryRouter>
        );
        const testInstance = testRenderer.root;

        const singleGameContainer = testInstance.findByType(
          SingleGameContainer
        );

        expect(singleGameContainer.props.id).toBe(2);
      });
    });
  });
});
