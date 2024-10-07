import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers"; // Import your rootReducer from reducers/index.js
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;