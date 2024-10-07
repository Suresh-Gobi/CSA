import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers"; // Combine reducers in this file

// Create the Redux store with thunk middleware and Redux DevTools support
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
