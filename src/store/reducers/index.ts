// 导出 rootReducers ， 用于整合所有的reducer
import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./counter";

const rootReducers = combineReducers({
  counter: counterSlice,
});

export default rootReducers;
