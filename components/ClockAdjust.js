import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Moment from "react-moment";
import ClockScroller, { scrollerTextSize } from "./ClockScroller";
import { napHours, hours, minutes, timeOfDay } from "../constants";
import { setTime } from "../actions/TimeActions";
import { modalOpen, returnHome } from "../actions/SystemActions";
import { connect } from "react-redux";
import { color } from "../StyleVariables";
import moment from "moment";
import pad from "left-pad";

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

const ClockColon = styled.Text`
  position: absolute;
  font-size: ${scrollerTextSize - 10}px;
  color: white;
  top: 50%;
  margin-top: -${scrollerTextSize - 18}px;
  right: 0px;
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
    this.state = {};
  }

  componentWillReceiveProps(props) {
    const m = moment(props.time).utc();
    let hour = m.hour();
    let minute = m.minute();
    let timeOfDay = "AM";
    if (this.props.type !== "nap") {
      if (hour === 0) {
        hour = 12;
      } else if (hour >= 12) {
        hour -= 12;
        timeOfDay = "PM";
      }
    }
    this.setState({
      hour: `${hour}`,
      minute: `${minute}`,
      timeOfDay
    });
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  renderNap() {
    return (
      <ScrollContainer>
        <HighlightBar />
        <ClockScroller
          data={napHours}
          onSelect={hour => this.setState({ hour })}
          label={"hours"}
          wheelProps={{ isCyclic: false }}
          style={
            {
              // backgroundColor: "rgba(255, 0, 0, 0.2)"
            }
          }
          //value={parseInt(this.state.selectedHour, 10)}
        />
        <ClockScroller
          data={minutes}
          onSelect={minute => this.setState({ minute })}
          label={"minutes"}
          wheelProps={{ isCyclic: false }}
          style={
            {
              // backgroundColor: "rgba(0, 0, 255, 0.2)"
            }
          }
          //value={parseInt(this.state.selectedMinute, 10)}
        />
      </ScrollContainer>
    );
  }

  renderTime() {
    return (
      <ScrollContainer>
        <HighlightBar />
        <ClockScroller
          data={hours}
          onSelect={hour => this.setState({ hour })}
          style={{
            // backgroundColor: "rgba(255, 0, 0, 0.2)",
            left: 0,
            flexBasis: 150,
            flexGrow: 0
          }}
          wheelProps={{ style: { marginLeft: 40 } }}
          value={this.state.hour}
        >
          <ClockColon>:</ClockColon>
        </ClockScroller>
        <ClockScroller
          data={minutes}
          onSelect={minute => this.setState({ minute })}
          style={{
            // backgroundColor: "rgba(0, 255, 0, 0.2)",
            left: 0,
            flexBasis: 150,
            flexGrow: 0
          }}
          wheelProps={{ style: { marginRight: 50 } }}
          value={this.state.minute}
        />
        <ClockScroller
          data={timeOfDay}
          onSelect={timeOfDay => this.setState({ timeOfDay })}
          style={{
            // backgroundColor: "rgba(0, 0, 255, 0.2)",
            left: -50,
            flexGrow: 0,
            flexBasis: 75
          }}
          wheelProps={{ isCyclic: false }}
          value={this.state.timeOfDay}
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
            this.props.setClockData(this.state);
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
      <AlarmContainer style={{ opacity: this.props.type === "nap" ? 1 : 0 }}>
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

  renderTitle() {
    if (this.props.type === "nap") {
      return <InfoText>Set nap duration</InfoText>;
    } else if (this.props.type === "wakeTime") {
      return <InfoText>Set wake time</InfoText>;
    } else if (this.props.type === "sleepTime") {
      return <InfoText>Set bedtime</InfoText>;
    }
  }

  render() {
    if (!this.state.hour) {
      return <Content />;
    }
    return (
      <Content>
        <TitleContainer>{this.renderTitle()}</TitleContainer>
        {this.props.type === "nap" && this.renderNap()}
        {this.props.type !== "nap" && this.renderTime()}
        {this.renderAlarm()}
        {this.renderButtons()}
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => {
  let time = null;
  if (props.type === "nap") {
    time = 0;
  } else if (props.type === "wakeTime") {
    time = state.wakeTime;
  } else if (props.type === "sleepTime") {
    time = state.sleepTime;
  }
  if (time === null) {
    time = 0;
  }
  return { time };
};

const mapDispatchToProps = (dispatch, props) => ({
  setClockData: ({ hour, minute, timeOfDay }) => {
    hour = parseInt(hour);
    minute = parseInt(minute);
    const m = moment(0).utc();
    if (props.type !== "nap") {
      if (hour === 12) {
        hour = 0;
      }
      if (timeOfDay === "PM") {
        hour += 12;
      }
    }
    m.hour(hour);
    m.minute(minute);
    return dispatch(setTime(m.toDate().getTime(), props.type));
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
