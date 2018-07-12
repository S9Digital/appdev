import { SET_TIME, MODAL_OPEN, RETURN_HOME } from "./actions/TimeActions";
import { SET_SLEEP_SOUND } from "./actions/SoundActions";
import Moment from "react-moment";

const DEFAULT_STATE = {
  wakeTime: null,
  sleepTime: null,
  alarm: false,
  alarmTime: null,
  alarmDuration: 0,
  alarmSoundId: "default",
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
    console.log(str);
    //Moment(str, "HH:mm")
    if (modal === "wakeTime") {
      return { ...state, wakeTime: str };
    }
    if (modal === "sleepTime") {
      return { ...state, sleepTime: str };
    }
    if (modal === "alarmTime") {
      return { ...state, alarmTime: str, alarm: true };
    }
  }
  //sound
  if (action.type === "SET_SLEEP_SOUND") {
    console.log(action.sound);
    return { ...state, alarmSoundId: action.sound };
  }
  return state;
}
