import { EntitiesState } from "../../features/entities/entitiesSlice";

export const entitiesSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    1: {
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
      moves: "",
      status: "started",
      white: null,
      black: null,
      winner: null,
    },
  },
};

export const entitiesBeforeTimeOutSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    1: {
      id: 1,
      aiLevel: 3,
      clockLimit: 300,
      clockIncrement: 3,
      createdAt: 0,
      drawOffer: null,
      initialFen: "startpos",
      turn: "white",
      wtime: 800,
      btime: 300000,
      moves: "e2e4 e7e5",
      status: "started",
      white: null,
      black: null,
      winner: null,
    },
  },
};

export const entitiesAfterTimeOutSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    1: {
      id: 1,
      aiLevel: 3,
      clockLimit: 300,
      clockIncrement: 3,
      createdAt: 0,
      drawOffer: null,
      initialFen: "startpos",
      turn: "white",
      wtime: 0,
      btime: 300000,
      moves: "e2e4 e7e5",
      status: "outoftime",
      white: null,
      black: null,
      winner: "black",
    },
  },
};

export const emptyEntitiesSample: EntitiesState = {
  users: {},
  games: {},
};

export const addUserPayloadSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {},
};

export const entitiesWithUserSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {},
};

export const entitiesAfterMoveSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    1: {
      id: 1,
      aiLevel: 3,
      clockLimit: 300,
      clockIncrement: 3,
      createdAt: 0,
      drawOffer: null,
      initialFen: "startpos",
      turn: "black",
      wtime: 300000,
      btime: 300000,
      moves: "e2e4",
      status: "started",
      white: null,
      black: null,
      winner: null,
    },
  },
};

export const entitiesAfterTwoMovesSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    1: {
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
      moves: "e2e4 e7e5",
      status: "started",
      white: null,
      black: null,
      winner: null,
    },
  },
};

export const entitiesAfterTwoMovesAndOneSecondSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    1: {
      id: 1,
      aiLevel: 3,
      clockLimit: 300,
      clockIncrement: 3,
      createdAt: 0,
      drawOffer: null,
      initialFen: "startpos",
      turn: "white",
      wtime: 299000,
      btime: 300000,
      moves: "e2e4 e7e5",
      status: "started",
      white: null,
      black: null,
      winner: null,
    },
  },
};

export const addGamePayloadSample: EntitiesState = {
  users: {
    2: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    2: {
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
      moves: "",
      status: "started",
      white: null,
      black: null,
      winner: null,
    },
  },
};

export const entitiesAfterAddingGameSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
    2: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    1: {
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
      moves: "",
      status: "started",
      white: null,
      black: null,
      winner: null,
    },
    2: {
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
      moves: "",
      status: "started",
      white: null,
      black: null,
      winner: null,
    },
  },
};
