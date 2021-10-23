import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AdminButton } from "../../../Controls"
import "../Admin.Style.scss"
import Notifications from "../../../../common/Notifications";
import ApiCaller from "../../../../api_services/ApiCaller";
import { useState } from "react/cjs/react.development";

const AdminReplied = (props) => {
    const { reply, feedbackInfo, setModifyFbList, setReplies } = props

    const [show, setShow] = useState(false)
    const [notify, setNotify] = useState({
        type :"CONFIRMATION", //CONFIRMATION, INFORMATION
    })
    //xác nhận xoá phản hồi
    const notifyDeleteReply = () =>{
        setNotify({
            ...notify,
            title:"Xác nhận",
            content:"Xóa phản hồi?",
            handle: ()=>deleteReply(feedbackInfo.fb_no, reply.rep_no)
        })
        setShow(true)
    }
    //gọi api xoá phản hồi
    const deleteReply = async (fbNo, repNo) =>{
        const caller = new ApiCaller()
        await caller.delete("feedback/" + fbNo + "/replies/" + repNo)
        setModifyFbList(1)
        setReplies(feedbackInfo.replies.slice(0,-1))
    }

    return(
        <>
            <div className="AdminReplied">
                <div className="AdminReplied_User">
                    <FontAwesomeIcon icon={faUserEdit}/> &nbsp;
                    <p>{reply.mod_name}</p>
                    <AdminButton ClickEvent={()=>notifyDeleteReply()} IconName={faTrashAlt}/>
                </div>
                <textarea value={reply.rep_content} readOnly></textarea>
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default AdminReplied