import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { sleepSounds } from "../constants";

const Wrapper = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  background-color: rgb(14, 14, 14);
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
  color: white;
`;
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

class SoundScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 1,
      sound: this.props.data.slice(0, 1),
      page: 0
    };
  }

  //   scrollUp() {
  //     const dataLength = this.props.data.length - 1;
  //     const { itemsPerPage, page } = this.state;
  //     let start = page + 1;
  //     let end = page + 1 + itemsPerPage;
  //     let newData = this.props.data.slice(start, end);
  //     this.setState({ page: page + 1 });
  //     if (end > dataLength + 1) {
  //       newData = this.props.data.slice(-2).concat(this.props.data.slice(0, 1));
  //       this.setState({ page: -2 });
  //     }
  //     if (start < 0) {
  //       newData = this.props.data.slice(-1).concat(this.props.data.slice(0, 2));
  //       this.setState({ page: -1 });
  //     }
  //     this.setState({ sound: [...newData] });
  //     this.props.onPick(this.state.sound[1].key);
  //   }

  //   scrollDown() {
  //     const dataLength = this.props.data.length - 1;
  //     const { itemsPerPage, page } = this.state;
  //     let start = page - 1;
  //     let end = page + itemsPerPage - 1;
  //     let newData = this.props.data.slice(start, end);
  //     this.setState({ page: page - 1 });
  //     if (start === dataLength - 1) {
  //       newData = this.props.data.slice(-2).concat(this.props.data.slice(0, 1));
  //       this.setState({ page: dataLength - 1 });
  //     }
  //     if (start === -1) {
  //       newData = this.props.data.slice(-1).concat(this.props.data.slice(0, 2));
  //       this.setState({ page: dataLength });
  //     }
  //     this.setState({ sound: [...newData] });
  //     this.props.onPick(this.state.sound[0].key);
  //   }

  render() {
    return (
      <WheelContainer>
        <TouchableOpacity onPress={() => this.scrollUp()}>
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
                <Text style={{ fontSize: 36, color: "white" }}>{item.key}</Text>
              </View>
            )}
          />
        </Container>
        <TouchableOpacity onPress={() => this.scrollDown()}>
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

const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundScroller);
