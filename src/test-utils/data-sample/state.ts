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

// @todo. use this function to create samples.
export const makeStateSample = (
  data: Partial<RootState>,
  originalStateSample = defaultState
): RootState => ({
  ...originalStateSample,
  ...data,
});

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
        drawOffer: null,
        initialFen: "startpos",
        turn: "white",
        wtime: 300000,
        btime: 300000,
        moves: "e2e4 e7e5 g1f3 g8f6",
        status: "started",
        white: null,
        black: null,
        winner: null,
      },
    },
  },
};

// not authenticated user, isFlipped: false
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
  singleGame: {
    "1": {
      isLoading: true,
      error: null,
      isFlipped: false,
      rewindToMoveIndex: 2,
    },
  },
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
        drawOffer: null,
        initialFen: "startpos",
        turn: "white",
        wtime: 300000,
        btime: 300000,
        moves: "e2e4 e7e5 g1f3 g8f6",
        status: "started",
        white: null,
        black: null,
        winner: null,
      },
    },
  },
};

// not authenticated user, isFlipped: true
export const stateWithDataSample3: RootState = {
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
  singleGame: {
    "1": {
      isLoading: true,
      error: null,
      isFlipped: true,
      rewindToMoveIndex: 0,
    },
  },
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
        drawOffer: null,
        initialFen: "startpos",
        turn: "white",
        wtime: 300000,
        btime: 300000,
        moves: "e2e4 e7e5 g1f3 g8f6",
        status: "started",
        white: null,
        black: null,
        winner: null,
      },
    },
  },
};
