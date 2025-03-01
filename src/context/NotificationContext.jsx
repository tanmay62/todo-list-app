import { createContext, useState } from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  return (
    <NotificationContext.Provider value={{ message, setNotification: setMessage }}>
      {children}
      {message && <div className="notification">{message}</div>}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;