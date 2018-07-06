import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Moment from "react-moment";
import { ClockScroller } from "./ClockScroller";
import { hours, minutes, timeOfDay } from "../constants";
import {
  setAlarmTime,
  setSleepTime,
  setWakeTime,
  modalOpen,
  returnHome
} from "../actions/TimeActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const ClockContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BarContainer = styled.View`
  height: 100px;
  align-items: center;
  justify-content: center;
`;

const LightBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 200px;
  height: 30px;
  background-color: #80e5ff;
`;

const TimeButton = styled.View`
  padding-left: 25px;
`;
const ButtonContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
`;

const TimeText = styled.Text`
  font-size: 36px;
`;

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeAdjust: false,
      selectedHour: "",
      selectedMinute: ""
    };
  }

  // toggleTimeAdjust() {
  //   this.setState({ timeAdjust: true });
  // }
  // back() {
  //   this.setState({ timeAdjust: false });
  // }

  renderLightBar() {
    return (
      <BarContainer>
        <LightBar>
          <TouchableOpacity onPress={() => this.props.modalOpen("wake time")}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/bell.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.modalOpen("sleep time")}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/moon.png")}
            />
          </TouchableOpacity>
        </LightBar>
      </BarContainer>
    );
  }

  render() {
    if (!this.props.modal) {
      return (
        <ClockContainer>
          <Moment interval={1000} element={TimeText} format="h:mm A" />
          {this.renderLightBar()}
          <Text>set my sleep schedule</Text>
        </ClockContainer>
      );
    }
    if (this.props.modal) {
      return (
        <ClockContainer>
          <Text>Set Alarm</Text>
          <BarContainer>
            <ClockScroller
              data={hours}
              onPick={hour => this.setState({ selectedHour: hour })}
              value={parseInt(this.state.selectedHour, 10)}
            />
            <Text style={{ fontSize: 40, paddingBottom: 10 }}>:</Text>
            <ClockScroller
              data={minutes}
              onPick={minute => this.setState({ selectedMinute: minute })}
              //value={parseInt(this.state.selectedMinute, 10)}
            />
          </BarContainer>
          <ButtonContainer>
            <TouchableOpacity onPress={() => this.props.modalClose()}>
              <TimeButton>
                <Text>Cancel</Text>
              </TimeButton>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.setTime();
              }}
            >
              <TimeButton>
                <Text>Set</Text>
              </TimeButton>
            </TouchableOpacity>
          </ButtonContainer>
        </ClockContainer>
      );
    }
  }
}
const mapStateToProps = (state, props) => ({
  alarmTime: state.alarmTime,
  modal: state.modal
});
const mapDispatchToProps = dispatch => ({
  setTime: () => {
    return dispatch(setAlarmTime(hour, mins));
  },
  modalOpen: component => {
    return dispatch(modalOPen(component));
  },
  modalClose: () => {
    dispatch(returnHome());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clock);
