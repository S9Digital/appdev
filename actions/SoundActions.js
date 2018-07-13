export const SET_SLEEP_SOUND = "SET_SLEEP_SOUND";
export const setSleepSound = sound => dispatch => {
  dispatch({ type: SET_SLEEP_SOUND, sound: sound });
};

export const SET_ALARM_DURATION = "SET_ALARM_DURATION";
export const alarmDuration = duration => dispatch => {
  dispatch({ type: SET_ALARM_DURATION, duration: duration });
};

export const SET_SOUND_VOLUME = "SET_SOUND_VOLUME";
export const soundVolume = volume => dispatch => {
  dispatch({ type: SET_SOUND_VOLUME, volume: volume });
};

export const SET_SOUND_DURATION = "SET_SOUND_DURATION";
export const soundDuration = duration => dispatch => {
  dispatch({ type: SET_SOUND_DURATION, duration: duration });
};
