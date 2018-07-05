import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import Moment from "react-moment";
import { hours, minutes, timeOfDay } from "../constants";

const Wrapper = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WheelContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ListItem = styled.View``;
const ListText = styled.Text``;

export class ClockScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 3,
      time: this.props.data,
      page: 0
    };
  }

  scrollUp() {
    const dataLength = this.props.data.length - 1;
    const { itemsPerPage, page } = this.state;
    let start = page + 1;
    let end = page + 1 + itemsPerPage;
    let newData = this.props.data.slice(start, end);
    this.setState({ page: page + 1 });
    if (end > dataLength + 1) {
      newData = this.props.data.slice(-2).concat(this.props.data.slice(0, 1));
      this.setState({ page: -2 });
    }
    if (start < 0) {
      newData = this.props.data.slice(-1).concat(this.props.data.slice(0, 2));
      this.setState({ page: -1 });
    }
    this.setState({ time: [...newData] });
  }

  scrollDown() {
    const dataLength = this.props.data.length - 1;
    const { itemsPerPage, page } = this.state;
    let start = page - 1;
    let end = page + itemsPerPage - 1;
    let newData = this.props.data.slice(start, end);
    this.setState({ page: page - 1 });
    if (start === dataLength - 1) {
      newData = this.props.data.slice(-2).concat(this.props.data.slice(0, 1));
      this.setState({ page: dataLength - 1 });
    }
    if (start === -1) {
      newData = this.props.data.slice(-1).concat(this.props.data.slice(0, 2));
      this.setState({ page: dataLength });
    }
    this.setState({ time: [...newData] });
  }

  render() {
    return (
      <WheelContainer>
        <TouchableOpacity onPress={() => this.scrollUp()}>
          <Image
            style={{ height: 25, width: 25 }}
            source={require("../assets/upArrow.png")}
          />
        </TouchableOpacity>
        <FlatList
          pagingEnabled
          data={this.state.time}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ width: 50, height: 100 }}>
              <Text style={{ fontSize: 24 }}>{item.key}</Text>
            </View>
          )}
        />
        <TouchableOpacity onPress={() => this.scrollDown()}>
          <Image
            style={{ height: 25, width: 25 }}
            source={require("../assets/downArrow.png")}
          />
        </TouchableOpacity>
      </WheelContainer>
    );
  }
}

const mapStateToProps = (state, props) => ({
  sleepTime: state.sleeptime,
  wakeTime: state.wakeTime,
  alarmTime: alarmTime
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClockScroller);
