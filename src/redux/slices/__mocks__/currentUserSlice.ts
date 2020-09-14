/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

// @ts-ignore
const currentUserSlice = jest.genMockFromModule<any>("../currentUserSlice");

currentUserSlice.login.mockImplementation(() => new Promise(() => {}));
currentUserSlice.register.mockImplementation(() => new Promise(() => {}));
currentUserSlice.logout.mockImplementation(() => new Promise(() => {}));

module.exports = currentUserSlice;
