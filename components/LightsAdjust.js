import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { setTime, modalOpen, returnHome } from "../actions/TimeActions";

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(43, 45, 48, 0.9);
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
`;
const Button = styled.View`
  border-radius: 30px;
  background-color: white;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 10px;
`;

const Title = styled.Text`
  font-size: 20;
  color: white;
  margin-bottom: 5px;
`;
class LightsAdjust extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <PresetsContainer>
          <Title>Presets</Title>
          <Presets>
            <Box>
              <BoxTitle>Relax</BoxTitle>
            </Box>
            <Box>
              <BoxTitle>Bedtime</BoxTitle>
            </Box>
            <Box>
              <BoxTitle>Engergize</BoxTitle>
            </Box>
            <Box>
              <BoxTitle>Circadium</BoxTitle>
            </Box>
          </Presets>
        </PresetsContainer>
        <Tone>
          <Title>Tone</Title>
          <ToneBar />
        </Tone>
        <Brightness>
          <Title>Brightness</Title>
          <BrightnessBar />
        </Brightness>
        <ButtonContainer>
          <Button>
            <TouchableOpacity onPress={() => this.props.modalClose()}>
              <Text>cancel</Text>
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
)(LightsAdjust);
