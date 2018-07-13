import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import Slider from "react-native-slider";
import styled from "styled-components";
import { connect } from "react-redux";
import { modalOpen, returnHome } from "../actions/TimeActions";
import { setSleepSound } from "../actions/SoundActions";
import SoundScroller from "./SoundScroller";
import { sleepSounds } from "../constants";

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(43, 45, 48, 0.95);
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

const Volume = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;
const VolumeBar = styled.View`
  width: 500px;
  height: 25px;
  border-radius: 30px;
  background-color: white;
`;
const Duration = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
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
`;
class SleepSounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSound: this.props.alarmSoundId
    };
  }
  render() {
    return (
      <Container>
        <PresetsContainer>
          <Title>Select Sleep Sounds</Title>
          <Presets>
            <SoundScroller
              data={sleepSounds}
              onPick={sound => this.setState({ selectedSound: sound })}
            />
          </Presets>
        </PresetsContainer>
        <Volume>
          <Title>Volume</Title>
          <Slider
            minimumTrackTintColor="rgb(202,207,218)"
            maximumTrackTintColor="rgba(24,24,24,1)"
            thumbTintColor="white"
            thumbStyle={{ height: 30, width: 30, borderRadius: 15 }}
            trackStyle={{ height: 25, borderRadius: 20 }}
            style={{ width: 500, height: 50 }}
            value={50}
            maximumValue={100}
          />
        </Volume>
        <Duration>
          <Title>Duration</Title>
          <Slider
            minimumTrackTintColor="rgb(202,207,218)"
            maximumTrackTintColor="rgba(24,24,24,1)"
            thumbTintColor="white"
            thumbStyle={{ height: 30, width: 30, borderRadius: 15 }}
            trackStyle={{ height: 25, borderRadius: 20 }}
            style={{ width: 500, height: 50 }}
            value={50}
            maximumValue={100}
          />
        </Duration>
        <ButtonContainer>
          <Button>
            <TouchableOpacity
              onPress={() => {
                this.props.setSoundData(this.state.selectedSound);
                this.props.modalClose();
              }}
            >
              <Text style={{ padding: 10 }}>Close</Text>
            </TouchableOpacity>
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  modal: state.modal,
  alarmSoundId: state.alarmSoundId
});
const mapDispatchToProps = dispatch => ({
  setSoundData: sound => {
    return dispatch(setSleepSound(sound));
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
)(SleepSounds);
