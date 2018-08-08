// import { DeviceEventEmitter } from "react-native";
// import * as NativeWakeLock from "react-native-android-wakelock";
// import * as NativeAccelerometer from "react-native-android-accelerometer";

// export default class System {
//   constructor() {
//     if (System._instance) {
//       throw new Error(
//         "Instantiation failed: Use System.getInstance() instead of new."
//       );
//     }
//     // this._screenOn = false;
//     // this._haveWakeLock = false;
//     System._instance = this;
//     this.accelerometerListener();
//   }
//   static getInstance = () => {
//     return System._instance;
//   };

//   getWakeLock = async screenOn => {
//     // if (this._haveWakelock) {
//     //   console.log("wakelock true");
//     //   return;
//     // }
//     try {
//       await NativeWakeLock.acquireWakeLock(screenOn);
//       console.log(screenOn + " wakelock");
//     } catch (ex) {
//       throw new Error("Unable to get wakelock " + ex.message);
//     }
//     // this._haveWakelock = true;
//     // this._screenOn = screenOn;
//   };

//   releaseWakeLock = async () => {
//     if (!this._haveWakelock) {
//       console.log("wakelock false");
//       return;
//     }
//     try {
//       await NativeWakeLock.releaseWakeLock();
//       console.log("release-wakelock");
//     } catch (ex) {
//       console.log(ex);
//       throw new Error("Unable to release wakelock " + ex.message);
//     }
//     // this._haveWakelock = false;
//     // this._screenOn = false;
//   };

//   accelerometerListener = () => {
//     NativeAccelerometer.setThreshold(2);
//     DeviceEventEmitter.addListener("accelerometerUpdate", async e => {
//       if (!this._screenOn) {
//         await this.getWakeLock(true);
//         await this.getWakeLock(false);
//         console.log("accelerometer triggered");
//       }
//     });
//   };
// }
// new System();
