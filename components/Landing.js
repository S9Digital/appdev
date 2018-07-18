import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar
} from "react-native";
import styled from "styled-components";
import Moment from "react-moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ClockScroller from "./ClockScroller";
import ClockAdjust from "./ClockAdjust";
import LightsAdjust from "./LightsAdjust";
import SleepSounds from "./SleepSounds";
import AlarmSettings from "./AlarmSettings";
import Clock from "./Clock";
import { hours, minutes, timeOfDay } from "../constants";
import {
  setAlarmTime,
  setSleepTime,
  setWakeTime,
  modalOpen,
  returnHome
} from "../actions/TimeActions";

const Wrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
const LeftSection = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
const RightSection = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const Section = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.View`
  background-color: #000000;
  flex-direction: row;
  flex-wrap: nowrap;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 45px;
  margin-bottom: 10px;
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
  margin-left: 10px;
`;
const ButtonContainer = styled.View`
  border-radius: 25px;
  border: 3px solid #d32b4f;
  padding: 10px;
`;
const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 20px;
`;
const PowerContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  margin: 20px;
`;
const PowerTextContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 15px;
`;
const AlarmContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: nowrap;
  height: 100px;
  width: 250px;
  margin-bottom: 25px;
  margin-right: 25px;
`;
const Slider = styled.View`
  background-color: rgba(17, 134, 117, 0.5);
  height: 30px;
  width: 60px;
  border-radius: 14px;
  margin: 5px;
`;
const SliderThumb = styled.View`
  height: 30;
  width: 30;
  border-radius: 30;
  background-color: rgb(17, 134, 117);
  margin-left: ${props => (props.alarm === true ? 30 : 0)};
`;
const ModalContainer = styled.Modal`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibile: false,
      alarmText: false
    };
  }

  renderModalView() {
    if (this.props.modal !== null) {
      let modal;
      if (this.props.modal === "sounds") {
        modal = <SleepSounds />;
      } else if (this.props.modal === "alarm") {
        modal = <AlarmSettings />;
      } else if (this.props.modal === "lights") {
        modal = <LightsAdjust />;
      } else if (
        this.props.modal === "sleepTime" ||
        this.props.modal === "wakeTime"
      ) {
        modal = <ClockAdjust type={this.props.modal} />;
      }
      return (
        <View>
          <StatusBar hidden={true} />
          <ModalContainer
            animationType="fade"
            transparent={true}
            supportedOrientations={["portrait", "landscape"]}
            visible={true}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            {modal}
          </ModalContainer>
        </View>
      );
    }
  }

  renderLeft() {
    return (
      <LeftSection>
        <Container>
          <ButtonText>weather</ButtonText>
        </Container>
        <PowerContainer>
          <ButtonContainer>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../assets/power.png")}
            />
          </ButtonContainer>
          <PowerTextContainer>
            <ButtonText>Screen Off</ButtonText>
          </PowerTextContainer>
        </PowerContainer>
      </LeftSection>
    );
  }

  renderRight() {
    return (
      <RightSection>
        <Container>
          <TouchableOpacity onPress={() => this.props.modalOpen("lights")}>
            <Button>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/lightbulb.png")}
              />
              <ButtonText>Adjust Lights</ButtonText>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.modalOpen("alarm")}>
            <Button>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/stopwatch.png")}
              />
              <ButtonText style={{ marginRight: 10 }}>Take A Nap</ButtonText>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.modalOpen("sounds")}>
            <Button>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/notes.png")}
              />
              <ButtonText>Sleep Sounds</ButtonText>
            </Button>
          </TouchableOpacity>
        </Container>
        <AlarmContainer>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/bell.png")}
          />
          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row" }}
            onPress={() => this.setState({ alarmText: !this.state.alarmText })}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
                height: 50,
                width: 200
              }}
            >
              <ButtonText>
                {this.state.alarmText ? "ALARM ON" : "ALARM OFF"}
              </ButtonText>
              <ButtonText>10:00</ButtonText>
            </View>
            <Slider>
              <SliderThumb alarm={this.state.alarmText} />
            </Slider>
          </TouchableOpacity>
        </AlarmContainer>
      </RightSection>
    );
  }

  render() {
    return (
      <Wrapper>
        {this.renderModalView()}
        {this.renderLeft()}
        <Section>
          <Clock />
        </Section>
        {this.renderRight()}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  alarmTime: state.alarmTime,
  modal: state.modal,
  alarm: state.alarm
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
)(Landing);
