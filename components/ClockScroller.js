import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Flatlist
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import Moment from "react-moment";

const Wrapper = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export class ClockScroller extends React.Componenet {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Wrapper>
        <Text>adjust the time here</Text>
        <Flatlist />
        <FlatList />
        <Flatlist />
      </Wrapper>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClockScroller);
