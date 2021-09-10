import { AdminSearchInput } from "../../../Controls"
import "../Admin.Style.scss"
import FeedbackRecord from "./FeedbackRecord"

const FeedbackList = (props) => {
    let obj = {
        no : "Mã đánh giá",
        user : "Người đánh giá",
        content : "Nội dung",
        product : "Sản phẩm",
        time : "Thời gian",
        reply : "Số phản hồi",
        action : "Hành động"
    }
    const obj2 = [
        {
            no : "001",
            user : "Ban đêm có nắng",
            content : "Sản phẩm rất tốt",
            product : "IPhone X",
            time : "04/09/2021",
            reply : [
                {mod : "Admin01", content : "Cảm ơn bạn!"},
                {mod : "Admin01", content : "Cảm ơn bạn!"}
            ],
            action : 2
        },
        {
            no : "002",
            user : "Ban ngày có trăng",
            content : "Dịch vụ rất hài lòng",
            product : "IPhone X",
            time : "04/09/2021",
            reply : [
                {mod : "Admin01", content : "Cảm ơn bạn!"}
            ],
            action : 2
        }
    ]
    return(
        <div className="ListLayout">
            <AdminSearchInput/>
            <div className="AdminListClass BorderFormat">
                <p className="Title">Danh sách đánh giá</p>
                <br/>
                <FeedbackRecord obj={obj} setFbInfo={props.setFbInfo} setFbID={props.setFbID}/>
                {obj2.map((item,index)=><FeedbackRecord key={index} obj={item} setFbInfo={props.setFbInfo} setFbID={props.setFbID}/>)}
            </div>
        </div>
    )
}

export default FeedbackList