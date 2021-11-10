import { faReply, faTrashAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AdminButton } from "../../../Controls";
import "../Admin.Style.scss"
import AdminReplied from "./AdminReplied";
import ReplyFeedback from "./ReplyFeedback";
import Notifications from "../../../../common/Notifications";
import ApiCaller from "../../../../api_services/ApiCaller";
import Helper from "../../../../helpers";

const FeedbackInformation = (props) => {
    const { setShowFb, feedbackInfo, currentAdNo, setModifyFbList } = props

    const [show, setShow] = useState(false)
    const [notify, setNotify] = useState({
        type :"CONFIRMATION", //CONFIRMATION, INFORMATION
    })
    //xác nhận xoá đánh giá
    const notifyDeleteFeedback = () =>{
        setNotify({
            ...notify,
            title:"Xác nhận",
            content:"Xóa đánh giá?",
            handle: ()=>deleteFeedback(feedbackInfo.fb_no)
        })
        setShow(true)
    }
    //gọi api xoá đánh giá
    const deleteFeedback = async (fbNo) =>{
        const caller = new ApiCaller()
        await caller.delete("feedback/" + fbNo)
        setModifyFbList(1)
        setShowFb(0)
    }
    //danh sách phản hồi của đánh giá
    const [replies, setReplies] = useState(feedbackInfo.replies)
    //hiển thị form nhập phản hồi
    const [rep, setRep] = useState(0)
    const displayFeedbackReply = () => {
        switch(rep){
            case 1: return <ReplyFeedback feedbackInfo={feedbackInfo} setRep={setRep} currentAdNo={currentAdNo} setReplies={setReplies} setModifyFbList={setModifyFbList}/>
            default: return;
        }
    }

    const ratingShow = (rating) => {
        let tempArr = []
        for(let i =0; i<rating; i++)
            tempArr.push(i)
        return <>
            {tempArr.map(item=><img key={item} src="/icon/staricon.png" width="20px" alt=""></img>)}
        </>
    }
    return(
        <>
            <div className="FeedbackInformation">
                <div className="FeedbackInformationBorder">
                    <h2>Thông tin đánh giá</h2>
                    <div className="FbInfoPart1">
                        <div>
                            <span className="col1">Người đánh giá:</span>
                            <p className="col2">{feedbackInfo.cus_name}</p>
                        </div>
                        <div>
                            <span className="col1">Nội dung:</span>
                            <textarea className="col2" cols="70" rows="5" readOnly value={feedbackInfo.fb_content}></textarea>
                        </div>
                        <div>
                            <span className="col1">Sản phẩm:</span>
                            <p className="col2">{feedbackInfo.prod_name}</p>
                        </div>
                        <div>
                            <span className="col1">Xếp hạng:</span>
                            <p className="col2">{ratingShow(feedbackInfo.fb_star)}</p>
                        </div>
                        <div>
                            <span className="col1">Thời gian:</span>
                            <p className="col2">{Helper.Exchange.toLocalDate(feedbackInfo.fb_time)}</p>
                        </div>
                        <div>
                            <span className="col1">Phản hồi:</span>
                            <p className="col2">{replies.length}</p>
                        </div>
                    </div>
                    <div className="FbInfoPart2">
                        {replies.map((item,index)=><AdminReplied key={index} reply={item} feedbackInfo={feedbackInfo} setModifyFbList={setModifyFbList} setReplies={setReplies}/>)}
                    </div>
                    <div className="FbInfoBtn">
                        <AdminButton ClickEvent={()=>setRep(1)} IconName={faReply}/> &nbsp;
                        <AdminButton ClickEvent={notifyDeleteFeedback} setID={()=>{}} IconName={faTrashAlt}/> &nbsp;
                        <AdminButton IconName={faWindowClose} ClickEvent={()=>setShowFb(0)}/>
                    </div>
                </div>
            </div>
            {displayFeedbackReply()}
            <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default FeedbackInformation