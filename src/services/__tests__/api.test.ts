import Game from "../../interfaces/Game";
import { getOngoingGames } from "../api";

const games: Game[] = [
  {
    id: 1,
    initialFen: "startpos",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
  {
    id: 2,
    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
  {
    id: 3,
    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
];

describe("api service", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));

  it("getOngoingGames()", () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => games,
    });

    return expect(getOngoingGames()).resolves.toEqual(games);
  });
});
