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
import System from "./components/System";

// System.getInstance().getWakeLock(true);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
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
          //Ario to provide new background image, should be scaled to screen dimensions
          source={require("./assets/mountain_background.jpg")}
        >
          <Landing />
        </ImageBackground>
      </Provider>
    );
  }
}
