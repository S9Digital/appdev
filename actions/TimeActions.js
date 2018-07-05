export const SET_ALARM_TIME = "SET_ALARM_TIME";
export const setAlarmTime = time => dispatch => {
  dispatch({ type: SET_ALARM_TIME });
};

export const SET_SLEEP_TIME = "SET_SLEEP_TIME";
export const setSleepTime = time => dispatch => {
  dispatch({ type: SET_ALARM });
};

export const SET_WAKE_TIME = "SET_WAKE_TIME";
export const setWakeTime = time => dispatch => {
  dispatch({ type: SET_WAKE_TIME });
};
