export const SET_SLEEP_SOUND = "SET_SLEEP_SOUND";
export const setSleepSound = sound => dispatch => {
  dispatch({ type: SET_SLEEP_SOUND, sound: sound });
};

export const SET_ALARM_DURATION = "SET_ALARM_DURATION";
export const alarmDuration = duration => dispatch => {
  dispatch({ type: SET_ALARM_DURATION, duration: duration });
};
