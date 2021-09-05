import { AdminSearchInput } from "../../Controls"
import "./Admin.Style.scss"
import FeedbackRecord from "./FeedbackRecord"

const FeedbackList = (props) => {
    const {name} = props
    let obj = {
        user : "Người đánh giá",
        content : "Nội dung",
        product : "Sản phẩm",
        time : "Thời gian",
        reply : "Số phản hồi",
        action : "Hành động"
    }
    let obj2 = {
        user : "Ban đêm có nắng",
        content : "Sản phẩm rất tốt",
        product : "IPhone X",
        time : "04/09/2021",
        reply : [
            {mod : "Admin01", content : "Cảm ơn bạn!"}
        ],
        action : 2
    }
    let obj3 = {
        user : "Ban ngày có trăng",
        content : "Dịch vụ rất hài lòng",
        product : "IPhone X",
        time : "04/09/2021",
        reply : [
            {mod : "Admin01", content : "Cảm ơn bạn!"}
        ],
        action : 2
    }
    return(
        <div className="ListLayout">
            <AdminSearchInput/>
            <div className="AdminListClass BorderFormat">
                <p className="Title">{name}</p>
                <br/>
                <FeedbackRecord obj={obj}/>
                <FeedbackRecord obj={obj2}/>
                <FeedbackRecord obj={obj3}/>
            </div>
        </div>
    )
}

export default FeedbackList