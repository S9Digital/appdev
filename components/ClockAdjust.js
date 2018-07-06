import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Moment from "react-moment";
import ClockScroller from "./ClockScroller";
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

const ScrollContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
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
`;
//colors to use when I get linear gradient working #b7ad70, #858ca8
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

class ClockAdjust extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHour: "",
      selectedMinute: ""
    };
  }
  render() {
    return (
      <ClockContainer>
        <Text>Set Alarm</Text>
        <ScrollContainer>
          <ClockScroller
            data={hours}
            onPick={hour => this.setState({ selectedHour: hour })}
            //value={parseInt(this.state.selectedHour, 10)}
          />
          <Text style={{ fontSize: 40, paddingBottom: 10 }}>:</Text>
          <ClockScroller
            data={minutes}
            onPick={minute => this.setState({ selectedMinute: minute })}
            //value={parseInt(this.state.selectedMinute, 10)}
          />
        </ScrollContainer>
        <ButtonContainer>
          <TouchableOpacity onPress={() => this.props.modalClose()}>
            <TimeButton>
              <Text>Cancel</Text>
            </TimeButton>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.setTime(
                this.state.selectedHour,
                this.state.selectedMinute
              );
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
const mapStateToProps = state => ({
  alarmTime: state.alarmTime,
  modal: state.modal
});
const mapDispatchToProps = dispatch => ({
  setTime: (hour, mins) => {
    return dispatch(setAlarmTime(hour, mins));
  },
  modalOpen: component => {
    return dispatch(modalOpen(component));
  },
  modalClose: () => {
    dispatch(returnHome());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClockAdjust);
