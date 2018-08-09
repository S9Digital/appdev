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
import moment from "moment";
import {
  WAKE_LOCK_ON,
  WAKE_LOCK_OFF,
  SCREEN_ON,
  SCREEN_OFF
} from "./actions/SystemActions";

//
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
  modal: null,
  userActions: []
};

//will need to handle errors from light API, Ario is still getting us the event
export default function reducer(state = DEFAULT_STATE, action) {
  //navigation
  if (action.type === "MODAL_OPEN") {
    const component = action.component;
    return {
      ...state,
      modal: component,
      userActions: [
        {
          action: component,
          time: new Date()
        },
        ...state.userActions
      ]
    };
  }
  if (action.type === "RETURN_HOME") {
    return {
      ...state,
      modal: null,
      userActions: [
        {
          action: action.type,
          time: new Date()
        },
        ...state.userActions
      ]
    };
  }
  //time
  if (action.type === "SET_TIME") {
    const hour = action.hour;
    const minutes = action.minutes;
    const timeOfDay = action.timeOfDay;
    const modal = action.modal;
    const momentTime = hour + ":" + minutes;
    if (modal === "wakeTime") {
      return {
        ...state,
        wakeTime: momentTime,
        userActions: [
          {
            action: action.type,
            time: new Date()
          },
          ...state.userActions
        ]
      };
    }
    if (modal === "sleepTime") {
      return {
        ...state,
        sleepTime: momentTime,
        userActions: [
          {
            action: action.type,
            time: new Date()
          },
          ...state.userActions
        ]
      };
    }
    if (modal === "alarmTime") {
      return {
        ...state,
        alarmTime: momentTime,
        alarm: true,
        userActions: [
          {
            action: action.type,
            time: new Date()
          },
          ...state.userActions
        ]
      };
    }
  }
  //light
  if (action.type === "SET_LIGHT_TONE") {
    return {
      ...state,
      lightTone: action.tone,
      userActions: [
        {
          action: action.type,
          time: new Date()
        },
        ...state.userActions
      ]
    };
  }
  if (action.type === "SET_LIGHT_BRIGHTNESS") {
    return {
      ...state,
      lightBrightness: action.brightness,
      userActions: [
        {
          action: action.type,
          time: new Date()
        },
        ...state.userActions
      ]
    };
  }
  if (action.type === "SET_LIGHT_PRESET") {
    return {
      ...state,
      scene: action.preset,
      userActions: [
        {
          action: action.type,
          time: new Date()
        },
        ...state.userActions
      ]
    };
  }
  //sound
  if (action.type == "SET_ALARM_DURATION") {
    return {
      ...state,
      alarmDuration: action.duration,
      userActions: [
        {
          action: action.type,
          time: new Date()
        },
        ...state.userActions
      ]
    };
  }
  if (action.type === "SET_SLEEP_SOUND") {
    return {
      ...state,
      alarmSoundId: action.sound,
      userActions: [
        {
          action: action.type,
          time: new Date()
        },
        ...state.userActions
      ]
    };
  }
  if (action.type == "SET_SOUND_VOLUME") {
    return {
      ...state,
      sleepSoundVolume: action.volume,
      userActions: [
        {
          action: action.type,
          time: new Date()
        },
        ...state.userActions
      ]
    };
  }
  if (action.type == "SET_SOUND_DURATION") {
    return {
      ...state,
      sleepSoundDuration: action.duration,
      userActions: [
        {
          action: action.type,
          time: new Date()
        },
        ...state.userActions
      ]
    };
  }
  return state;
}
