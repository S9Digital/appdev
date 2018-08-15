import React from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import Moment from "react-moment";
import { hours, minutes, timeOfDay } from "../constants";
import { color } from "../StyleVariables";
import { WheelPicker } from "react-native-wheel-picker-android";

const WheelContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
`;

const separationDistance = 80;

const Wheel = styled(WheelPicker)`
  flex-grow: 1;
  ${props => props.label && `margin-left: -${separationDistance}px;`};
`;

const WheelLabel = styled.Text`
  color: ${color.universalWhite};
  align-self: center;
  left: 90px;
  position: absolute;
  margin-right: ${separationDistance}px;
`;

export const scrollerTextSize = 55;

class ClockScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 3,
      time: this.props.data.slice(0, 3),
      page: 0
    };
  }

  static defaultProps = {
    wheelProps: {}
  };

  render() {
    return (
      <WheelContainer {...this.props}>
        <Wheel
          isCyclic
          isCurved
          data={this.props.data.map(node => node.key)}
          itemTextSize={scrollerTextSize}
          visibleItemCount={5}
          isAtmospheric={true}
          itemTextColor={color.universalWhite}
          label={this.props.label}
          {...this.props.wheelProps}
        />
        {this.props.label && <WheelLabel>{this.props.label}</WheelLabel>}
        {this.props.children}
      </WheelContainer>
    );
  }
}

const mapStateToProps = (state, props) => ({
  sleepTime: state.sleeptime,
  wakeTime: state.wakeTime,
  alarmTime: state.alarmTime
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClockScroller);
