import { faReply, faTrashAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AdminButton } from "../../../Controls";
import "../Admin.Style.scss"
import AdminReplied from "./AdminReplied";
import ReplyFeedback from "./ReplyFeedback";
import Notifications from "../../../../common/Notifications";

const FeedbackInformation = (props) => {
    const {setFbInfo, fbNo} = props
    const cusStyle = {
        margin : "0 0 0 35%"
    }

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
                    <h1>Thông tin đánh giá</h1>
                    <div className="FbInfoPart1">
                        <div>
                            <p className="col1">Người đánh giá:</p>
                            <p className="col2">test user</p>
                        </div>
                        <div>
                            <p className="col1">Nội dung:</p>
                            <textarea className="col2" cols="70" rows="5" disabled></textarea>
                        </div>
                        <div>
                            <p className="col1">Sản phẩm:</p>
                            <p className="col2">Điện thoại...</p>
                        </div>
                        <div>
                            <p className="col1">Thời gian:</p>
                            <p className="col2">1/9/2021</p>
                        </div>
                        <div>
                            <p className="col1">Số phản hồi:</p>
                            <p className="col2">{obj.length}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="FbInfoPart2">
                        {getAdminReplied(obj)}
                    </div>
                    <div className="FbInfoBtn">
                        <AdminButton style={cusStyle} ClickEvent={()=>setRep(1)} IconName={faReply}/> &nbsp;
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