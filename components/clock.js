import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Moment from "react-moment";
import { connect } from "react-redux";
//import ClockScroller from "./ClockScroller";

const ClockContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BarContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
`;

const LightBar = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 200px;
  height: 30px;
  background-color: #80e5ff;
`;

const TimeText = styled.Text`
  font-size: 36px;
`;

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeAdjust: false
    };
  }

  toggleTimeAdjust() {
    this.setState({ timeAdjust: true });
  }
  back() {
    this.setState({ timeAdjust: false });
  }
  renderLightBar() {
    if (!this.state.timeAdjust) {
      return (
        <BarContainer>
          <LightBar>
            <TouchableOpacity onPress={() => this.toggleTimeAdjust()}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../assets/bell.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleTimeAdjust()}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../assets/moon.png")}
              />
            </TouchableOpacity>
          </LightBar>
        </BarContainer>
      );
    }
    if (this.state.timeAdjust) {
      return (
        <View>
          <TouchableOpacity onPress={() => this.back()}>
            <Text>back</Text>
          </TouchableOpacity>
        </View>
      );
      //   <ClockScroller />;
    }
  }

  render() {
    return (
      <ClockContainer>
        <Moment interval={1000} element={TimeText} format="h:mm A" />
        {this.renderLightBar()}
        <Text>set my sleep schedule</Text>
      </ClockContainer>
    );
  }
}
const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clock);
