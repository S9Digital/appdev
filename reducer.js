import { SET_TIME, MODAL_OPEN, RETURN_HOME } from "./actions/TimeActions";
import Moment from "react-moment";

const DEFAULT_STATE = {
  wakeTime: null,
  sleepTime: null,
  alarm: false,
  alarmTime: null,
  alarmDuration: 0,
  alarmSoundId: "",
  scene: "",
  lightsNumber: 0,
  lightsLevel: 0,
  lightsPower: false,
  napEnd: 0,
  napSound: false,
  timerEnd: 0,
  timerLights: false,
  timerSound: false,
  modal: null
};

//will need to handle errors from light API
export default function reducer(state = DEFAULT_STATE, action) {
  //navigation
  if (action.type === "MODAL_OPEN") {
    return { ...state, modal: action.component };
  }
  if (action.type === "RETURN_HOME") {
    return { ...state, modal: null };
  }
  //time
  if (action.type === "SET_TIME") {
    const hour = action.hour;
    const minutes = action.minutes;
    const modal = action.modal;
    const str = hour.concat(":").concat(minutes);
    // console.log(str);
    //Moment(str, "HH:mm")
    if (modal === "wakeTime") {
      console.log("wakeTime");
      return { ...state, wakeTime: str };
    }
    if (modal === "sleepTime") {
      console.log("sleepTime");
      return { ...state, sleepTime: str };
    }
    if (modal === "alarmTime") {
      return { ...state, alarmTime: str, alarm: true };
    }
  }
  return state;
}
