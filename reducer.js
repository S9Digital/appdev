import { SET_TIME, MODAL_OPEN, RETURN_HOME } from "./actions/TimeActions";
import {
  SET_SLEEP_SOUND,
  SET_ALARM_DURATION,
  SET_SOUND_VOLUME,
  SET_SOUND_DURATION
} from "./actions/SoundActions";
import {
  SET_LIGHT_TONE,
  SET_LIGHT_BRIGHTNESS,
  SET_LIGHT_PRESET
} from "./actions/LightActions";
import Moment from "react-moment";

const DEFAULT_STATE = {
  wakeTime: null,
  sleepTime: null,
  alarm: false,
  alarmTime: null,
  alarmDuration: 60,
  alarmSoundId: "default",
  scenes: ["relax", "bedtime", "energize", "circadian"],
  scene: null,
  lightsNumber: 0,
  sleepSoundVolume: 50,
  sleepSoundDuration: 50,
  lightBrightness: 20,
  lightTone: 70,
  lightsPower: false,
  napEnd: 0,
  napSound: false,
  timerEnd: 0,
  timerLights: false,
  timerSound: false,
  modal: null
};

//tracking to be added
//modalEntry: {enter: 0, leave: 0, duration: 0, modalType: '',  }
//landing: {enter: 0, leave: 0, duration: 0, firstButtonClicked: ''}

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
    const momentArray = [];
    momentArray.push(hour);
    momentArray.push(minutes);
    //Moment(str, "HH:mm")
    if (modal === "wakeTime") {
      console.log(momentArray);
      return { ...state, wakeTime: momentArray };
    }
    if (modal === "sleepTime") {
      return { ...state, sleepTime: str };
    }
    if (modal === "alarmTime") {
      return { ...state, alarmTime: str, alarm: true };
    }
  }
  //light
  if (action.type === "SET_LIGHT_TONE") {
    return { ...state, lightTone: action.tone };
  }
  if (action.type === "SET_LIGHT_BRIGHTNESS") {
    return { ...state, lightBrightness: action.brightness };
  }
  if (action.type === "SET_LIGHT_PRESET") {
    return { ...state, scene: action.preset };
  }
  //sound
  if (action.type == "SET_ALARM_DURATION") {
    return { ...state, alarmDuration: action.duration };
  }
  if (action.type === "SET_SLEEP_SOUND") {
    return { ...state, alarmSoundId: action.sound };
  }
  if (action.type == "SET_SOUND_VOLUME") {
    return { ...state, sleepSoundVolume: action.volume };
  }
  if (action.type == "SET_SOUND_DURATION") {
    return { ...state, sleepSoundDuration: action.duration };
  }
  return state;
}
