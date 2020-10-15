import { RootState } from "../../app/rootReducer";

export const defaultState: RootState = {
  acceptSeekRequest: {
    inProcess: false,
    itemId: null,
    error: null,
  },
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
  messages: [],
  seekModal: {
    isSeekModalVisible: false,
    allowCloseSeekModal: true,
  },
  seeksList: {
    isLoading: false,
    error: null,
    items: [],
  },
  singleGame: {},
  gamesList: {
    isLoading: false,
    error: null,
  },
  entities: {
    users: {},
    games: {},
    seeks: {},
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
  acceptSeekRequest: {
    inProcess: false,
    itemId: null,
    error: null,
  },
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
  messages: [],
  seekModal: {
    isSeekModalVisible: false,
    allowCloseSeekModal: true,
  },
  seeksList: {
    isLoading: false,
    error: null,
    items: [],
  },
  singleGame: {},
  gamesList: {
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
        createdAt: 0,
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
    seeks: {},
  },
};

// not authenticated user, isFlipped: false
export const stateWithDataSample2: RootState = {
  acceptSeekRequest: {
    inProcess: false,
    itemId: null,
    error: null,
  },
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
  messages: [],
  seekModal: {
    isSeekModalVisible: false,
    allowCloseSeekModal: true,
  },
  seeksList: {
    isLoading: false,
    error: null,
    items: [],
  },
  singleGame: {
    "1": {
      isLoading: true,
      error: null,
      isFlipped: false,
      rewindToMoveIndex: 2,
    },
  },
  gamesList: {
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
        createdAt: 0,
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
    seeks: {},
  },
};

// not authenticated user, isFlipped: true
export const stateWithDataSample3: RootState = {
  acceptSeekRequest: {
    inProcess: false,
    itemId: null,
    error: null,
  },
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
  messages: [],
  seekModal: {
    isSeekModalVisible: false,
    allowCloseSeekModal: true,
  },
  seeksList: {
    isLoading: false,
    error: null,
    items: [],
  },
  singleGame: {
    "1": {
      isLoading: true,
      error: null,
      isFlipped: true,
      rewindToMoveIndex: 0,
    },
  },
  gamesList: {
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
        createdAt: 0,
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
    seeks: {},
  },
};

// many games
export const stateWithDataSample4: RootState = {
  acceptSeekRequest: {
    inProcess: false,
    itemId: null,
    error: null,
  },
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
  messages: [],
  seekModal: {
    isSeekModalVisible: false,
    allowCloseSeekModal: true,
  },
  seeksList: {
    isLoading: false,
    error: null,
    items: [],
  },
  singleGame: {},
  gamesList: {
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
        createdAt: 0,
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
      "2": {
        id: 2,
        aiLevel: 3,
        clockLimit: 300,
        clockIncrement: 3,
        createdAt: 0,
        drawOffer: null,
        initialFen: "startpos",
        turn: "white",
        wtime: 300000,
        btime: 300000,
        moves: "e2e4 e7e5 g1f3 g8f6",
        status: "outoftime",
        white: null,
        black: null,
        winner: "white",
      },
      "3": {
        id: 3,
        aiLevel: 3,
        clockLimit: 300,
        clockIncrement: 3,
        createdAt: 0,
        drawOffer: null,
        initialFen: "startpos",
        turn: "white",
        wtime: 300000,
        btime: 300000,
        moves: "e2e4 e7e5 g1f3 g8f6",
        status: "aborted",
        white: null,
        black: null,
        winner: null,
      },
      "4": {
        id: 4,
        aiLevel: 3,
        clockLimit: 300,
        clockIncrement: 3,
        createdAt: 1,
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
      "5": {
        id: 5,
        aiLevel: 3,
        clockLimit: 300,
        clockIncrement: 3,
        createdAt: 1,
        drawOffer: null,
        initialFen: "startpos",
        turn: "white",
        wtime: 300000,
        btime: 300000,
        moves: "e2e4 e7e5 g1f3 g8f6",
        status: "resign",
        white: null,
        black: null,
        winner: "white",
      },
    },
    seeks: {},
  },
};

// with seeks and accept seek request
export const stateWithDataSample5: RootState = {
  acceptSeekRequest: {
    inProcess: true,
    itemId: 6,
    error: null,
  },
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
  messages: [],
  seekModal: {
    isSeekModalVisible: false,
    allowCloseSeekModal: true,
  },
  seeksList: {
    isLoading: false,
    error: null,
    items: [2, 1],
  },
  singleGame: {},
  gamesList: {
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
    seeks: {
      "1": {
        id: 1,
        color: "white",
        clockLimit: 300,
        createdAt: 0,
        clockIncrement: 5,
        createdBy: 1,
        game: null,
      },
      "2": {
        id: 2,
        color: "black",
        clockLimit: 600,
        createdAt: 0,
        clockIncrement: 10,
        createdBy: 1,
        game: 1,
      },
    },
    games: {
      "1": {
        id: 1,
        aiLevel: 3,
        clockLimit: 300,
        clockIncrement: 3,
        createdAt: 0,
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
