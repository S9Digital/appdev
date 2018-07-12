import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Slider
} from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { modalOpen, returnHome } from "../actions/TimeActions";
import SoundScroller from "./SoundScroller";
import { sleepSounds } from "../constants";

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(43, 45, 48, 0.99);
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PresetsContainer = styled.View`
  display: flex;
  flex: 1;
  width: 400px;
  margin-top: 30px;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Presets = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Info = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  width: 300px;
`;
const Duration = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  height: 30px;
`;
const DurationBar = styled.View`
  width: 500px;
  height: 25px;
  border-radius: 30px;
  background-color: white;
`;
const ButtonContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100px;
`;
const Button = styled.View`
  border-radius: 30px;
  background-color: white;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 12;
  color: white;
  margin-bottom: 5px;
  flex-wrap: nowrap;
`;
class AlarmSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSound: "default"
    };
  }
  render() {
    return (
      <Container>
        <PresetsContainer>
          <Title>Select Alarm Sound</Title>
          <Presets>
            <SoundScroller
              data={sleepSounds}
              //   onPick={sound => this.setState({ selectedSound: sound })}
            />
          </Presets>
        </PresetsContainer>
        <Duration>
          <Title>Duration</Title>
          <Slider
            minimumTrackTintColor="rgb(202,207,218)"
            maximumTrackTintColor="rgba(14,14,14,0.4)"
            thumbTintColor="transparent"
            trackStyle={{
              height: 30,
              width: 10,
              borderwidth: 1,
              borderRadius: 15,
              backgroundColor: "rgb(202,207,218)"
            }}
            style={{
              height: 20,
              width: 500,
              borderWidth: 1,
              borderRadius: 15,
              backgroundColor: "rgba(14,14,14,0.2)"
            }}
            value={0}
            maximumValue={1}
          />
        </Duration>
        <Info>
          <Title>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Title>
        </Info>
        <ButtonContainer>
          <Button>
            <TouchableOpacity onPress={() => this.props.modalClose()}>
              <Text style={{ padding: 10 }}>Close</Text>
            </TouchableOpacity>
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
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
)(AlarmSettings);
