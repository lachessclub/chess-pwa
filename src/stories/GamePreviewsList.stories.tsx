import React from "react";
import { GamePreviewsList } from "../components/GamePreviewsList";
import Game from "../interfaces/Game";

export default {
  title: "Game Previews List",
};

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
];

export const GamePreviews = () => <GamePreviewsList games={games} />;

GamePreviews.story = {
  parameters: {
    jest: ["GamePreviewsList"],
  },
};
