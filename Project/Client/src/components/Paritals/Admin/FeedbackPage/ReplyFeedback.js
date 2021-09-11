import { faPaperPlane, faReply, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AdminButton } from "../../../Controls"
import "../Admin.Style.scss"

const ReplyFeedback = (props) => {
    const {fbNo, setRep} = props
    const CusStyle = {
        margin : "0 0 0 40%"
    }
    return(
        <div className="ReplyFeedback">
            <div className="ReplyFeedbackBorder">
                <h1>Phản hồi đánh giá</h1>
                <div className="ReplyFeedback_User">
                    <FontAwesomeIcon icon={faReply}/> &nbsp;
                    <p>Test user</p>
                </div>
                <div>
                    <textarea className="textarea1" rows="4" disabled></textarea>
                    <p>Nội dung phản hồi:</p>
                    <textarea className="textarea2" rows="8"></textarea>
                </div>
                <AdminButton ClickEvent={()=>{alert("Đã gửi phản hồi!"); setRep(0)}} style={CusStyle} IconName={faPaperPlane}/> &nbsp;
                <AdminButton ClickEvent={()=>setRep(0)} IconName={faWindowClose}/>
            </div>
        </div>
    )
}

export default ReplyFeedback