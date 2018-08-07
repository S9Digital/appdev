export const SET_TIME = "SET_TIME";
export const setTime = (hour, mins, timeOfDay, modal) => dispatch => {
  dispatch({
    type: SET_TIME,
    hour: hour,
    minutes: mins,
    modal: modal,
    timeOfDay: timeOfDay
  });
};

export const GET_ALARM_STATE_SUCCESS = "GET_ALARM_STATE_SUCCESS";
export const GET_ALARM_STATE_ERROR = "GET_ALARM_STATE_ERROR";
export const getAlarmState = (roomId, propertyId) => dispatch => {
  fetch(
    `https://backend.ario.light/property/${propertyId}/room/${roomId}/alarm/`
  )
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: GET_ALARM_STATE_SUCCESS,
        Alarmtime: data.time,
        AlarmEnabled: data.enabled
      });
    })
    .catch(err => {
      dispatch({ type: GET_ALARM_STATE_ERROR, err });
    });
};

export const GET_NAP_STATE_SUCCESS = "GET_NAP_STATE_SUCCESS";
export const GET_NAP_STATE_ERROR = "GET_NAP_STATE_ERROR";
export const getNapState = (roomId, propertyId) => dispatch => {
  fetch(`https://backend.ario.light/property/${propertyId}/room/${roomId}/nap/`)
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: GET_NAP_STATE_SUCCESS,
        napEndTime: data.endTime,
        napSound: data.withSound
      });
    })
    .catch(err => {
      dispatch({ type: GET_NAP_STATE_ERROR, err });
    });
};

export const GET_TIMER_STATE_SUCCESS = "GET_TIMER_STATE_SUCCESS";
export const GET_TIMER_STATE_ERROR = "GET_TIMER_STATE_ERROR";
export const getTimerState = (roomId, propertyId) => dispatch => {
  fetch(
    `https://backend.ario.light/property/${propertyId}/room/${roomId}/timer/`
  )
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: GET_TIMER_STATE_SUCCESS,
        timerEndTime: data.endTime,
        timerSound: data.withSound,
        timerLights: data.withLights
      });
    })
    .catch(err => {
      dispatch({ type: GET_TIMER_STATE_ERROR, err });
    });
};

export const GET_SCHEDULE_STATE_SUCCESS = "GET_SCHEDULE_STATE_SUCCESS";
export const GET_SCHEDULE_STATE_ERROR = "GET_SCHEDULE_STATE_ERROR";
export const getScheduleState = (roomId, propertyId) => dispatch => {
  fetch(
    `https://backend.ario.light/property/${propertyId}/room/${roomId}/timer/`
  )
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: GET_SCHEDULE_STATE_SUCCESS,
        scheduleStartTime: data.startTime,
        scheduleEndTime: data.endTime
      });
    })
    .catch(err => {
      dispatch({ type: GET_SCHEDULE_STATE_ERROR, err });
    });
};
