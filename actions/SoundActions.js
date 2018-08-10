

export const SET_SLEEP_SOUND_ATTEMPT = "SET_SLEEP_SOUND_ATTEMPT";
export const SET_SLEEP_SOUND_SUCCESS = "SET_SLEEP_SOUND_SUCCESS";
export const SET_SLEEP_SOUND_ERROR = "SET_SLEEP_SOUND_ERROR";
export const setSleepSound = sound => dispatch => {
  dispatch({ type: SET_SLEEP_SOUND_ATTEMPT });
  //insert native library query here
  dispatch({ type: SET_SLEEP_SOUND_SUCCESS, sound: sound });
  //.catch(error => {
  // dispatch({type: SET_SLEEP_SOUND_ERROR, error: error})
  //})
};
export const SET_SOUND_DURATION_ATTEMPT = "SET_SOUND_DURATION_ATTEMPT";
export const SET_SOUND_DURATION_SUCCESS = "SET_SOUND_DURATION_SUCCESS";
export const SET_ALARM_DURATION_ERROR = "SET_SOUND_DURATION_ERROR";
export const setSoundDuration = duration => dispatch => {
  dispatch({ type: SET_SOUND_DURATION_ATTEMPT });
  //insert native library query here
  dispatch({ type: SET_SOUND_DURATION_SUCCESS, duration: duration });
  //.catch(error => {
  // dispatch({type: SET_SOUND_DURATION_ERROR, error: error})
  //})
};

export const SET_ALARM_DURATION_ATTEMPT = "SET_ALARM_DURATION_ATTEMPT";
export const SET_ALARM_DURATION_SUCCESS = "SET_ALARM_DURATION_SUCCESS";
export const SET_ALARM_DURATION_ERROR = "SET_ALARM_DURATION_ERROR";
export const setAlarmDuration = duration => dispatch => {
  dispatch({ type: SET_ALARM_DURATION_ATTEMPT });
  //insert native library query here
  dispatch({ type: SET_ALARM_DURATION_SUCCESS, duration: duration });
  //.catch(error => {
  // dispatch({type: SET_ALARM_DURATION_ERROR, error: error})
  //})
};
export const SET_SOUND_VOLUME_ATTEMPT = "SET_SOUND_VOLUME_ATTEMPT";
export const SET_SOUND_VOLUME_SUCCESS = "SET_SOUND_VOLUME_SUCCESS";
export const SET_SOUND_VOLUME_ERROR = "SET_SOUND_VOLUME_ERROR";
export const setSoundVolume = preset => dispatch => {
  dispatch({ type: SET_SOUND_VOLUME_ATTEMPT });
  //insert native library query here
  dispatch({ type: SET_SOUND_VOLUME_SUCCESS, preset: preset });
  //.catch(error => {
  // dispatch({type: SET_SOUND_VOLUME_ERROR, error: error})
  //})
};

