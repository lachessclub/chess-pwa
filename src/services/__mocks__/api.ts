/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

// @ts-ignore
const api = jest.genMockFromModule<any>("../api");

api.getOngoingGames.mockImplementation(() => new Promise(() => {}));
api.getGame.mockImplementation(() => new Promise(() => {}));
api.makeMove.mockImplementation(() => new Promise(() => {}));
api.getCurrentUser.mockImplementation(() => new Promise(() => {}));

module.exports = api;
