import { EntitiesState } from "../../features/entities/entitiesSlice";

export const entitiesSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  seeks: {},
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
  seeks: {},
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
  seeks: {},
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
  seeks: {},
  games: {},
};

export const addUserPayloadSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  seeks: {},
  games: {},
};

export const entitiesWithUserSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  seeks: {},
  games: {},
};

export const entitiesAfterMoveSample: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  seeks: {},
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
  seeks: {},
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
  seeks: {},
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
      id: 2,
      fullName: "Robert Johnson",
    },
  },
  seeks: {},
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
      id: 2,
      fullName: "Robert Johnson",
    },
  },
  seeks: {},
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

export const addSeekPayloadSample: EntitiesState = {
  users: {
    2: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  seeks: {
    "1": {
      id: 1,
      color: "white",
      clockLimit: 300,
      createdAt: 0,
      clockIncrement: 5,
      createdBy: 2,
      game: 2,
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

export const entitiesAfterAddingSeekSample: EntitiesState = {
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
  seeks: {
    "1": {
      id: 1,
      color: "white",
      clockLimit: 300,
      createdAt: 0,
      clockIncrement: 5,
      createdBy: 2,
      game: 2,
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
