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
import ClockAdjust from "./ClockAdjust";
import LightsAdjust from "./LightsAdjust";
import Weather from "./Weather";
import SleepSounds from "./SleepSounds";
import AlarmSettings from "./AlarmSettings";
import Clock from "./Clock";
import CurrentWeather from "./CurrentWeather";
import { hours, minutes, timeOfDay } from "../constants";
import { setTime, modalOpen, returnHome } from "../actions/SystemActions";
// import System from "./System";

//structure
const Wrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const TopContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  height: 80px;
`;
const BottomContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
  height: 80px;
`;
const Section = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 500px;
  height: 70px;
`;
//buttons
const Button = styled.View`
  background-color: rgba(43, 45, 48, 0.7);
  flex-direction: row;
  flex-wrap: nowrap;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 55px;
  margin: 7px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  border-radius: 25px;
  border: 3px solid #d32b4f;
  padding: 10px;
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
  margin-left: 10px;
`;
const WeatherDataWrapper = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 10px;
  width: 220px;
`;
//power
const PowerContainer = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 60px;
  margin: 20px;
  margin-bottom: 10px;
`;

//alarm
const AlarmContainer = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  flex-wrap: nowrap;
  width: 40px;
  margin-right: 15px;
  margin-top: 20px;
  margin-left: 290px;
`;
const AlarmButton = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
  height: 50px;
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
    //all sub components "routing" handled through here. prop string determines current modal
    if (this.props.modal !== null) {
      let modal;
      if (this.props.modal === "sounds") {
        modal = <SleepSounds />;
      } else if (this.props.modal === "alarm") {
        modal = <AlarmSettings />;
      } else if (this.props.modal === "lights") {
        modal = <LightsAdjust />;
      } else if (this.props.modal === "weather") {
        modal = <Weather />;
      } else if (
        this.props.modal === "sleepTime" ||
        this.props.modal === "wakeTime"
      ) {
        modal = <ClockAdjust type={this.props.modal} />;
      }
      return (
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
      );
    }
  }

  renderTop() {
    return (
      <TopContainer>
        <WeatherDataWrapper onPress={() => this.props.modalOpen("weather")}>
          <CurrentWeather />
        </WeatherDataWrapper>
        <AlarmContainer
          onPress={() => {
            this.setState({ alarmText: !this.state.alarmText });
            this.props.modalOpen("alarm");
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/bell.png")}
          />
          <AlarmButton>
            <ButtonText>
              {this.state.alarmText ? "ALARM ON" : "ALARM OFF"}
            </ButtonText>
            <ButtonText>10:00</ButtonText>
          </AlarmButton>
          <Slider>
            <SliderThumb alarm={this.state.alarmText} />
          </Slider>
        </AlarmContainer>
      </TopContainer>
    );
  }

  renderBottom() {
    return (
      <BottomContainer>
        <PowerContainer
          style={{ justifyContent: "center", alignItems: "flex-start" }}
        >
          <ButtonContainer
            style={{ marginLeft: 5, marginBottom: 2 }}
            // onPress={() => System.getInstance().getWakeLock(false)}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../assets/power.png")}
            />
          </ButtonContainer>
          {/* <PowerTextContainer> */}
          <Text
            style={{
              color: "white",
              fontSize: 14,
              marginRight: 10
            }}
          >
            Screen OFF
          </Text>
          {/* </PowerTextContainer> */}
        </PowerContainer>
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
          {/* <TouchableOpacity onPress={() => this.props.modalOpen("alarm")}> */}
          <Button>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../assets/stopwatch.png")}
            />
            <ButtonText style={{ marginRight: 10 }}>Take A Nap</ButtonText>
          </Button>
          {/* </TouchableOpacity> */}
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
        <PowerContainer
          style={{ justifyContent: "center", alignItems: "flex-end" }}
        >
          <ButtonContainer
            style={{
              width: 43,
              height: 43,
              borderRadius: 25,
              borderWidth: 3,
              borderStyle: "solid",
              borderColor: "white",
              padding: 10,
              marginRight: 10,
              marginBottom: 5
            }}
            // onPress={() => System.getInstance().getWakeLock(false)}
          />
          <Text
            style={{
              color: "white",
              fontSize: 14,
              marginRight: 12
            }}
          >
            Demo
          </Text>
        </PowerContainer>
      </BottomContainer>
    );
  }

  render() {
    return (
      <Wrapper>
        {this.renderModalView()}
        {this.renderTop()}
        <Section>
          <Clock />
        </Section>
        {this.renderBottom()}
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
