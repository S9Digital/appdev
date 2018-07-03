import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Moment from "react-moment";

const ClockContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BarContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
`;

const LightBar = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 200px;
  height: 30px;
  background-color: #80e5ff;
`;

const TimeText = styled.Text`
  font-size: 36px;
`;

export default class Clock extends React.Component {
  render() {
    return (
      <ClockContainer>
        <Moment interval={1000} element={TimeText} format="h:mm A" />
        <BarContainer>
          <LightBar>
            <TouchableOpacity>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../assets/bell.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../assets/moon.png")}
              />
            </TouchableOpacity>
          </LightBar>
        </BarContainer>
        <Text>set my sleep schedule</Text>
      </ClockContainer>
    );
  }
}
