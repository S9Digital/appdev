export const SET_LIGHT_TONE_ATTEMPT = "SET_LIGHT_TONE_ATTEMPT";
export const SET_LIGHT_TONE_SUCCESS = "SET_LIGHT_TONE_SUCCESS";
export const SET_LIGHT_TONE_ERROR = "SET_LIGHT_TONE_ERROR";
export const lightTone = cct => dispatch => {
  dispatch({ type: SET_LIGHT_TONE_ATTEMPT });
  //insert native library query here
  dispatch({ type: SET_LIGHT_TONE_SUCCESS, cct: cct });
  //.catch(error => {
  // dispatch({type: SET_LIGHT_TONE_ERROR, error: error})
  //})
};
export const SET_LIGHT_BRIGHTNESS_ATTEMPT = "SET_LIGHT_BRIGHTNESS_ATTEMPT";
export const SET_LIGHT_BRIGHTNESS_SUCCESS = "SET_LIGHT_BRIGHTNESS_SUCCESS";
export const SET_LIGHT_BRIGHTNESS_ERROR = "SET_LIGHT_BRIGHTNESS_ERROR";
export const lightBrightness = level => dispatch => {
  dispatch({ type: SET_LIGHT_BRIGHTNESS_ATTEMPT });
  //insert native library query here
  dispatch({ type: SET_LIGHT_BRIGHTNESS_SUCCESS, level: level });
  //.catch(error => {
  // dispatch({type: SET_LIGHT_BRIGHTNESS_ERROR, error: error})
  //})
};
export const SET_LIGHT_PRESET_ATTEMPT = "SET_LIGHT_PRESET_ATTEMPT";
export const SET_LIGHT_PRESET_SUCCESS = "SET_LIGHT_PRESET_SUCCESS";
export const SET_LIGHT_PRESET_ERROR = "SET_LIGHT_PRESET_ERROR";
export const lightPreset = preset => dispatch => {
  dispatch({ type: SET_LIGHT_PRESET_ATTEMPT });
  //insert native library query here
  dispatch({ type: SET_LIGHT_PRESET_SUCCESS, preset: preset });
  //.catch(error => {
  // dispatch({type: SET_LIGHT_PRESET_ERROR, error: error})
  //})
};

export const GET_LIGHT_STATE_ATTEMPT = "GET_LIGHT_STATE_ATTEMPT";
export const GET_LIGHT_STATE_SUCCESS = "GET_LIGHT_STATE_SUCCESS";
export const GET_LIGHT_STATE_ERROR = "GET_LIGHT_STATE_ERROR";
export const getLightState = (roomId, propertyId) => dispatch => {
  dispatch({ type: GET_LIGHT_STATE_ATTEMPT });
  //need actual url from ARIO
  fetch(
    `https://backend.ario.light/property/${propertyId}/room/${roomId}/lights/`
  )
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: GET_LIGHT_STATE_SUCCESS,
        power: data.power,
        lightLevel: data.level,
        cct: data.cct,
        schedule: data.schedule
      });
    })
    .catch(error => {
      dispatch({ type: GET_LIGHT_STATE_ERROR, error: error });
    });
};
