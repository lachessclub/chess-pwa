import React, { Dispatch } from "react";
import User from "./interfaces/User";
import { Action } from "./App.reducer";

export interface AppContextData {
  user: User | null;
  dispatch: Dispatch<Action>;
}

export const AppContext = React.createContext<AppContextData>({
  user: null,
  dispatch() {},
});
