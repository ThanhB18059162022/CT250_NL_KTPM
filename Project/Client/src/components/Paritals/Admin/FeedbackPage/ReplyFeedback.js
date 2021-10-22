import { faPaperPlane, faReply, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AdminButton } from "../../../Controls"
import { useState } from "react"
import Notifications from "../../../../common/Notifications"
import "../Admin.Style.scss"
import ApiCaller from "../../../../api_services/ApiCaller"
import { useEffect } from "react/cjs/react.development"

const ReplyFeedback = (props) => {
    const { setRep, feedbackInfo, currentAdNo, setReplies, setModifyFbList } = props

    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type: "INFORMATION", //CONFIRMATION, INFORMATION
        title: "", // title of the notifications
        content: "", // content of the notify
        infoType: ""
    })
    //thông báo phản hồi thành công
    const notifyFeedbackReplied = () => {
        setNotify({
            ...notify,
            title: "Thông báo",
            content: "Đã phản hồi bình luận",
            infoType: 'SUCCESS'
        })
        setShow(true)
    }
    //lấy thông tin admin phản hồi
    const [modName, setModName] = useState()
    useEffect(()=>{
        (async()=>{
            const caller = new ApiCaller()
            const data = await caller.get("moderators/" + currentAdNo)
            setModName(data.mod_name)
        })();
    },[currentAdNo])
    //gọi api phản hồi
    const replyFeedback = async (repContent) =>{
        const replyInfo = {rep_content: repContent, mod_no: currentAdNo, mod_name: modName}
        setReplies(pre=>[...pre, replyInfo])
        const caller = new ApiCaller()
        await caller.post("feedback/" + feedbackInfo.fb_no + "/replies", replyInfo)
        setModifyFbList(1)
        notifyFeedbackReplied()
        setTimeout(() => {
            setRep(0)
        }, 1000);
    }

    //nội dung phản hồi
    const [repContent, setRepContent] = useState("")

    return (
        <>
            <div className="ReplyFeedback">
                <div className="ReplyFeedbackBorder">
                    <h2>Phản hồi đánh giá</h2>
                    <div className="ReplyFeedback_User">
                        <FontAwesomeIcon icon={faReply} />
                        <span> {feedbackInfo.cus_name}</span>
                        <textarea className="textarea1" rows="4" value={feedbackInfo.fb_content} readOnly></textarea>
                        <p>Nội dung phản hồi:</p>
                        <textarea className="textarea2" rows="5" onChange={e=> setRepContent(e.target.value)}></textarea>
                    </div>
                    <div className="FeedbackBehavior">
                        <AdminButton ClickEvent={()=>replyFeedback(repContent)} IconName={faPaperPlane} />
                        <AdminButton ClickEvent={() => setRep(0)} IconName={faWindowClose} />
                    </div>
                </div>
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    )
}

export default ReplyFeedback