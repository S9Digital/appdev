import React from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import { sleepSounds } from "../constants";
import { color } from "../StyleVariables";

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WheelContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const ButtonContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;
const Button = styled.View`
  width: 50px;
  height: 50px;
  background-color: ${color.fadedBlack};
  border-radius: 25px;
`;

const SoundContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const SoundText = styled.Text`
  font-size: 36px;
  color: ${color.universalWhite};
`;

class SoundScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      sound: this.props.data.slice(0, 1)
    };
  }
  scrollRight() {
    const dataLength = this.props.data.length - 1;
    const { page } = this.state;
    this.setState({ page: page + 1 });
    const start = page + 1;
    const end = page + 2;
    let newData = this.props.data.slice(start, end);
    if (end > dataLength) {
      this.setState({ page: -1 });
      newData = this.props.data.slice(start, end);
    }
    this.setState({ sound: [...newData] });
    this.props.onPick(this.props.data[start].key);
  }

  scrollLeft() {
    const dataLength = this.props.data.length - 1;
    const { page } = this.state;
    this.setState({ page: page - 1 });
    let start = page - 1;
    let end = page;
    let newData = this.props.data.slice(start, end);
    if (start < 0) {
      this.setState({ page: dataLength });
      start = dataLength;
      end = dataLength + 1;
      newData = this.props.data.slice(start, end);
    }
    this.setState({ sound: [...newData] });
    this.props.onPick(this.props.data[start].key);
  }

  render() {
    return (
      <WheelContainer>
        <TouchableOpacity onPress={() => this.scrollLeft()}>
          <Button>
            <ButtonContainer>
              <Image
                style={{ height: 30, width: 30, marginRight: 5 }}
                source={require("../assets/arrow-left.png")}
              />
            </ButtonContainer>
          </Button>
        </TouchableOpacity>
        <Container>
          <FlatList
            pagingEnabled
            data={this.state.sound}
            scrollEnabled={false}
            horizontal={true}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: 36, color: "color.universalWhite" }}>
                  {item.key}
                </Text>
              </View>
            )}
          />
        </Container>
        <TouchableOpacity onPress={() => this.scrollRight()}>
          <Button>
            <ButtonContainer>
              <Image
                style={{ height: 30, width: 30, marginLeft: 5 }}
                source={require("../assets/arrow-right.png")}
              />
            </ButtonContainer>
          </Button>
        </TouchableOpacity>
      </WheelContainer>
    );
  }
}

const mapStateToProps = (state, props) => ({
  alarmSoundId: state.alarmSoundId
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundScroller);
