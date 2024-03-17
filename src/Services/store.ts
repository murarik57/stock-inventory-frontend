import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { createRtkAPIMiddlewares } from "./rootReducer";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...createRtkAPIMiddlewares()),
});

setupListeners(store.dispatch);

export default store;
