import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Slider from "react-native-slider";
import styled from "styled-components";
import { connect } from "react-redux";
import { modalOpen, returnHome } from "../actions/SystemActions";
import {
  lightTone,
  lightBrightness,
  lightPreset,
  getLightState
} from "../actions/LightActions";
import _ from "underscore";

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(43, 45, 48, 0.98);
  width: 100%;
  height: 100%;
`;

const PresetsContainer = styled.View`
  display: flex;
  flex: 1;
  width: 500px;
  height: 180px;
  margin-bottom: 20px;
  margin-top: 50px;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Presets = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin-top: 5px;
`;
const Box = styled.View`
  display: flex;
  flex: 1;
  border-width: 1.5px;
  border-color: ${props =>
    props.selected === true
      ? "rgba(158, 167, 182, 0.8)"
      : "rgba(23, 23, 24, 0.8)"};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  background-color: rgba(23, 23, 24, 0.8);
  width: 115px;
  height: 110px;
  margin: 4px;
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
const Brightness = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 200px;
`;
const Button = styled.View`
  border-radius: 30px;
  background-color: white;
  width: 100px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 14;
  color: white;
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
  componentDidMount() {
    //getLightState to gather device configuration
    //this.props.lightGetter();
  }
  render() {
    return (
      <Container>
        <PresetsContainer>
          <Title>Presets</Title>
          <Presets>
            <TouchableOpacity
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
  lightGetter: () => {
    return dispatch(getLightState());
  },
  setLightTone: _.throttle(tone => {
    return dispatch(lightTone(tone));
  }, 1500),
  setLightBrightness: _.throttle(brightness => {
    return dispatch(lightBrightness(brightness));
  }, 1500),
  setLightPreset: _.throttle(preset => {
    return dispatch(lightPreset(preset));
  }, 1500),
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
