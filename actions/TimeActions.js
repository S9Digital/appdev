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

export const MODAL_OPEN = "MODAL_OPEN";
export const modalOpen = component => dispatch => {
  dispatch({ type: MODAL_OPEN, component: component });
};

export const RETURN_HOME = "RETURN_HOME";
export const returnHome = () => dispatch => {
  dispatch({ type: RETURN_HOME });
};
