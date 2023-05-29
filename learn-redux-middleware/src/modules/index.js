import { combineReducers } from "redux";
import counter from "./conter";
import sample from "./sample";
import loading from "./loading";

const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export default rootReducer;
