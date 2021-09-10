import { faReply, faTrashAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AdminButton } from "../../../Controls";
import "../Admin.Style.scss"
import AdminReplied from "./AdminReplied";
import ReplyFeedback from "./ReplyFeedback";

const FeedbackInformation = (props) => {
    const cusStyle = {
        margin : "0 0 0 35%"
    }
    const getAdminReplied = (obj) => {
        return(
            <>
                {obj.map((item,index)=><AdminReplied key={index} obj={item}/>)}
            </>
        )
    }
    //Dữ liệu test
    const obj = [
        {
            user : "Admin01",
            message : "Cảm ơn đánh giá của bạn!"
        },
        {
            user : "Admin02",
            message : "Cảm ơn góp ý của bạn!"
        }
    ]
    const [rep, setRep] = useState(0)
    const displayFeedbackReply = () => {
        switch(rep){
            case 1: return <ReplyFeedback fbID={props.fbID} setRep={setRep}/>
            default: return;
        }
    }
    return(
        <>
            <div className="FeedbackInformation">
                <div className="FeedbackInformationBorder">
                    <h1>Thông tin đánh giá</h1>
                    <div className="FbInfoPart1">
                        <div className="FbInfoPart1_Col1">
                            <p>Người đánh giá</p>
                            <p>Nội dung</p>
                            <p>Sản phẩm</p>
                            <p>Thời gian</p>
                            <p>Số phản hồi</p>
                        </div>
                        <div className="FbInfoPart1_Col2">
                            <p>test user</p>
                            <textarea cols="70" rows="5" disabled></textarea>
                            <p>Điện thoại...</p>
                            <p>1/9/2021</p>
                            <p>{obj.length}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="FbInfoPart2">
                        {getAdminReplied(obj)}
                    </div>
                    <div className="FbInfoBtn">
                        <AdminButton style={cusStyle} ReplyClicked={()=>setRep(1)} IconName={faReply}/> &nbsp;
                        <AdminButton DeleteClicked={()=>window.confirm("Xóa bình luận?")} setID={()=>{}} IconName={faTrashAlt}/> &nbsp;
                        <AdminButton IconName={faWindowClose} CloseClicked={()=>props.setFbInfo(0)}/>
                    </div>
                </div>
            </div>
            {displayFeedbackReply()}
        </>
    )
}

export default FeedbackInformation