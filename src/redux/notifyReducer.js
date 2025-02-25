const initialState = { message: "", type: "" };

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return { message: action.payload.message, type: action.payload.type };
    case "CLEAR_NOTIFICATION":
      return { message: "", type: "" };
    default:
      return state;
  }
};

// Action creators
export const showNotification = (message, type) => ({
  type: "SHOW_NOTIFICATION",
  payload: { message, type },
});
export const clearNotification = () => ({ type: "CLEAR_NOTIFICATION" });

export default notifyReducer;