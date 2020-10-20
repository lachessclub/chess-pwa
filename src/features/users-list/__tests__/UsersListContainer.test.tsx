import { useSelector } from "react-redux";
import React from "react";
import TestRenderer from "react-test-renderer";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
import mountTest from "../../../test-utils/mountTest";
import UsersListContainer from "../UsersListContainer";
import { UsersList } from "../UsersList";
import {
  normalizedUserSample1,
  normalizedUserSample2,
  userSample1,
  userSample2,
} from "../../../test-utils/data-sample/user";

const stateWithCurrentUser = makeStateSample({
  currentUser: {
    userId: 8,
    isLoading: false,
    error: null,
  },
});

const stateWithLoadedUsers = makeStateSample({
  usersList: {
    isLoading: false,
    error: null,
    items: [],
  },
});

const stateWithLoadingError = makeStateSample({
  usersList: {
    isLoading: false,
    error: "error text",
    items: [],
  },
});

const stateWithUsers = makeStateSample({
  usersList: {
    isLoading: false,
    error: null,
    items: [2, 1],
  },
  entities: {
    users: {
      1: normalizedUserSample1,
      2: normalizedUserSample2,
    },
    games: {},
    seeks: {},
  },
});

describe("UsersListContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });

  mountTest(UsersListContainer);

  describe("children components", () => {
    it("contains UsersList", async () => {
      const testRenderer = TestRenderer.create(<UsersListContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(UsersList).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("UsersList", () => {
      it("users", () => {
        const testRenderer = TestRenderer.create(<UsersListContainer />);
        const testInstance = testRenderer.root;

        const seeksListComponent = testInstance.findByType(UsersList);

        expect(seeksListComponent.props.users).toEqual([]);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithUsers)
        );

        testRenderer.update(<UsersListContainer />);

        expect(seeksListComponent.props.users).toEqual([
          userSample2,
          userSample1,
        ]);
      });

      it("isLoading", () => {
        const testRenderer = TestRenderer.create(<UsersListContainer />);
        const testInstance = testRenderer.root;

        const usersListComponent = testInstance.findByType(UsersList);

        expect(usersListComponent.props.isLoading).toBeTruthy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadedUsers)
        );

        testRenderer.update(<UsersListContainer />);

        expect(usersListComponent.props.isLoading).toBeFalsy();
      });

      it("error", () => {
        const testRenderer = TestRenderer.create(<UsersListContainer />);
        const testInstance = testRenderer.root;

        const usersListComponent = testInstance.findByType(UsersList);

        expect(usersListComponent.props.error).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadingError)
        );

        testRenderer.update(<UsersListContainer />);

        expect(usersListComponent.props.error).toBe("error text");
      });

      it("currentUserId", () => {
        const testRenderer = TestRenderer.create(<UsersListContainer />);
        const testInstance = testRenderer.root;

        const usersListComponent = testInstance.findByType(UsersList);

        expect(usersListComponent.props.currentUserId).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithCurrentUser)
        );

        testRenderer.update(<UsersListContainer />);

        expect(usersListComponent.props.currentUserId).toBe(8);
      });
    });
  });
});
