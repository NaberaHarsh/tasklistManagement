import { combineReducers } from "redux";
import todoReducer from "./todo/todoReducer";

const rootReducer = combineReducers({
  data: todoReducer,
});

export default rootReducer;
