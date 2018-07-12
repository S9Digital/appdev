export const SET_SLEEP_SOUND = "SET_SLEEP_SOUND";
export const setSleepSound = sound => dispatch => {
  dispatch({ type: SET_SLEEP_SOUND, sound: sound });
};
