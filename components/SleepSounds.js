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
import { modalOpen, returnHome } from "../actions/SystemActions";
import {
  setSleepSound,
  setSoundVolume,
  setSoundDuration
} from "../actions/SoundActions";
import SoundScroller from "./SoundScroller";
import { sleepSounds } from "../constants";
import { color } from "../StyleVariables";
import { throttle } from "underscore";

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${color.modalGrey};
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
  background-color: ${color.universalWhite};
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
  background-color: ${color.universalWhite};
`;
const ButtonContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 400px;
`;
const Button = styled.View`
  border-radius: 30px;
  background-color: ${color.universalWhite};
  display: flex;
  flex: 1;
  justify-content: center;
  flex-basis: 150px;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
`;
const PreviewButton = styled(Button)`
  background-color: ${color.fadedBlack};
`;
const PreviewText = styled.Text`
  color: ${color.universalWhite};
`;
const DurationThumb = styled.Text`
  align-self: center;
  color: ${color.fadedGrey};
  margin-top: 6px;
  font-size: 12;
`;

const Title = styled.Text`
  font-size: 12;
  color: ${color.universalWhite};
  margin-bottom: 5px;
`;
class SleepSounds extends React.Component {
  constructor(props) {
    super(props);
    this.setVolume = throttle(volumeValue => {
      this.setState({ volumeValue });
    }, 50);
    this.state = {
      selectedSound: this.props.alarmSoundId,
      volumeValue: 0,
      durationValue: 0
    };
  }
  render() {
    let label = () => (
      <DurationThumb>{this.state.durationValue}h</DurationThumb>
    );
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
            step={1}
            value={this.state.volumeValue}
            onValueChange={this.setVolume}
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
            step={1}
            value={this.state.durationValue}
            onValueChange={durationValue => this.setState({ durationValue })}
            thumbContent={label}
            maximumValue={12}
          />
        </Duration>
        <ButtonContainer>
          <PreviewButton>
            <TouchableOpacity
              onPress={() => {
                this.setState({ playing: !this.state.playing });
              }}
            >
              <PreviewText style={{ padding: 10 }}>
                {this.state.playing ? "Stop Preview" : "Preview"}
              </PreviewText>
            </TouchableOpacity>
          </PreviewButton>
          <Button>
            <TouchableOpacity
              onPress={() => {
                this.props.soundData(this.state.selectedSound);
                this.props.soundVolume(this.state.volumeValue);
                this.props.soundDuration(this.state.durationValue);
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
  alarmSoundId: state.alarmSoundId,
  sleepSoundDuration: state.sleepSoundDuration,
  sleepSoundVolume: state.sleepSoundVolume
});
const mapDispatchToProps = dispatch => ({
  soundData: sound => {
    return dispatch(setSleepSound(sound));
  },
  soundVolume: volume => {
    return dispatch(setSoundVolume(volume));
  },
  soundDuration: duration => {
    return dispatch(setSoundDuration(duration));
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
