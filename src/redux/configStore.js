import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import todo from "./datatodo";

const middlewares = [thunk];
const rootReducer = combineReducers({ todo });
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;
