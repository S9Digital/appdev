import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";
import Moment from "react-moment";
import { modalOpen, returnHome } from "../actions/SystemActions";
import { connect } from "react-redux";
import { color } from "../StyleVariables";
import moment from "moment";

const ClockContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
`;
const BarContainer = styled.View`
  display: flex;
  flex: 1;
  height: 200px;
  margin-bottom: 200px;
  align-items: center;
  justify-content: flex-start;
`;
const TextBarTop = styled.View`
  display: flex;
  flex: 1;
  width: 425px;
  height: 30px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;
const TextBarBottom = styled.View`
  display: flex;
  flex: 1;
  width: 425px;
  height: 30px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;
const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 400px;
  margin-top: 200px;
  margin-bottom: 35px;
`;
const TimeText = styled.Text`
  font-size: 92px;
  color: white;
  letter-spacing: 3px;
`;
const AmPmText = styled.Text`
  font-size: 20px;
  color: white;
  margin-bottom: 20px;
  margin-right: 15px;
`;
const ClockText = styled.Text`
  font-size: 16px;
  color: ${color.fadedWhite};
  margin: 5px;
  width: 150px;
  position: absolute;
  text-align: center;
  ${props => (props.right ? "right: 0" : "left: 0")};
  ${props => (props.right ? "margin-right: -45px" : "margin-left: -45px")};
`;
const AlarmText = styled(ClockText)`
  top: 5px;
`;
const AlarmTitle = styled(ClockText)`
  color: ${color.universalWhite};
  bottom: 5px;
  font-weight: bold;
`;
const IconBorder = styled.View`
  border-radius: 15px;
  height: 30px;
  width: 30px;
  margin: 1.5px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
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
    let wakeText = "OFF";
    if (this.props.wakeTime !== null) {
      wakeText = moment(this.props.wakeTime)
        .utc()
        .format("h:mmA");
    }
    let sleepText = "OFF";
    if (this.props.sleepTime !== null) {
      sleepText = moment(this.props.sleepTime)
        .utc()
        .format("h:mmA");
    }
    return (
      <BarContainer>
        <TextBarTop>
          <AlarmTitle>Wake</AlarmTitle>
          <AlarmTitle right>Bedtime</AlarmTitle>
        </TextBarTop>
        <LinearGradient
          colors={[color.sliderBlue, color.universalWhite, color.sliderYellow]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            width: 400,
            height: 34,
            borderRadius: 25
          }}
        >
          <TouchableOpacity onPress={() => this.props.modalOpen("wakeTime")}>
            <IconBorder>
              <Image
                style={{
                  width: 20,
                  height: 20
                }}
                source={require("../assets/sun.png")}
              />
            </IconBorder>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.modalOpen("sleepTime")}>
            <IconBorder>
              <Image
                style={{ width: 16, height: 16 }}
                source={require("../assets/sleep.png")}
              />
            </IconBorder>
          </TouchableOpacity>
        </LinearGradient>
        <TextBarBottom>
          <AlarmText>{wakeText}</AlarmText>
          <AlarmText right>{sleepText}</AlarmText>
        </TextBarBottom>
        <Text
          style={{
            color: color.universalWhite,
            fontSize: 18,
            marginTop: 30
          }}
        >
          Sleep schedule
        </Text>
      </BarContainer>
    );
  }

  render() {
    return (
      <ClockContainer>
        <Container>
          {/* silly but straightforward way to ignore AM/PM for centering purposes*/}
          <Moment
            style={{ opacity: 0 }}
            interval={1000}
            element={AmPmText}
            format="A "
          />
          <Moment interval={1000} element={TimeText} format="h:mm" />
          <Moment interval={1000} element={AmPmText} format=" A" />
        </Container>
        {this.renderLightBar()}
      </ClockContainer>
    );
  }
}
const mapStateToProps = state => ({
  sleepTime: state.sleepTime,
  wakeTime: state.wakeTime,
  alarmTime: state.alarmTime,
  modal: state.modal,
  userActions: state.userActions
});
const mapDispatchToProps = dispatch => ({
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
)(Clock);
