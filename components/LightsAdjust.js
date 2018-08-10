import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
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
import Images from "../assets/Images";
import LinearGradient from "react-native-linear-gradient";
import { color } from "../StyleVariables";

const Wrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: color.modalGrey;
  width: 100%;
  height: 100%;
`;
const PresetsContainer = styled.View`
  display: flex;
  flex: 1;
  width: 500px;
  height: 40px;
  margin-right: 20px;
  margin-top: 10px;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Presets = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 90px;
`;
const Box = styled.ImageBackground`
  display: flex;
  flex: 1;
  border-width: 1.5px;
  border-radius: 15px;
  overflow: hidden;
  border-color: ${props =>
    props.selected === true
      ? "rgba(158, 167, 182, 1)"
      : "rgba(23, 23, 24, 0.1)"};
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  background-color: color.fadedBlack;
  width: 125px;
  height: 80px;
  margin-left: 4px;
  margin-right: 4px;
`;
const BoxTitle = styled.Text`
  font-size: 12;
  color: white;
  z-index: 2;
`;
const Content = styled.View`
  height: 260px;
`;
const SliderContent = styled.View`
  height: 200px;
  justify-content: center;
  align-items: center;
`;
const Tone = styled.View`
  display: flex;
  flex: 1;
  width: 500px;
  margin-left: 15px;
  justify-content: center;
  align-items: flex-start;
`;
const Brightness = styled.View`
  display: flex;
  flex: 1;
  width: 500px;
  margin-left: 15px;
  justify-content: center;
  align-items: flex-start;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 60px;
  padding: 5px;
`;
const Button = styled.View`
  border-radius: 25px;
  background-color: color.universalWhite;
  width: 180px;
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  font-size: 10px;
  margin: 5px;
  flex-wrap: nowrap;
`;
const CloseContainer = styled.View`
  display: flex;
  height: 50px;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 10px;
`;
const Close = styled.TouchableOpacity`
  display: flex;
  height: 50px;
  width: 100px;
  margin-right: 10px;
  margin: 5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 14;
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
  // componentDidMount() {
  //   //getLightState to gather device configuration from Ario backend
  //   this.props.lightGetter();
  // }
  render() {
    return (
      <Wrapper>
        <PresetsContainer>
          <Title>Presets</Title>
          <Presets>
            <TouchableOpacity
              onPress={() => {
                this.props.setLightPreset("relax");
              }}
            >
              <Box
                selected={this.props.scene === "relax"}
                source={Images.redPurple}
                ImageStyle={{ BorderRadius: 15, overflow: "hidden" }}
              >
                <BoxTitle>Relax</BoxTitle>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.setLightPreset("bedtime");
              }}
            >
              <Box
                selected={this.props.scene === "bedtime"}
                source={Images.brownWhite}
                ImageStyle={{ BorderRadius: 15, overflow: "hidden" }}
              >
                <BoxTitle>Bedtime</BoxTitle>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.setLightPreset("energize");
              }}
            >
              <Box
                selected={this.props.scene === "energize"}
                source={Images.greenYellow}
                ImageStyle={{ BorderRadius: 15, overflow: "hidden" }}
              >
                <BoxTitle>Engergize</BoxTitle>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.setLightPreset("circadium");
              }}
            >
              <Box
                selected={this.props.scene === "circadium"}
                source={Images.blueYellow}
                ImageStyle={{ BorderRadius: 15, overflow: "hidden" }}
              >
                <BoxTitle>Circadium</BoxTitle>
              </Box>
            </TouchableOpacity>
          </Presets>
        </PresetsContainer>
        <Content>
          <SliderContent>
            <Tone>
              <Title>Color</Title>
              <LinearGradient
                colors={[
                  color.sliderBlue,
                  color.universalWhite,
                  color.sliderYellow
                ]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "nowrap",
                  width: 500,
                  height: 30,
                  borderRadius: 25,
                  zIndex: 1
                }}
              />
              {/* <Slider
            thumbTintColor="blue"
            thumbStyle={{
              height: 30,
              width: 30,
              borderRadius: 15,
              zIndex: 5
            }}
            trackStyle={{
              height: 1,
              borderRadius: 20,
              zIndex: 3,
              backgroundColor: "rgba(0,0,0,0)",
              opacity: 0
            }}
            style={{ width: 500, height: 50 }}
            step={1}
            value={this.state.toneValue}
            onValueChange={toneValue => this.setState({ toneValue })}
            maximumValue={100}
          /> */}
            </Tone>
            <Brightness>
              <Title>Brightness</Title>
              {/* <Slider
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
          /> */}
              <LinearGradient
                colors={["#000000", "#6e6e64", color.universalWhite]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "nowrap",
                  width: 500,
                  height: 30,
                  borderRadius: 25
                }}
              />
            </Brightness>
          </SliderContent>
          <ButtonContainer>
            <TouchableOpacity
              onPress={() => {
                this.props.setLightTone(this.state.toneValue);
                this.props.setLightBrightness(this.state.brightnessValue);
              }}
            >
              <Button>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "color.alarmGreen"
                  }}
                />
                <ButtonText>Turn ON All Lights</ButtonText>
              </Button>
            </TouchableOpacity>
            <View />
            <TouchableOpacity
              onPress={() => {
                this.props.setLightTone(this.state.toneValue);
                this.props.setLightBrightness(this.state.brightnessValue);
              }}
            >
              <Button>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "#53575f"
                  }}
                />
                <ButtonText>Turn OFF All Lights</ButtonText>
              </Button>
            </TouchableOpacity>
          </ButtonContainer>
        </Content>
        <CloseContainer>
          <Close onPress={() => this.props.modalClose()}>
            <Image
              style={{ width: 25, height: 25, marginRight: 25 }}
              source={Images.xClose}
            />
            <BoxTitle>CLOSE</BoxTitle>
          </Close>
        </CloseContainer>
      </Wrapper>
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
