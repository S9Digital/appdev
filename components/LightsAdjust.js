import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Slider from "react-native-slider";
import styled from "styled-components";
import { connect } from "react-redux";
import { modalOpen, returnHome } from "../actions/TimeActions";
import {
  lightTone,
  lightBrightness,
  lightPreset
} from "../actions/LightActions";

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(43, 45, 48, 0.95);
  width: 100%;
  height: 100%;
`;

const PresetsContainer = styled.View`
  display: flex;
  flex: 1;
  width: 400px;
  margin-bottom: 20px;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Presets = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
const Box = styled.View`
  display: flex;
  flex: 1;
  border-width: 1px;
  border-color: ${props =>
    props.selected === true ? "rgba(158, 167, 182, 1)" : "rgba(0, 0, 0, 0.8)"};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  background-color: rgba(0, 0, 0, 0.8);
  width: 90px;
  height: 80px;
  margin: 5px;
`;
const BoxTitle = styled.Text`
  font-size: 12;
  color: white;
`;
const Tone = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;
const ToneBar = styled.View`
  width: 400px;
  height: 30px;
  border-radius: 30px;
  background-color: white;
`;
const Brightness = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;
const BrightnessBar = styled.View`
  width: 400px;
  height: 30px;
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
  font-size: 20;
  color: white;
  margin-bottom: 5px;
`;
class LightsAdjust extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toneValue: this.props.lightTone,
      brightnessValue: this.props.lightBrightness,
      scene: this.props.scene
    };
  }

  render() {
    return (
      <Container>
        <PresetsContainer>
          <Title>Presets</Title>
          <Presets>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                this.props.setLightPreset("relax");
              }}
            >
              <Box selected={this.props.scene === "relax"}>
                <BoxTitle>Relax</BoxTitle>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.setLightPreset("bedtime");
              }}
            >
              <Box selected={this.props.scene === "bedtime"}>
                <BoxTitle>Bedtime</BoxTitle>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.setLightPreset("energize");
              }}
            >
              <Box selected={this.props.scene === "energize"}>
                <BoxTitle>Engergize</BoxTitle>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.setLightPreset("circadium");
              }}
            >
              <Box selected={this.props.scene === "circadium"}>
                <BoxTitle>Circadium</BoxTitle>
              </Box>
            </TouchableOpacity>
          </Presets>
        </PresetsContainer>
        <Tone>
          <Title>Tone</Title>
          <Slider
            minimumTrackTintColor="linear-gradient( rgb(205,255,255) 0%, rgb(253,254,198) 100%);"
            maximumTrackTintColor="rgba(24,24,24,1)"
            thumbTintColor="white"
            thumbStyle={{ height: 30, width: 30, borderRadius: 15 }}
            trackStyle={{ height: 25, borderRadius: 20 }}
            style={{ width: 500, height: 50 }}
            step={1}
            value={this.state.toneValue}
            onValueChange={toneValue => this.setState({ toneValue })}
            maximumValue={100}
          />
        </Tone>
        <Brightness>
          <Title>Brightness</Title>
          <Slider
            minimumTrackTintColor="rgb(202,207,218)"
            maximumTrackTintColor="rgba(24,24,24,1)"
            thumbTintColor="white"
            thumbStyle={{ height: 30, width: 30, borderRadius: 15 }}
            trackStyle={{ height: 25, borderRadius: 20 }}
            style={{ width: 500, height: 50 }}
            step={1}
            value={this.state.brightnessValue}
            onValueChange={brightnessValue =>
              this.setState({ brightnessValue })
            }
            maximumValue={100}
          />
        </Brightness>
        <ButtonContainer>
          <Button>
            <TouchableOpacity
              onPress={() => {
                this.props.setLightTone(this.state.toneValue);
                this.props.setLightBrightness(this.state.brightnessValue);
                this.props.modalClose();
              }}
            >
              <Text style={{ padding: 10 }}>DONE</Text>
            </TouchableOpacity>
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  modal: state.modal,
  lightTone: state.lightTone,
  lightBrightness: state.lightBrightness,
  scenes: state.scene,
  scene: state.scene
});
const mapDispatchToProps = dispatch => ({
  setLightTone: tone => {
    return dispatch(lightTone(tone));
  },
  setLightBrightness: brightness => {
    return dispatch(lightBrightness(brightness));
  },
  setLightPreset: preset => {
    return dispatch(lightPreset(preset));
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
)(LightsAdjust);
