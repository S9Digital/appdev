import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components";

const Wrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
const Section = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 100%;
`;
export default class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <Section>
          <Text>weather</Text>
        </Section>
        <Section>
          <Text>set my sleep schedule</Text>
        </Section>
        <Section>
          <Text>nav</Text>
        </Section>
      </Wrapper>
    );
  }
}
