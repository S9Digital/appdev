import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import styled from "styled-components";
import Moment from "react-moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ClockScroller from "./ClockScroller";
import ClockAdjust from "./ClockAdjust";
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
const WideSection = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NarrowSection = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.View`
  background-color: #000000;
  flex-direction: row;
  flex-wrap: nowrap;
  border-radius: 20px;
  align-items: center;
  justify-content: space-around;
  width: 150px;
  height: 40px;
  margin-bottom: 10px;
`;
const ButtonText = styled.Text`
  color: white;
  margin-right: 10px;
`;
const ButtonContainer = styled.View`
  border-radius: 25px;
  border: 2px solid #279fdc;
  padding: 10px;
`;
const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 10%;
`;
const ContainerAlarm = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 18%;
`;

const ModalContainer = styled.Modal`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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
      return (
        <ModalContainer
          animationType="slide"
          transparent={false}
          supportedOrientations={["portrait", "landscape"]}
          visible={true}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <ClockAdjust type={this.props.modal} />
        </ModalContainer>
      );
    }
  }
  render() {
    return (
      <Wrapper>
        {this.renderModalView()}
        <WideSection>
          <Container>
            <ButtonText>weather</ButtonText>
          </Container>
          <Container>
            <ButtonContainer>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/power-button-off.png")}
              />
            </ButtonContainer>
          </Container>
        </WideSection>
        <NarrowSection>
          <Clock />
        </NarrowSection>
        <WideSection>
          <Container>
            <Button>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/bell.png")}
              />
              <ButtonText>Adjust Lights</ButtonText>
            </Button>
            <Button>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/stopwatch.png")}
              />
              <ButtonText>Take A Nap</ButtonText>
            </Button>
          </Container>
          <ContainerAlarm>
            <TouchableOpacity
              onPress={() =>
                this.setState({ alarmText: !this.state.alarmText })
              }
            >
              <ButtonText>
                {this.state.alarmText ? "Alarm On" : "Alarm Off"}
              </ButtonText>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/bell.png")}
              />
            </TouchableOpacity>
          </Container>
        </WideSection>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  alarmTime: state.alarmTime,
  modal: state.modal
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
