// export const SET_ALARM_TIME = "SET_ALARM_TIME";
// export const setAlarmTime = (hour, mins) => dispatch => {
//   dispatch({ type: SET_ALARM_TIME, hour: hour, minutes: mins });
// };

// export const SET_SLEEP_TIME = "SET_SLEEP_TIME";
// export const setSleepTime = (hour, mins) => dispatch => {
//   dispatch({ type: SET_SLEEP_TIME });
// };

// export const SET_WAKE_TIME = "SET_WAKE_TIME";
// export const setWakeTime = (hour, mins) => dispatch => {
//   dispatch({ type: SET_WAKE_TIME });
// };

export const SET_TIME = "SET_TIME";
export const setTime = (hour, mins, modal) => dispatch => {
  dispatch({ type: SET_TIME, hour: hour, minutes: mins, modal: modal });
};

export const MODAL_OPEN = "MODAL_OPEN";
export const modalOpen = component => dispatch => {
  dispatch({ type: MODAL_OPEN, component: component });
};

export const RETURN_HOME = "RETURN_HOME";
export const returnHome = () => dispatch => {
  dispatch({ type: RETURN_HOME });
};
