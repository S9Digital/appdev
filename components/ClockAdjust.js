import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Moment from "react-moment";
import ClockScroller from "./ClockScroller";
import { napHours, hours, minutes, timeOfDay } from "../constants";
import { setTime } from "../actions/TimeActions";
import { modalOpen, returnHome } from "../actions/SystemActions";
import { connect } from "react-redux";

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
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-wrap: nowrap;
`;
const ScrollContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
  height: 300px;
  width: 500px;
`;
const AlarmContainer = styled.View`
  flex: 1;
  display: flex;
  width: 400px;
  height: 50px;
  margin: 5px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
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
  margin-right: 30px;
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
const InfoText = styled.Text`
  font-size: 14px;
  color: white;
  margin-right: 50px;
  margin-bottom: 5px;
`;
class ClockAdjust extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHour: "2",
      selectedMinute: "01",
      isDateTimePickerVisible: false
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
        {/* time of day not set up yet */}
        <TouchableOpacity
          onPress={() => {
            this.props.setClockData(
              this.state.selectedHour,
              this.state.selectedMinute,
              "AM",
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
              height: 40,
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
  setClockData: (hour, mins, timeOfDay, modal) => {
    return dispatch(setTime(hour, mins, timeOfDay, modal));
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
