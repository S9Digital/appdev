import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { modalOpen, returnHome } from "../actions/SystemActions";
import Moment from "react-moment";

//weather
const WeatherContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 10px;
  margin-top: 20px;
  width: 200px;
  height: 100px;
`;

const WeatherData = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 5px;
`;
const WeatherText = styled.Text`
  color: white;
  opacity: 0.8;
  font-size: 16px;
`;
const WeatherNumber = styled.Text`
  color: white;
  font-size: 40px;
  margin-right: 10px;
`;
const WeatherRow = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;
class CurrentWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <WeatherContainer>
        <Moment element={WeatherText} format="dddd MMMM D, YYYY" />
        <WeatherRow>
          <WeatherNumber>67°</WeatherNumber>
          <WeatherData>
            <WeatherText>Partly cloudy</WeatherText>
            <WeatherText>L 59°/H 72°</WeatherText>
          </WeatherData>
        </WeatherRow>
      </WeatherContainer>
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
)(CurrentWeather);
