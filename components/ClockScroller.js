import React from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import Moment from "react-moment";
import { hours, minutes, timeOfDay } from "../constants";
import { color } from "../StyleVariables";
import { WheelPicker } from "react-native-wheel-picker-android";

const Wrapper = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  margin: 10px;
`;
const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background-color: ${color.fadedBlack};
`;

const WheelContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class ClockScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 3,
      time: this.props.data.slice(0, 3),
      page: 0
    };
  }

  scrollUp() {
    const dataLength = this.props.data.length - 1;
    const { itemsPerPage, page } = this.state;
    let start = page + 1;
    let end = page + 1 + itemsPerPage;
    let newData = this.props.data.slice(start, end);
    this.setState({ page: page + 1 });
    if (end > dataLength + 1) {
      newData = this.props.data.slice(-2).concat(this.props.data.slice(0, 1));
      this.setState({ page: -2 });
    }
    if (start < 0) {
      newData = this.props.data.slice(-1).concat(this.props.data.slice(0, 2));
      this.setState({ page: -1 });
    }
    this.setState({ time: [...newData] });
    this.props.onPick(this.state.time[0].key);
  }

  scrollDown() {
    const dataLength = this.props.data.length - 1;
    const { itemsPerPage, page } = this.state;
    let start = page - 1;
    let end = page + itemsPerPage - 1;
    let newData = this.props.data.slice(start, end);
    this.setState({ page: page - 1 });
    if (start === dataLength - 1) {
      newData = this.props.data.slice(-2).concat(this.props.data.slice(0, 1));
      this.setState({ page: dataLength - 1 });
    }
    if (start === -1) {
      newData = this.props.data.slice(-1).concat(this.props.data.slice(0, 2));
      this.setState({ page: dataLength });
    }
    this.setState({ time: [...newData] });
    this.props.onPick(this.state.time[0].key);
  }

  render() {
    return (
      <WheelPicker
        isCyclic
        isCurved
        data={this.props.data.map(node => node.key)}
        itemTextSize={60}
        visibleItemCount={5}
        isAtmospheric={true}
        itemTextColor={color.universalWhite}
        style={{ flexGrow: 1 }}
      />
    );
  }

  renderNah() {
    return (
      <Wrapper>
        <TouchableOpacity onPress={() => this.scrollUp()}>
          {/* <Button>
            <ButtonContainer> */}
          <Image
            style={{ height: 50, width: 50 }}
            source={require("../assets/arrow-up.png")}
          />
          {/* </ButtonContainer>
          </Button> */}
        </TouchableOpacity>
        <WheelContainer>
          <Container>
            <FlatList
              data={this.state.time}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              pagingEnabled
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    margin: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 26, color: color.universalWhite }}>
                    {item.key}
                  </Text>
                </View>
              )}
            />
          </Container>
        </WheelContainer>
        <TouchableOpacity onPress={() => this.scrollDown()}>
          {/* <Button>
            <ButtonContainer> */}
          <Image
            style={{ height: 40, width: 40 }}
            source={require("../assets/arrow-down.png")}
          />
          {/* </ButtonContainer>
          </Button> */}
        </TouchableOpacity>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  sleepTime: state.sleeptime,
  wakeTime: state.wakeTime,
  alarmTime: state.alarmTime
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClockScroller);
