import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const useNotification = () => {
  const dispatch = useNotificationDispatch();

  const setNotification = (message, duration = 5000) => {
    dispatch({ type: "SET_NOTIFICATION", payload: message });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, duration);
  };

  return setNotification;
};

export default NotificationContext;
