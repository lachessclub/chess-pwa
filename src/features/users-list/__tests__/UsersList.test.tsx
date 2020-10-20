import TestRenderer from "react-test-renderer";
import React from "react";
import mountTest from "../../../test-utils/mountTest";
import { ContentLoadingStatus } from "../../../components/ContentLoadingStatus";
import { UsersList } from "../UsersList";
import { UsersListItem } from "../UsersListItem";
import { userSample1, userSample2 } from "../../../test-utils/data-sample/user";
import User from "../../../interfaces/User";

const usersList: User[] = [userSample1, userSample2];

describe("UsersList", () => {
  mountTest(UsersList);

  describe("children components", () => {
    it("contains UsersListItem", () => {
      const testRenderer = TestRenderer.create(<UsersList />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(UsersListItem).length).toBe(0);

      testRenderer.update(<UsersList users={usersList} />);
      expect(testInstance.findAllByType(UsersListItem).length).toBe(2);
    });

    it("contains ContentLoadingStatus", () => {
      const testRenderer = TestRenderer.create(<UsersList />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ContentLoadingStatus).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("ContentLoadingStatus", () => {
      it("isLoading", () => {
        const testRenderer = TestRenderer.create(<UsersList />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.isLoading).toBeFalsy();

        testRenderer.update(<UsersList isLoading />);

        expect(contentLoadingStatus.props.isLoading).toBeTruthy();
      });

      it("error", () => {
        const testRenderer = TestRenderer.create(<UsersList />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.error).toBeNull();

        testRenderer.update(<UsersList error="error text" />);

        expect(contentLoadingStatus.props.error).toBe("error text");
      });

      it("isEmpty", () => {
        const testRenderer = TestRenderer.create(<UsersList />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.isEmpty).toBeTruthy();

        testRenderer.update(<UsersList users={usersList} />);

        expect(contentLoadingStatus.props.isEmpty).toBeFalsy();
      });

      it("emptyContentMessage", () => {
        const testRenderer = TestRenderer.create(<UsersList />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.emptyContentMessage).toBe(
          "There is no players yet"
        );
      });
    });

    describe("UsersListItem", () => {
      it("user", () => {
        const testRenderer = TestRenderer.create(
          <UsersList users={usersList} />
        );
        const testInstance = testRenderer.root;

        const usersListItems = testInstance.findAllByType(UsersListItem);

        expect(usersListItems[0].props.user).toBe(userSample1);
        expect(usersListItems[1].props.user).toBe(userSample2);
      });

      it("currentUserId", () => {
        const testRenderer = TestRenderer.create(
          <UsersList users={usersList} />
        );
        const testInstance = testRenderer.root;

        const usersListItems = testInstance.findAllByType(UsersListItem);

        expect(usersListItems[0].props.currentUserId).toBeNull();
        expect(usersListItems[1].props.currentUserId).toBeNull();

        testRenderer.update(<UsersList users={usersList} currentUserId={8} />);

        expect(usersListItems[0].props.currentUserId).toBe(8);
        expect(usersListItems[1].props.currentUserId).toBe(8);
      });
    });
  });
});
