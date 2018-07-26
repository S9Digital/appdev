import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { modalOpen, returnHome } from "../actions/TimeActions";

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(43, 45, 48, 0.98);
  width: 100%;
  height: 100%;
`;
const Content = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const TimeButton = styled.View`
  height: 30px;
  width: 100px;
  border-radius: 30px;
  background-color: white;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
const ButtonContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 300px;
  height: 30px;
`;

class AlarmSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderWeather() {
    return <View />;
  }
  render() {
    return (
      <Container>
        <Content>
          <ButtonContainer>
            <TouchableOpacity onPress={() => this.props.modalClose()}>
              <TimeButton>
                <Text>Close</Text>
              </TimeButton>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.modalClose();
              }}
            />
          </ButtonContainer>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({});
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
