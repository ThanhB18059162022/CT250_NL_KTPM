import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { AdminButton, AdminSearchInput } from "../../../Controls"
import "../Admin.Style.scss"
import FeedbackInformation from "./FeedbackInformation"
import Notifications from "../../../../common/Notifications"
import ApiCaller from "../../../../api_services/ApiCaller"
import Helper from "../../../../helpers"

const FeedbackList = (props) => {
    const { currentAdNo, modifyFbList, setModifyFbList } = props
    const cusStyle = {
        fontSize: "15px",
        width: "45px"
    }

    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type: "CONFIRMATION", //CONFIRMATION, INFORMATION
        title: "", // title of the notifications
        content: "", // content of the notify
        infoType: ""
    })
    //xác nhận xoá đánh giá
    const notifyDeleteFeedback = (fbNo) => {
        setNotify({
            ...notify,
            title: "Xác nhận",
            content: "Xóa đánh giá " + fbNo + "?",
            handle: ()=>deleteFeedback(fbNo)
        })
        setShow(true)
    }
    //hiển thị thông tin đánh giá
    const [showFb, setShowFb] = useState(0)
    const displayFbInfoForm = () => {
        switch (showFb) {
            case 1: return <FeedbackInformation setShowFb={setShowFb} feedbackInfo={feedbackInfo} currentAdNo={currentAdNo} setModifyFbList={setModifyFbList} modifyFbList={modifyFbList}/>
            default: return;
        }
    }
    //thông tin đánh giá
    const [feedbackInfo, setFeedbackInfo] = useState()
    //gọi api xoá đánh giá
    const deleteFeedback = async (fbNo) =>{
        const caller = new ApiCaller()
        await caller.delete("feedback/" + fbNo)
        setModifyFbList(1)
    }
    //danh sách đánh giá
    const [feedbacks, setFeedbacks] = useState([])
    //lấy danh sách đánh giá từ server
    useEffect(() => {
        (async () => {
            const caller = new ApiCaller();
            let data = await caller.get('feedback?page=1&limit=200&order="DESC"')
            setFeedbacks(data.items)
            if(modifyFbList === 1) setModifyFbList(0)
        })();
    }, [modifyFbList, setModifyFbList])

    //danh sách đánh giá đã lọc
    const [filter, setFilter] = useState([])
    //lọc danh sách đánh giá
    const filterFeedback = (message) => {
        const newArray = feedbacks.filter(item => item.cus_name.toLowerCase().includes(message.toLowerCase()) || item.prod_name.toLowerCase().includes(message.toLowerCase()))
        setFilter(newArray)
    }

    return (
        <>
            <div className="ListLayout">
                <div className="ProductToolHeader FeedbackTool">
                    <AdminSearchInput filterFeedback={filterFeedback}/>
                </div>
                <li className="FeedbackListHeader">
                    <p>Mã ĐG</p>
                    <p>Người đánh giá</p>
                    <p>Nội dung</p>
                    <p>Sản phẩm</p>
                    <p>Xếp hạng</p>
                    <p>Thời gian</p>
                    <p>Phản hồi</p>
                    <p>Hành động</p>
                </li>
                <div className="AdminListClass">
                    {filter.length === 0 ? (
                        feedbacks.map((item, index) => <Feedback key={index} info={item} cusStyle={cusStyle} setFeedbackInfo={setFeedbackInfo} setShowFb={setShowFb} show={show} setShow={setShow} notify={notify} notifyDeleteFeedback={notifyDeleteFeedback} />)
                    ):(
                        filter.map((item, index) => <Feedback key={index} info={item} cusStyle={cusStyle} setFeedbackInfo={setFeedbackInfo} setShowFb={setShowFb} show={show} setShow={setShow} notify={notify} notifyDeleteFeedback={notifyDeleteFeedback} />)
                    )}
                </div>
                {displayFbInfoForm()}
                <Notifications {...notify} isShow={show} onHideRequest={setShow} />
            </div>

        </>
    )
}

const Feedback = (props) => {
    const { info, setFeedbackInfo, setShowFb, notifyDeleteFeedback } = props

    const ratingShow = (rating) => {
        const temArr = []
        for(let i = 0; i<rating; i++)
            temArr.push(i)
        return <>
            {temArr.map(item=> <img key={item} src="/icon/staricon.png" width="20px" alt=""></img>)}
        </>
    }

    return (
        <>
            <li className="FeedbackList">
                <p>{info.fb_no}</p>
                <p>{info.cus_name}</p>
                <p>{info.fb_content}</p>
                <p>{info.prod_name}</p>
                <p>{ratingShow(info.fb_star)}</p>
                <p>{Helper.Exchange.toLocalDate(info.fb_time)}</p>
                <p>{info.replies.length}</p>
                <p><AdminButton IconName={faEye} ClickEvent={() => { setShowFb(1); setFeedbackInfo(info) }} /> <AdminButton IconName={faTrashAlt} ClickEvent={()=>notifyDeleteFeedback(info.fb_no)} /></p>
            </li>

        </>
    )
}

export default FeedbackList