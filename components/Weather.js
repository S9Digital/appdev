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
import { modalOpen, returnHome } from "../actions/TimeActions";
import { tempWeather } from "../constants";

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(43, 45, 48, 0.98);
`;
const WeatherContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const WeatherTile = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  height: 300px;
  width: 100px;
  border: 1px solid white;
  flex-wrap: nowrap;
`;
const Content = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
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
      {console.log(item.high)}
      <Text style={{ color: "white" }}>{item.date}</Text>
      <Text style={{ color: "white" }}>{item.weather}</Text>
      <Text style={{ color: "white" }}>{item.rainChance}</Text>
      <Text style={{ color: "white" }}>{item.high}</Text>
      <Text style={{ color: "white" }}>{item.low}</Text>
    </WeatherTile>
  );
  render() {
    return (
      <Container>
        <Content>
          {/* <WeatherContainer> */}
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
