import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Moment from "react-moment";
import ClockScroller from "./ClockScroller";
import { napHours, hours, minutes, timeOfDay } from "../constants";
import { setTime } from "../actions/TimeActions";
import { modalOpen, returnHome } from "../actions/SystemActions";
import { connect } from "react-redux";
import { color } from "../StyleVariables";

const Content = styled.View`
  flex: 1;
  display: flex;
  background-color: ${color.modalGrey};
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  height: 100%;
  padding-top: 60px;
  padding-bottom: 60px;
`;

const Row = styled.View`
  width: 400px;
  flex: 1;
  align-items: center;
  flex-direction: row;
`;

const InfoText = styled.Text`
  font-size: 14px;
  color: ${color.universalWhite};
  font-weight: 400;
  align-self: center;
`;

const WheelLabel = styled(InfoText)`
  flex-grow: 1;
`;

const TitleContainer = styled(Row)`
  flex-grow: 0;
  flex-basis: 40;
  justify-content: flex-start;
`;

const ScrollContainer = styled(Row)`
  align-items: stretch;
  justify-content: center;
  margin: 30px 20px;
  flex-grow: 1;
`;

const highlightHeight = 50;

const HighlightBar = styled(Row)`
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  border-radius: ${highlightHeight / 2}px;
  margin-top: -${highlightHeight / 2 + 1}px;
  height: ${highlightHeight}px;
`;

const AlarmContainer = styled(Row)`
  flex-grow: 0;
  flex-basis: 40px;
  margin: 5px;
  justify-content: space-between;
`;

const TimeButton = styled.View`
  height: 30px;
  width: 100px;
  border-radius: 30px;
  background-color: ${color.universalWhite};
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
`;

const ButtonContainer = styled(Row)`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-grow: 0;
  flex-basis: 30px;
  margin-top: 30px;
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
        <HighlightBar />
        <ClockScroller
          data={napHours}
          onPick={hour => this.setState({ selectedHour: hour })}
          label={"hours"}
          wheelProps={{}}
          //value={parseInt(this.state.selectedHour, 10)}
        />
        <ClockScroller
          data={minutes}
          onPick={minute => this.setState({ selectedMinute: minute })}
          label={"minutes"}
          wheelProps={{}}
          //value={parseInt(this.state.selectedMinute, 10)}
        />
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
          <InfoText style={{ color: color.fadedWhite }}>
            Classic{"    "}
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
      <Content>
        <TitleContainer>
          <InfoText>Set nap duration</InfoText>
        </TitleContainer>
        {this.renderScroller()}
        {this.renderAlarm()}
        {this.renderButtons()}
      </Content>
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
