import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { composeWithDevTools, devToolsEnhancer } from "remote-redux-devtools";
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = composeWithDevTools({ realtime: true, port: 8081 });
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
