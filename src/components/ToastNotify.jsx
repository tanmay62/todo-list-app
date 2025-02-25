import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../redux/notifyReducer";

const ToastNotify = () => {
    const notification = useSelector((state) => state.notifications);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (notification.message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                dispatch(clearNotification());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification, dispatch]);

    if (!notification.message) return null;

    return (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
            <div className={`toast show ${show ? "fade" : ""}`} role="alert">
                <div className={`toast-header bg-${notification.type} text-white`}>
                    <strong className="me-auto">
                        {notification.type === "success" && (
                            <i className="bi bi-check-circle-fill me-2"></i>
                        )}
                        {notification.type === "danger" && (
                            <i className="bi bi-x-circle-fill me-2"></i>
                        )}
                        {notification.type === "warning" && (
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        )}
                        {notification.type === "info" && (
                            <i className="bi bi-info-circle-fill me-2"></i>
                        )}
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </strong>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={() => setShow(false)}
                    ></button>
                </div>
                <div className="toast-body">{notification.message}</div>
            </div>
        </div>
    );
};

export default ToastNotify;
