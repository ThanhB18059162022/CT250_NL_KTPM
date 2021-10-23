import { useState } from "react/cjs/react.development"
import FeedbackList from "../../components/Paritals/Admin/FeedbackPage/FeedbackList"

const FeedbackManagement = (props) => {
    const {currentAdNo} = props
    //kiểm tra thay đổi danh sách đánh giá
    const [modifyFbList, setModifyFbList] = useState(0)

    return(
        <div>
            <FeedbackList currentAdNo={currentAdNo} modifyFbList={modifyFbList} setModifyFbList={setModifyFbList}/>
        </div>
    )
}

export default FeedbackManagement