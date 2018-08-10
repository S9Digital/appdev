import {
  SET_TIME_ATTEMPT,
  SET_TIME_SUCCESS,
  SET_TIME_ERROR,
  SET_ALARM_ATTEMPT,
  SET_ALARM_SUCCESS,
  SET_ALARM_ERROR,
  GET_ALARM_STATE_ATTEMPT,
  GET_ALARM_STATE_SUCCESS,
  GET_ALARM_STATE_ERROR,
  GET_NAP_STATE_ATTEMPT,
  GET_NAP_STATE_SUCCESS,
  GET_NAP_STATE_ERROR,
  GET_TIMER_STATE_ATTEMPT,
  GET_TIMER_STATE_SUCCESS,
  GET_TIMER_STATE_ERROR,
  GET_SCHEDULE_STATE_ATTEMPT,
  GET_SCHEDULE_STATE_SUCCESS,
  GET_SCHEDULE_STATE_ERROR,
  GET_ALARM_ATTEMPT,
  GET_ALARM_SUCCESS,
  GET_ALARM_ERROR
} from "./actions/TimeActions";
import {
  SET_SLEEP_SOUND_ATTEMPT,
  SET_SLEEP_SOUND_SUCCESS,
  SET_SLEEP_SOUND_ERROR,
  SET_SOUND_DURATION_ATTEMPT,
  SET_SOUND_DURATION_SUCCESS,
  SET_SOUND_DURATION_ERROR,
  SET_ALARM_DURATION_ATTEMPT,
  SET_ALARM_DURATION_SUCCESS,
  SET_ALARM_DURATION_ERROR,
  SET_SOUND_VOLUME_ATTEMPT,
  SET_SOUND_VOLUME_SUCCESS,
  SET_SOUND_VOLUME_ERROR
} from "./actions/SoundActions";
import {
  SET_LIGHT_TONE_ATTEMPT,
  SET_LIGHT_TONE_SUCCESS,
  SET_LIGHT_TONE_ERROR,
  SET_LIGHT_BRIGHTNESS_ATTEMPT,
  SET_LIGHT_BRIGHTNESS_SUCCESS,
  SET_LIGHT_BRIGHTNESS_ERROR,
  SET_LIGHT_PRESET_ATTEMPT,
  SET_LIGHT_PRESET_SUCCESS,
  SET_LIGHT_PRESET_ERROR,
  GET_LIGHT_STATE_ATTEMPT,
  GET_LIGHT_STATE_SUCCESS,
  GET_LIGHT_STATE_ERROR
} from "./actions/LightActions";
import Moment from "react-moment";
import moment from "moment";
import {
  WAKE_LOCK_ON,
  WAKE_LOCK_OFF,
  SCREEN_ON,
  SCREEN_OFF,
  MODAL_OPEN,
  RETURN_HOME
} from "./actions/SystemActions";

