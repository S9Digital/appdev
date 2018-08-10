import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";
import Moment from "react-moment";
import { modalOpen, returnHome } from "../actions/SystemActions";
import { connect } from "react-redux";
import { color } from "../StyleVariables";

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
const AlarmTitle = styled.Text`
  font-size: 16px;
  color: color.universalWhite;
  font-weight: bold;
  margin: 5px;
`;
const AlarmText = styled.Text`
  font-size: 16px;
  color: color.fadedWhite;
  margin: 5px;
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
        <TextBarTop>
          <AlarmTitle>Wake</AlarmTitle>
          <AlarmTitle>Bedtime</AlarmTitle>
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
          <AlarmText>
            {this.props.wakeTime ? this.props.wakeTime : "OFF"}
          </AlarmText>
          <AlarmText>
            {this.props.sleepTime ? this.props.sleepTime : "OFF"}
          </AlarmText>
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
          {/* interval could be lower, only updates every minute now */}
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
