export const SET_LIGHT_TONE = "SET_LIGHT_TONE";
export const lightTone = tone => dispatch => {
  //insert native interface here
  dispatch({ type: SET_LIGHT_TONE, tone: tone });
};

export const SET_LIGHT_BRIGHTNESS = "SET_LIGHT_BRIGHTNESS";
export const lightBrightness = brightness => dispatch => {
  //insert native interface here
  dispatch({ type: SET_LIGHT_BRIGHTNESS, brightness: brightness });
};

export const SET_LIGHT_PRESET = "SET_LIGHT_PRESET";
export const lightPreset = preset => dispatch => {
  //insert native interface here
  dispatch({ type: SET_LIGHT_PRESET, preset: preset });
};

export const GET_LIGHT_STATE_SUCCESS = "GET_LIGHT_STATE_SUCCESS";
export const GET_LIGHT_STATE_ERROR = "GET_LIGHT_STATE_ERROR";
export const getLightState = (roomId, propertyId) => dispatch => {
  fetch(
    `https://backend.ario.light/property/${propertyId}/room/${roomId}/lights/${lightId}/`
  )
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: GET_LIGHT_STATE_SUCCESS,
        power: data.power,
        lightLevel: data.lightLevel,
        cct: data.cct,
        schedule: data.schedule
      });
    })
    .catch(err => {
      dispatch({ type: GET_LIGHT_STATE_ERROR, err });
    });
};

//{ sceneId: string } getScene()
