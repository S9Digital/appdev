import React from "react";
import styled from "styled-components";
import { color } from "../StyleVariables";
import { WheelPicker } from "react-native-wheel-picker-android";

const WheelContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
`;

const separationDistance = 80;

const Wheel = styled(WheelPicker)`
  flex-grow: 1;
  ${props => props.label && `margin-left: -${separationDistance}px;`};
`;

const WheelLabel = styled.Text`
  color: ${color.universalWhite};
  align-self: center;
  left: 90px;
  position: absolute;
  margin-right: ${separationDistance}px;
`;

export const scrollerTextSize = 55;

export default class ClockScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 3,
      time: this.props.data.slice(0, 3),
      page: 0
    };
  }

  static defaultProps = {
    wheelProps: {}
  };

  render() {
    // todo: this is O(n) inefficient and easily cacheable
    let selectedItemPosition = null;
    for (let i = 0; i < this.props.data.length; i += 1) {
      if (this.props.data[i].key === this.props.value) {
        selectedItemPosition = i;
        break;
      }
    }
    return (
      <WheelContainer {...this.props}>
        <Wheel
          isCyclic
          isCurved
          data={this.props.data.map(node => node.key)}
          itemTextSize={scrollerTextSize}
          visibleItemCount={5}
          isAtmospheric={true}
          itemTextColor={color.universalWhite}
          label={this.props.label}
          onItemSelected={({ position }) => {
            this.props.onSelect(this.props.data[position].key);
          }}
          {...this.props.wheelProps}
          selectedItemPosition={selectedItemPosition}
        />
        {this.props.label && <WheelLabel>{this.props.label}</WheelLabel>}
        {this.props.children}
      </WheelContainer>
    );
  }
}
