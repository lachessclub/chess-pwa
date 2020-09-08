/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

// @ts-ignore
const ioClient = jest.genMockFromModule<any>("../api");

ioClient.getOngoingGames.mockImplementation(() => new Promise(() => {}));
ioClient.getGame.mockImplementation(() => new Promise(() => {}));
ioClient.makeMove.mockImplementation(() => new Promise(() => {}));

module.exports = ioClient;
