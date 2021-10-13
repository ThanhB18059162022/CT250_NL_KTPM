import { faPaperPlane, faReply, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AdminButton } from "../../../Controls"
import { useState } from "react"
import Notifications from "../../../../common/Notifications"
import "../Admin.Style.scss"

const ReplyFeedback = (props) => {
    const { setRep } = props
    const CusStyle = {
        margin: "0 0 0 40%"
    }

    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type: "INFORMATION", //CONFIRMATION, INFORMATION
        title: "", // title of the notifications
        content: "", // content of the notify
        infoType: ""
    })

    const notifyFeedbackReplied = () => {
        setNotify({
            ...notify,
            title: "Thông báo",
            content: "Đã phản hồi bình luận",
            infoType: 'SUCCESS'
        })
        setShow(true)
    }

    return (
        <>
            <div className="ReplyFeedback">
                <div className="ReplyFeedbackBorder">
                    <h2>Phản hồi đánh giá</h2>
                    <div className="ReplyFeedback_User">
                        <FontAwesomeIcon icon={faReply} />
                        <span>Test user</span>
                        <textarea className="textarea1" rows="4" disabled></textarea>
                        <p>Nội dung phản hồi:</p>
                        <textarea className="textarea2" rows="5"></textarea>
                    </div>
                    <div className="FeedbackBehavior">
                        <AdminButton ClickEvent={notifyFeedbackReplied} IconName={faPaperPlane} />
                        <AdminButton ClickEvent={() => setRep(0)} IconName={faWindowClose} />
                    </div>
                </div>
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    )
}

export default ReplyFeedback