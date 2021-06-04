// import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import authReducer from "../app/modules/Auth/_redux/authReducer";

export const rootReducer = combineReducers({
  authReducer: authReducer,
});

// export function* rootSaga() {
//   yield all([auth.saga()]);
// }
