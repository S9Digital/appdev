import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components";
import { Provider } from "react-redux";
import { middleware } from "./store";
import Clock from "./components/clock";
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
  width: 33%;
  height: 100%;
`;
const NarrowSection = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 100%;
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
        <WideSection>
          <Container>
            <Text>weather</Text>
          </Container>
          <Container>
            <Text>power</Text>
          </Container>
        </WideSection>
        <NarrowSection>
          <Container>
            <Clock />
          </Container>
          <Container>
            <Text>sleep - - - - - - - - -bar</Text>
          </Container>
          <Container>
            <Text>set my sleep schedule</Text>
          </Container>
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
      </Wrapper>
      // </Provider>
    );
  }
}
