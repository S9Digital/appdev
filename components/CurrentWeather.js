import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { modalOpen, returnHome } from "../actions/SystemActions";
import Moment from "react-moment";
import Images from "../assets/Images";
import { color } from "../StyleVariables";

//weather
const WeatherContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin-left: 20px;
  margin-top: 20px;
  width: 250px;
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
const WeatherHeader = styled.Text`
  color: color.universalWhite;
  opacity: 0.8;
  font-size: 16px;
  flex-wrap: nowrap;
`;
const WeatherText = styled.Text`
  color: color.universalWhite;
  opacity: 0.8;
  font-size: 14px;
`;
const WeatherNumber = styled.Text`
  color: color.universalWhite;
  font-size: 30px;
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
  //all hard coded data here will be replaced with props data
  render() {
    return (
      <WeatherContainer>
        <Moment element={WeatherHeader} format="dddd MMMM D, YYYY" />
        <WeatherRow>
          <Image
            source={Images.sunny}
            style={{ height: 30, width: 30, marginTop: 5, marginRight: 15 }}
          />
          <WeatherNumber>67°</WeatherNumber>
          <WeatherData>
            <WeatherText> 59°F / 72°F</WeatherText>
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
