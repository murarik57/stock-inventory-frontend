import {
  combineReducers,
  PayloadAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { router } from "Routes/RenderRouter";
import loggedInUserReducer from "../authContainer/duck/loogedInUserSlice";

import { removeAppTokens, showNotification } from "Utils/commonFunction";
import constants from "Utils/constants";
import routes from "Utils/routes";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import extraReducer from "./extraSlice";
import { authApi } from "authContainer/duck/authAPI";

const { ACTION_TYPES } = constants;

const appReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  loggedInUser: loggedInUserReducer,
  extra: extraReducer,
});

export type RootState = ReturnType<typeof appReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createRtkAPIMiddlewares = () => {
  return [authApi.middleware];
};

const rootReducer = (
  state: RootState | undefined,
  action: PayloadAction | UnknownAction,
) => {
  // clearing redux state when user logs out
  if (action.type === ACTION_TYPES.LOGOUT) {
    if (action.payload) showNotification("error", action.payload);
    removeAppTokens();
    state = undefined;
    router.navigate(routes.ROOT);
  }

  return appReducer(state, action);
};

export default rootReducer;
