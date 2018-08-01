import React from "react";
import { DeviceEventEmitter } from "react-native";
import { connect } from "react-redux";
import * as NativeWakeLock from "react-native-android-wakelock";
import * as NativeAccelerometer from "react-native-android-accelerometer";

class System extends React.Component {
  _instance: System = new System();

  constructor(props) {
    super(props);
    this.state = {};
  }
  //   if (System._instance) {
  //     throw new Error(
  //       "Instantiation failed: Use System.getInstance() instead of new."
  //     );
  //   }
  //   System._instance = this.bind();
  //   this.accelerometerListener();

  static getInstance = (): System => {
    if (!System._instance) {
      new System();
    }
    return System._instance;
  };

  getWakeLock = async screenOn => {
    if (this._haveWakelock) {
      return;
    }
    try {
      await NativeWakeLock.acquireWakeLock(screenOn);
    } catch (ex) {
      throw new Error("Unable to get wakelock " + ex.message);
    }
    this._haveWakelock = true;
    this._screenOn = screenOn;
  };

  releaseWakeLock = async () => {
    if (!this._haveWakelock) {
      return;
    }
    try {
      await NativeWakeLock.releaseWakeLock();
    } catch (ex) {
      throw new Error("Unable to release wakelock " + ex.message);
    }
    this._haveWakelock = false;
    this._screenOn = false;
  };

  accelerometerListener = () => {
    NativeAccelerometer.setThreshold(1.5);
    DeviceEventEmitter.addListener("accelerometerUpdate", e => {
      if (!this._screenOn) {
        this.getWakeLock(true);
        this.releaseWakeLock();
      }
    });
  };
}
const mapStateToProps = (state, props) => ({
  _instance: state.instance,
  _haveWakeLock: state.haveWakeLock,
  _screenOn: state.screenOn
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(System);
