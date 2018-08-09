import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { modalOpen, returnHome } from "../actions/SystemActions";
import { tempWeather } from "../constants";
import CurrentWeather from "./CurrentWeather";

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(43, 45, 48, 0.98);
  width: 100%;
  height: 100%;
`;
const WeatherContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
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
const WeatherTile = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
  margin-top: 15px;
  height: 200px;
  width: 120px;
  border: 1px solid white;
  flex-wrap: nowrap;
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

const WeatherText = styled.Text`
  font-size: 20px;
  color: white;
`;

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderItem = ({ item }) => (
    <WeatherTile>
      <Text style={{ color: "white", flexWrap: "nowrap" }}>{item.date}</Text>
      <Text style={{ color: "white", flexWrap: "nowrap" }}>{item.weather}</Text>
      <Image style={{ height: 46, width: 46 }} source={item.icon} />
      <Text style={{ color: "white", flexWrap: "nowrap" }}>
        rain {item.chanceRain}
      </Text>
      <Text style={{ color: "white", flexWrap: "nowrap" }}>H {item.high}</Text>
      <Text style={{ color: "white", flexWrap: "nowrap" }}>L {item.low}</Text>
    </WeatherTile>
  );
  render() {
    return (
      <Container>
        <Content>
          {/* <WeatherContainer> */}
          <CurrentWrapper>
            <CurrentWeather />
          </CurrentWrapper>
          <FlatList
            data={tempWeather}
            scrollEnabled={false}
            horizontal={true}
            //   keyExtractor={item => item.key}
            renderItem={this._renderItem}
          />
          {/* </WeatherContainer> */}
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
