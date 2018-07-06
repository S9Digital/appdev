import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Moment from "react-moment";
import { modalOpen, returnHome } from "../actions/TimeActions";
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
  background-color: #80e5ff;
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

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeAdjust: false,
      selectedHour: "",
      selectedMinute: ""
    };
  }

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
    return (
      <ClockContainer>
        <Moment interval={1000} element={TimeText} format="h:mm A" />
        {this.renderLightBar()}
        <Text>set my sleep schedule</Text>
      </ClockContainer>
    );
  }
}
const mapStateToProps = state => ({
  sleepTime: state.sleepTime,
  wakeTime: state.wakeTime,
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
)(Clock);
