import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
//import LinearGreadient from "react-native-linear-gradient"; needs to be linked for android
import styled from "styled-components";
import Moment from "react-moment";
import { setTime, modalOpen, returnHome } from "../actions/TimeActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
  padding-bottom: 200px;
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
  width: 400px;
  height: 30px;
  border-radius: 25px;
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
  justify-content: flex-start;
  flex-wrap: nowrap;
`;

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 400px;
  padding-top: 200px;
`;

const TimeText = styled.Text`
  font-size: 100px;
  color: white;
  padding-top: 80px;
`;
const AmPmText = styled.Text`
  font-size: 20px;
  color: white;
  margin-bottom: 25px;
`;

const AlarmTitle = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
  margin: 5px;
`;

const AlarmText = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 5px;
`;

const IconBorder = styled.View`
  background-color: rgb(14, 14, 14);
  border-radius: 30px;
  margin: 1px;
  padding: 5px;
  height: 30px;
  width: 30px;
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
        <LightBar>
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
        </LightBar>
        <TextBarBottom>
          <Moment
            element={AlarmText}
            format="h:mm A"
            date={this.props.wakeTime}
          />
          <Moment
            element={AlarmText}
            format="h:mm A"
            date={this.props.sleepTime}
          />
        </TextBarBottom>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 30
          }}
        >
          Set my sleep schedule
        </Text>
      </BarContainer>
    );
  }

  render() {
    return (
      <ClockContainer>
        <Container>
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
