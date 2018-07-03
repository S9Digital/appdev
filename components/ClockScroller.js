import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Moment from "react-moment";

const Wrapper = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class ClockScroller extends react.componenet {
  render() {
    return (
      <Wrapper>
        <Flatlist />
        <FlatList />
        <Flatlist />
      </Wrapper>
    );
  }
}