//
const DEFAULT_STATE = {
  wakeTime: null,
  sleepTime: null,
  alarmSet: false,
  alarmTriggered: false,
  alarmTime: null,
  alarmDuration: 9,
  alarmSoundId: "default",
  scenes: ["relax", "bedtime", "energize", "circadian"],
  scene: null,
  lightsNumber: 0,
  sleepSoundVolume: 50,
  sleepSoundDuration: 50,
  level: 20,
  cct: 70,
  preset: null,
  lightPower: false,
  lightSchedule: null,
  napEnd: null,
  napSound: false,
  timerEnd: null,
  timerLights: false,
  timerSound: false,
  modal: null,
  roomId: null,
  propertyId: null,
  userActions: [],
  latestError: null
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
  //TIME SECTION

  //if loading animation is needed for slow data calls
  //if (action.type === "SET_TIME_ATTEMPT") {}
  if (action.type === "SET_TIME_SUCCESS") {
    const hour = action.hour;
    const minutes = action.minutes;
    const timeOfDay = action.timeOfDay;
    const modal = action.modal;
    const momentTime = hour + ":" + minutes;
    if (modal === "wakeTime") {
      console.log(momentTime);
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
        alarmSet: true,
        userActions: [
          {
            action: action.type,
            time: new Date()
          },
          ...state.userActions
        ]
      };
    }
    if (modal === "snooze") {
      return {
        ...state,
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
  //error handling for UI changes
  //if (action.type === "SET_TIME_ERROR") {
  // return {...state, latestError: action.error}
  //}

  //if (action.type === "GET_ALARM_STATE_ATTEMPT") {}
  if (action.type === "GET_ALARM_STATE_SUCCESS") {
    return {
      alarmTime: action.alarmTime,
      alarmEnabled: action.alarmEnabled
    };
  }
  //if (action.type === "GET_ALARM_STATE_ERROR") {
  // return {...state, latestError: action.error}
  //}

  //if (action.type === "GET_NAP_STATE_ATTEMPT") {}
  if (action.type === "GET_NAP_STATE_SUCCESS") {
    return {
      napEndTime: action.napEndTime,
      napSound: action.napSound
    };
  }
  //if (action.type === "GET_NAP_STATE_ERROR") {
  // return {...state, latestError: action.error}
  //}

  //if (action.type === "GET_TIMER_STATE_ATTEMPT") {}
  if (action.type === "GET_TIMER_STATE_SUCCESS") {
    return {
      timerEndTime: action.timerEndTime,
      timerSound: action.timerSound,
      timerLights: action.timerLights
    };
  }
  //if (action.type === "GET_TIMER_STATE_ERROR") {
  // return {...state, latestError: action.error}
  //}

  //if (action.type === "GET_SCHEDULE_STATE_ATTEMPT") {}
  if (action.type === "GET_SCHEDULE_STATE_SUCCESS") {
    return {
      wakeTime: action.scheduleStartTime,
      sleepTime: action.scheduleEndTime
    };
  }
  //if (action.type === "GET_SCHEDULE_STATE_ERROR") {
  // return {...state, latestError: action.error}
  //}

  //LIGHT SECTION

  //if (action.type === "SET_LIGHT_TONE_ATTEMPT") {}
  if (action.type === "SET_LIGHT_TONE_SUCCESS") {
    return {
      ...state,
      cct: action.cct,
      userActions: [
        {
          action: action.type,
          time: new Date()
        },
        ...state.userActions
      ]
    };
  }
  //if (action.type === "SET_LIGHT_TONE_ERROR") {
  // return {...state, latestError: action.error}
  //}

  //if (action.type === "SET_LIGHT_BRIGHTNESS_ATTEMPT") {}
  if (action.type === "SET_LIGHT_BRIGHTNESS_SUCCESS") {
    return {
      ...state,
      level: action.level,
      userActions: [
        {
          action: action.type,
          time: new Date()
        },
        ...state.userActions
      ]
    };
  }

  //if (action.type === "SET_LIGHT_BRIGHTNESS_ERROR") {
  // return {...state, latestError: action.error}
  //}

  //if (action.type === "SET_LIGHT_PRESET_ATTEMPT") {}
  if (action.type === "SET_LIGHT_PRESET_SUCCESS") {
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
  //if (action.type === "SET_LIGHT_PRESET_ERROR") {
  // return {...state, latestError: action.error}
  //}

  //if (action.type === "GET_LIGHT_STATE_ATTEMPT") {}
  if (action.type === "GET_LIGHT_STATE_SUCCESS") {
    return {
      lightPower: action.power,
      level: action.level,
      cct: action.cct,
      lightSchedule: action.schedule
    };
  }
  //if (action.type === "GET_LIGHT_STATE_ERROR") {
  // return {...state, latestError: action.error}
  //}

  //SOUND SECTION
  //if (action.type === "SET_ALARM_DURATION_ATTEMPT") {}
  if (action.type == "SET_ALARM_DURATION_SUCCESS") {
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
  //if (action.type === "SET_ALARM_DURATION_ERROR") {
  // return {...state, latestError: action.error}
  //}

  //if (action.type === "SET_SLEEP_SOUND_ATTEMPT") {}
  if (action.type === "SET_SLEEP_SOUND_SUCCESS") {
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
  //if (action.type === "SET_SLEEP_SOUND_ERROR") {
  // return {...state, latestError: action.error}
  //}

  //if (action.type === "SET_SOUND_VOLUME_ATTEMPT") {}
  if (action.type == "SET_SOUND_VOLUME_SUCCESS") {
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
  //if (action.type === "SET_SOUND_VOLUME_ERROR") {
  // return {...state, latestError: action.error}
  //}

  //if (action.type === "SET_SOUND_DURATION_ATTEMPT") {}
  if (action.type == "SET_SOUND_DURATION_SUCCESS") {
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
  //if (action.type === "SET_SOUND_DURATION_ERROR") {
  // return {...state, latestError: action.error}
  //}
  return state;
}
