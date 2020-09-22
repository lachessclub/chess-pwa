import { RootState } from "../../app/rootReducer";

export const defaultState: RootState = {
  currentUser: {
    userId: null,
    isLoading: false,
    error: null,
  },
  authModal: {
    isAuthModalVisible: false,
  },
  challengeAiModal: {
    isChallengeAiModalVisible: false,
  },
  singleGame: {},
  ongoingGames: {
    items: [],
    isLoading: false,
    error: null,
  },
  entities: {
    users: {},
    games: {},
  },
};

// authenticated user
export const stateWithDataSample: RootState = {
  currentUser: {
    userId: 1,
    isLoading: false,
    error: null,
  },
  authModal: {
    isAuthModalVisible: false,
  },
  challengeAiModal: {
    isChallengeAiModalVisible: false,
  },
  singleGame: {},
  ongoingGames: {
    items: [1],
    isLoading: false,
    error: null,
  },
  entities: {
    users: {
      "1": {
        id: 1,
        fullName: "Thomas Miller",
      },
    },
    games: {
      "1": {
        id: 1,
        aiLevel: 3,
        clockLimit: 300,
        clockIncrement: 3,
        initialFen: "startpos",
        turn: "white",
        wtime: 300000,
        btime: 300000,
        moves: "",
        status: "started",
        white: null,
        black: null,
        winner: null,
      },
    },
  },
};

// not authenticated user
export const stateWithDataSample2: RootState = {
  currentUser: {
    userId: null,
    isLoading: false,
    error: null,
  },
  authModal: {
    isAuthModalVisible: false,
  },
  challengeAiModal: {
    isChallengeAiModalVisible: false,
  },
  singleGame: {},
  ongoingGames: {
    items: [1],
    isLoading: false,
    error: null,
  },
  entities: {
    users: {
      "1": {
        id: 1,
        fullName: "Thomas Miller",
      },
    },
    games: {
      "1": {
        id: 1,
        aiLevel: 3,
        clockLimit: 300,
        clockIncrement: 3,
        initialFen: "startpos",
        turn: "white",
        wtime: 300000,
        btime: 300000,
        moves: "",
        status: "started",
        white: null,
        black: null,
        winner: null,
      },
    },
  },
};
