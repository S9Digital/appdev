import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar
} from "react-native";
import styled from "styled-components";
import { Provider } from "react-redux";
import { compose } from "redux";
import thunk from "redux-thunk";
import store from "./store";
import Landing from "./components/Landing";
// import { ModuleSystem } from "./System.ts";

export default class App extends React.Component {
  // await System.getInstance().getWaitLock();
  // await System.getInstance().releaseWakeLock();
  // System.getInstance().getWaitLock();

  render() {
    return (
      <Provider store={store}>
        <ImageBackground
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            flexDirection: "row"
          }}
          source={require("./assets/mountain_background.jpg")}
        >
          {/* <StatusBar hidden={true} /> */}

          <Landing />
        </ImageBackground>
      </Provider>
    );
  }
}
