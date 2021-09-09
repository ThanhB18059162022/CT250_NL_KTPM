import { useCallback, useEffect } from "react";
import React from "react";
import "./NotificationStyle.scss";
const Notifications = ({
    type = "CONFIRMATION", //CONFIRMARTION, INFORMATION
    title = "", // title of the notifications
    content = "", // content of the notify
    handle = null, // callback for comfirm notify
    duration = 5000, // duration of info notify
    isShow = false,
    onHideRequest = null,
    infoType = "SUCCESS"
}) => {
    return (
        <>
            {type === "CONFIRMATION" ? (
                <Confirm
                    title={title}
                    content={content}
                    handle={handle}
                    isShow={isShow}
                    onHideRequest={onHideRequest}
                />
            ) : (
                <Information
                    title={title}
                    content={content}
                    duration={duration}
                    isShow={isShow}
                    onHideRequest={onHideRequest}
                    infoType={infoType}
                />
            )}
        </>
    );
};

export default React.memo(Notifications)

const Confirm = (props) => {
    const { title, content, handle, isShow, onHideRequest } = props;

    const hideHandle = () => onHideRequest !== null && onHideRequest(false);

    const handleRequest = () => {
        hideHandle();
        handle !== null && handle();
    };

    return (
        <div className={`Notifications notify_confirm ${isShow ? "show" : ""}`}>
            <div className="notify_image">
                <img src="notify/confirm.png" alt="question" />
            </div>
            <div className="notify_content">
                <p>{title}</p>
                <p>{content}</p>
            </div>
            <div className="notify_behavior">
                <button onClick={handleRequest}>Xác nhận</button>
                <button onClick={hideHandle}>Hủy</button>
            </div>
        </div>
    );
};

const Information = (props) => {
    const { title, content, isShow, onHideRequest, infoType, duration } = props;

    const callback = useCallback(() => onHideRequest !== null && onHideRequest(false), [onHideRequest])

    const getImage = () => {
        switch (infoType) {
            case "WARN":
                return <img src="notify/warn.png" alt="warn" />;
            case "ERROR":
                return <img src="notify/error.png" alt="error" />;
            case "SUCCESS":
                return <img src="notify/success.png" alt="success" />;
            default:
                return <img src="notify/info.png" alt="info" />;
        }
    };



    useEffect(() => {
        let timeout = setTimeout(callback, duration);
        return () => clearTimeout(timeout);
    }, [isShow, duration, callback]);

    return (
        <div className={`Notifications notify_information ${isShow ? "show" : ""}`} onClick={callback} >
            <div className="notify_image">{getImage()}</div>
            <div className="notify_content">
                <p>{title}</p>
                <p>{content}</p>
            </div>
        </div>
    );
};
