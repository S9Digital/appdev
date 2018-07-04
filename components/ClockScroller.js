import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import Moment from "react-moment";
import { hours, minutes, timeOfDay } from "../constants";

const Wrapper = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListRow = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const WheelContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ListItem = styled.View``;
const ListText = styled.Text``;

const itemsPerPage = 3;
const initialData = hours;
export class ClockScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 3,
      initialData: hours,
      hoursData: initialData.slice(0, 3),
      hoursPage: 0
    };
  }
  loadMore() {
    const dataLength = initialData.length - 1;
    const { hoursData, hoursPage } = this.state;
    let start = hoursPage + 1;
    let end = hoursPage + 1 + itemsPerPage;
    let newData = initialData.slice(start, end);
    this.setState({ hoursPage: hoursPage + 1 });
    if (end > dataLength + 1) {
      newData = initialData.slice(-2).concat(initialData.slice(0, 1));
      this.setState({ hoursPage: -2 });
    }
    if (start < 0) {
      newData = initialData.slice(-1).concat(initialData.slice(0, 2));
      this.setState({ hoursPage: -1 });
    }

    this.setState({ hoursData: [...newData] });
  }
  renderScrollWheel() {
    return (
      <WheelContainer>
        <TouchableOpacity onPress={() => this.loadMore()}>
          <Image
            style={{ height: 25, width: 25 }}
            source={require("../assets/upArrow.png")}
          />
        </TouchableOpacity>
        <FlatList
          pagingEnabled
          data={this.state.hoursData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ width: 50, height: 100 }}>
              <Text style={{ fontSize: 24 }}>{item.key}</Text>
            </View>
          )}
        />
        <TouchableOpacity>
          <Image
            style={{ height: 25, width: 25 }}
            source={require("../assets/downArrow.png")}
          />
        </TouchableOpacity>
      </WheelContainer>
    );
  }
  render() {
    if (this.state.hoursData) {
      return (
        <Wrapper>
          <ListRow>{this.renderScrollWheel()}</ListRow>
        </Wrapper>
      );
    } else {
      return <View />;
    }
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClockScroller);
