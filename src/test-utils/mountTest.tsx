/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jest/no-export */

import React from "react";
import TestRenderer from "react-test-renderer";

function mountTest<P>(Component: React.ComponentType<P>, props: P): void;
function mountTest(Component: React.ComponentType): void;
function mountTest(Component: React.ComponentType, props: any = {}): void {
  describe(`mount and unmount`, () => {
    it(`component could be updated and unmounted without errors`, () => {
      expect(() => {
        const wrapper = TestRenderer.create(<Component {...props} />);
        wrapper.unmount();
      }).not.toThrow();
    });
  });
}

export default mountTest;
