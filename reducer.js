import {
  SET_ALARM_TIME,
  SET_SLEEP_TIME,
  SET_WAKE_TIME
} from "./actions/TimeActions";

const DEFAULT_STATE = {
  wakeTime: 0,
  sleepTime: 0,
  alarm: false,
  alarmTime: 0,
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
  timerSound: false
};

//will need to handle errors from light API
export default function reducer(state = DEFAULT_STATE, action) {
  //navigation
  //time
  if (action.type === "SET_ALARM_TIME") {
    return { ...state, alarmTime: action.time };
  }
  if (action.type === "SET_SLEEP_TIME") {
    return { ...state, sleepTime: action.time };
  }
  if (action.type === "SET_WAKE_TIME") {
    return { ...state, wakeTime: action.time };
  }
  return state;
}
