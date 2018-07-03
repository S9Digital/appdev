import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import styled from "styled-components";
import { Provider } from "react-redux";
import { middleware } from "./store";
import Clock from "./components/Clock";

const Wrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
const WideSection = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NarrowSection = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class App extends React.Component {
  render() {
    return (
      // <Provider store={store}>
      <Wrapper>
        {/* <ImageBackground
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            flexDirection: "row"
          }}
          source={require("./assets/mountain_background.jpg")}
        > */}
        <WideSection>
          <Container>
            <Text>weather</Text>
          </Container>
          <Container>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("./assets/power.png")}
            />
          </Container>
        </WideSection>
        <NarrowSection>
          <Clock />
        </NarrowSection>
        <WideSection>
          <Container>
            <Text>lights</Text>
            <Text>nap</Text>
          </Container>
          <Container>
            <Text>alarm</Text>
          </Container>
        </WideSection>
        {/* </ImageBackground> */}
      </Wrapper>
      // </Provider>
    );
  }
}
