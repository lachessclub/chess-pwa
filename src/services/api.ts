import { JWR } from "sails.io.js";
import Game from "../interfaces/Game";
import ioClient from "./ioClient";
import { SubscriptionData } from "../interfaces/SubscriptionData";
import LoginData from "../interfaces/LoginData";
import SignUpData from "../interfaces/SignUpData";
import User from "../interfaces/User";

export const login = (data: LoginData): Promise<User> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.put(
      "/api/v1/entrance/login",
      {
        rememberMe: true,
        emailAddress: data.email,
        password: data.password,
      },
      (body: User, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          resolve(body);
        } else {
          reject(jwr);
        }
      }
    );
  });
};

export const register = (data: SignUpData): Promise<User> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      "/api/v1/entrance/signup",
      {
        fullName: data.fullName,
        emailAddress: data.email,
        password: data.password,
        confirmPassword: data.password,
        agreed: true,
      },
      (body: User, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          resolve(body);
        } else {
          reject(jwr);
        }
      }
    );
  });
};

export const logout = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      "/api/v1/account/logout",
      {},
      (body: Game[], jwr: JWR) => {
        if (jwr.statusCode === 200) {
          resolve();
        } else {
          reject(jwr);
        }
      }
    );
  });
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.get("/api/v1/account/me", (body: User, jwr: JWR) => {
      if (jwr.statusCode === 200) {
        resolve(body);
      } else if (jwr.statusCode === 401) {
        resolve(null);
      } else {
        reject(jwr);
      }
    });
  });
};

export const getOngoingGames = (): Promise<Game[]> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.get("/api/v1/game/playing", (body: Game[], jwr: JWR) => {
      if (jwr.statusCode === 200) {
        resolve(body);
      } else {
        reject(jwr);
      }
    });
  });
};

export const watchGames = (cb: (data: SubscriptionData) => void): void => {
  ioClient.socket.on("game", (msg: SubscriptionData) => {
    cb(msg);
  });
};

export const getGame = (id: number): Promise<Game> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.get(`/game/${id}`, (body: Game, jwr: JWR) => {
      if (jwr.statusCode === 200) {
        resolve(body);
      } else {
        reject(jwr);
      }
    });
  });
};

export const makeMove = (gameId: number, move: string): Promise<Game> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/board/game/${gameId}/move/${move}`,
      {},
      (body: Game, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          resolve(body);
        } else {
          reject(jwr);
        }
      }
    );
  });
};
