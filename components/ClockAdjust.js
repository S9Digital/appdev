import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Moment from "react-moment";
import ClockScroller from "./ClockScroller";
import { napHours, hours, minutes, timeOfDay } from "../constants";
import { setTime, modalOpen, returnHome } from "../actions/TimeActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(43, 45, 48, 0.98);
  width: 100%;
  height: 100%;
`;
const Content = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const ScrollContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  width: 400px
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgba(24, 24, 24, 0.8);
  border-radius: 35px;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;
const AlarmContainer = styled.View`
  flex: 1;
  display: flex;
  width: 400px;
  height: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TimeButton = styled.View`
  height: 30px;
  width: 100px;
  border-radius: 30px;
  background-color: white;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
const ButtonContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 300px;
  height: 30px;
`;

const TimeText = styled.Text`
  font-size: 36px;
  color: white;
`;
const InfoText = styled.Text`
  font-size: 14px;
  color: white;
  margin-right: 50px;
`;
class ClockAdjust extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHour: "2",
      selectedMinute: "01"
    };
  }
  renderScroller() {
    return (
      <ScrollContainer>
        <ClockScroller
          data={napHours}
          onPick={hour => this.setState({ selectedHour: hour })}
          //value={parseInt(this.state.selectedHour, 10)}
        />
        <InfoText>hours</InfoText>
        <ClockScroller
          data={minutes}
          onPick={minute => this.setState({ selectedMinute: minute })}
          //value={parseInt(this.state.selectedMinute, 10)}
        />
        <InfoText>minutes</InfoText>
      </ScrollContainer>
    );
  }

  renderButtons() {
    return (
      <ButtonContainer>
        <TouchableOpacity onPress={() => this.props.modalClose()}>
          <TimeButton>
            <Text>Cancel</Text>
          </TimeButton>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.setClockData(
              this.state.selectedHour,
              this.state.selectedMinute,
              this.props.modal
            );
            this.props.modalClose();
          }}
        >
          <TimeButton>
            <Text>Set</Text>
          </TimeButton>
        </TouchableOpacity>
      </ButtonContainer>
    );
  }

  renderAlarm() {
    return (
      <AlarmContainer>
        <InfoText>Select alarm sound</InfoText>
        <TouchableOpacity>
          <InfoText>
            Classic{" "}
            <Image
              style={{ width: 12, height: 12 }}
              source={require("../assets/arrow.png")}
            />
          </InfoText>
        </TouchableOpacity>
      </AlarmContainer>
    );
  }
  render() {
    return (
      <Container>
        <Content>
          <View
            style={{
              flex: 1,
              width: 400,
              height: 100,
              flexWrap: "nowrap",
              justifyContent: "flex-start",
              alignItems: "flex-start"
            }}
          >
            <InfoText>Set nap duration</InfoText>
          </View>
          {this.renderScroller()}

          {this.renderAlarm()}
          {this.renderButtons()}
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  alarmTime: state.alarmTime,
  wakeTime: state.wakeTime,
  sleepTime: state.sleepTime,
  modal: state.modal
});
const mapDispatchToProps = dispatch => ({
  setClockData: (hour, mins, modal) => {
    return dispatch(setTime(hour, mins, modal));
  },
  modalOpen: component => {
    return dispatch(modalOpen(component));
  },
  modalClose: () => {
    return dispatch(returnHome());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClockAdjust);
