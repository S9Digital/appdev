export const WAKE_LOCK_ON = "WAKE_LOCK_ON";
export const wakeLockOn = component => dispatch => {
  dispatch({ type: WAKE_LOCK_ON, component: component });
};

export const WAKE_LOCK_OFF = "WAKE_LOCK_OFF";
export const wakeLockOff = component => dispatch => {
  dispatch({ type: WAKE_LOCK_OFF, component: component });
};

export const SCREEN_ON = "SCREEN_ON";
export const screenOn = component => dispatch => {
  dispatch({ type: SCREEN_ON, component: component });
};

export const SCREEN_OFF = "SCREEN_OFF";
export const screenOff = component => dispatch => {
  dispatch({ type: SCREEN_OFF, component: component });
};
