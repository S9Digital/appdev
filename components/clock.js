import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components";
const currentTime = new Date();
const currentHours = currentTime.getHours();
const currentMinutes = currentTime.getMinutes();
currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
const currentSeconds = currentTime.getSeconds();
const timeOfDay = currentHours < 12 ? "AM" : "PM";
currentHours = currentHours > 12 ? currentHours - 12 : currentHours;
currentHours = currentHours === 0 ? 12 : currentHours;
export default class Clock extends React.Component {
  render() {
    return (
      <Text>
        {currentHours} : {currentMinutes}
      </Text>
    );
  }
}
