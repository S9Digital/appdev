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
  width: 400px;
  height: 30px;
  border-radius: 25px;
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
  justify-content: flex-start;
  flex-wrap: nowrap;
`;

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 400px;
`;

const TimeText = styled.Text`
  font-size: 100px;
  color: white;
`;
const AmPmText = styled.Text`
  font-size: 25px;
  color: white;
  padding-top: 58px;
`;

const IconBorder = styled.View`
  background-color: rgb(14, 14, 14);
  border-radius: 35px;
  margin: 5px;
  height: 30px;
  width: 30px;
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
          <TouchableOpacity onPress={() => this.props.modalOpen("sleepTime")}>
            <IconBorder>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 2
                }}
                source={require("../assets/bell.png")}
              />
            </IconBorder>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.modalOpen("wakeTime")}>
            <IconBorder>
              <Image
                style={{ width: 25, height: 25, marginRight: -5 }}
                source={require("../assets/sleep.png")}
              />
            </IconBorder>
          </TouchableOpacity>
        </LightBar>
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
        <Text style={{ color: "white" }}>set my sleep schedule</Text>
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
