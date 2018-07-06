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
  flex-wrap: nowrap;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  margin-bottom: 10px;
`;
const ButtonText = styled.Text`
  color: white;
`;
const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibile: false
    };
  }
  renderModalView() {
    if (this.props.modal !== null) {
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <ClockAdjust />
        </Modal>
      );
    }
  }
  render() {
    return (
      <Wrapper>
        {this.renderModalView()}
        <WideSection>
          <Container>
            <Text>weather</Text>
          </Container>
          <Container>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/power.png")}
            />
          </Container>
        </WideSection>
        <NarrowSection>
          <Clock />
        </NarrowSection>
        <WideSection>
          <Container>
            <Button>
              <ButtonText>lights</ButtonText>
            </Button>
            <Button>
              <ButtonText>nap</ButtonText>
            </Button>
          </Container>
          <Container>
            <Text>alarm</Text>
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
