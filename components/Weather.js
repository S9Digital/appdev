import React from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { modalOpen, returnHome } from "../actions/SystemActions";
import { tempWeather } from "../constants";
import CurrentWeather from "./CurrentWeather";
import { color } from "../StyleVariables";

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color.modalGrey};
  width: 100%;
  height: 100%;
`;
const CurrentWrapper = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 10px;
  height: 200px;
`;
const TileWrapper = styled.FlatList``;
const WeatherTile = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px 5px;
  align-self: flex-start;
  padding: 10px;
  flex-wrap: nowrap;
`;
const WeatherText = styled.Text`
  color: ${color.universalWhite};
  flex-wrap: nowrap;
  font-size: 20px;
`;
const Content = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TimeButton = styled.View`
  height: 30px;
  width: 100px;
  border-radius: 30px;
  background-color: ${color.universalWhite};
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

//all data from constants file to be replaced with props once weather API provided
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderItem = ({ item }) => (
    <WeatherTile>
      <WeatherText>{item.date}</WeatherText>
      <WeatherText>{item.weather}</WeatherText>
      <Image style={{ height: 46, width: 46 }} source={item.icon} />
      <WeatherText>rain {item.chanceRain}</WeatherText>
      <WeatherText>H {item.high}°</WeatherText>
      <WeatherText>L {item.low}°</WeatherText>
    </WeatherTile>
  );
  render() {
    return (
      <Container>
        <Content>
          <CurrentWrapper>
            <CurrentWeather />
          </CurrentWrapper>
          <TileWrapper
            data={tempWeather}
            scrollEnabled={false}
            horizontal={true}
            renderItem={this._renderItem}
          />
          <ButtonContainer>
            <TouchableOpacity onPress={() => this.props.modalClose()}>
              <TimeButton>
                <Text>Close</Text>
              </TimeButton>
            </TouchableOpacity>
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
)(Weather);
