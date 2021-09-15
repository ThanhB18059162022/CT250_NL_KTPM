import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { AdminButton, AdminSearchInput } from "../../../Controls"
import "../Admin.Style.scss"
import FeedbackInformation from "./FeedbackInformation"
import Notifications from "../../../../common/Notifications"

const FeedbackList = () => {
    const cusStyle = {
        fontSize : "15px",
        width : "45px"
    }

    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type :"CONFIRMATION", //CONFIRMATION, INFORMATION
        title :"", // title of the notifications
        content :"", // content of the notify
        infoType :""
    })

    const notifyDeleteProduct = () =>{
        setNotify({
            ...notify,
            title:"Xác nhận",
            content:"Xóa sản phẩm?",
        })
        setShow(true)
    }
    const [fbInfo, setFbInfo] = useState(0)
    const [fbNo, setFbNo] = useState()
    const displayFbInfoForm = () => {
        switch(fbInfo){
            case 1: return <FeedbackInformation setFbInfo={setFbInfo} fbNo={fbNo}/>
            default: return;
        }
    }
    //test data
    const obj2 = [
        {
            fb_no : "001",
            cus_name : "Ban đêm có nắng",
            fb_content : "Sản phẩm rất tốt",
            prod_name : "IPhone X",
            fb_time : "04/09/2021",
            reply : [
                {mod : "Admin01", content : "Cảm ơn bạn!"},
                {mod : "Admin01", content : "Cảm ơn bạn!"}
            ]
        },
        {
            fb_no : "002",
            cus_name : "Ban ngày có trăng",
            fb_content : "Dịch vụ rất hài lòng",
            prod_name : "IPhone X",
            fb_time : "04/09/2021",
            reply : [
                {mod : "Admin01", content : "Cảm ơn bạn!"}
            ]
        }
    ]

    return(
        <>
            <div className="ListLayout">
                <AdminSearchInput/>
                <div className="AdminListClass BorderFormat">
                    <p className="Title">Danh sách đánh giá</p>
                    <li className="FeedbackList">
                        <p>Mã đánh giá</p>
                        <p>Người đánh giá</p>
                        <p>Nội dung</p>
                        <p>Sản phẩm</p>
                        <p>Thời gian</p>
                        <p>Số phản hồi</p>
                        <p>Hành động</p>
                    </li>
                    <hr/>
                    {obj2.map((item,index)=><Feedback key={index} info={item} cusStyle={cusStyle} setFbNo={setFbNo} setFbInfo={setFbInfo} show={show} setShow={setShow} notify={notify} notifyDeleteProduct={notifyDeleteProduct}/>)}
                </div>
                {displayFbInfoForm()}
            </div>
            
        </>
    )
}

const Feedback = (props) => {
    const {info, cusStyle, setFbNo, setFbInfo, show, setShow, notify, notifyDeleteProduct} = props
    return(
        <>
            <li className="FeedbackList">
                <p>{info.fb_no}</p>
                <p>{info.cus_name}</p>
                <p>{info.fb_content}</p>
                <p>{info.prod_name}</p>
                <p>{info.fb_time}</p>
                <p>...</p>
                <p><AdminButton IconName={faEye} style={cusStyle} ClickEvent={()=>{setFbInfo(1); setFbNo(info.fb_no)}}/> <AdminButton IconName={faTrashAlt} style={cusStyle} ClickEvent={notifyDeleteProduct}/></p>
            </li>
            <hr/>
            <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default FeedbackList