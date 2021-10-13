import { faReply, faTrashAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AdminButton } from "../../../Controls";
import "../Admin.Style.scss"
import AdminReplied from "./AdminReplied";
import ReplyFeedback from "./ReplyFeedback";
import Notifications from "../../../../common/Notifications";

const FeedbackInformation = (props) => {
    const {setFbInfo, fbNo} = props

    const [show, setShow] = useState(false)
  
    const [notify, setNotify] = useState({
        type :"CONFIRMATION", //CONFIRMATION, INFORMATION
        title :"", // title of the notifications
        content :"", // content of the notify
        infoType :""
    })

  const notifyDeleteFeedback = () =>{
      setNotify({
          ...notify,
          title:"Xác nhận",
          content:"Xóa bình luận?",
      })
      setShow(true)
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
            case 1: return <ReplyFeedback fbNo={fbNo} setRep={setRep}/>
            default: return;
        }
    }
    return(
        <>
            <div className="FeedbackInformation">
                <div className="FeedbackInformationBorder">
                    <h2>Thông tin đánh giá</h2>
                    <div className="FbInfoPart1">
                        <div>
                            <span className="col1">Người đánh giá:</span>
                            <p className="col2">test user</p>
                        </div>
                        <div>
                            <span className="col1">Nội dung:</span>
                            <textarea className="col2" cols="70" rows="5" readOnly></textarea>
                        </div>
                        <div>
                            <span className="col1">Sản phẩm:</span>
                            <p className="col2">Điện thoại...</p>
                        </div>
                        <div>
                            <span className="col1">Thời gian:</span>
                            <p className="col2">1/9/2021</p>
                        </div>
                        <div>
                            <span className="col1">Số phản hồi:</span>
                            <p className="col2">{obj.length}</p>
                        </div>
                    </div>
                    <div className="FbInfoPart2">
                        {getAdminReplied(obj)}
                    </div>
                    <div className="FbInfoBtn">
                        <AdminButton ClickEvent={()=>setRep(1)} IconName={faReply}/> &nbsp;
                        <AdminButton ClickEvent={notifyDeleteFeedback} setID={()=>{}} IconName={faTrashAlt}/> &nbsp;
                        <AdminButton IconName={faWindowClose} ClickEvent={()=>setFbInfo(0)}/>
                    </div>
                </div>
            </div>
            {displayFeedbackReply()}
            <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default FeedbackInformation