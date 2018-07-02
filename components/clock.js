import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components";
import Moment from "react-moment";

export default class Clock extends React.Component {
  render() {
    return <Moment interval={1000} element={Text} format="h:mm A" />;
  }
}
