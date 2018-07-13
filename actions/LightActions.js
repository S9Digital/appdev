export const SET_LIGHT_TONE = "SET_LIGHT_TONE";
export const lightTone = tone => dispatch => {
  dispatch({ type: SET_LIGHT_TONE, tone: tone });
};

export const SET_LIGHT_BRIGHTNESS = "SET_LIGHT_BRIGHTNESS";
export const lightBrightness = brightness => dispatch => {
  dispatch({ type: SET_LIGHT_BRIGHTNESS, brightness: brightness });
};
