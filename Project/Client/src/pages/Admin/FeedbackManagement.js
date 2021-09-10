import { useState } from "react"
import FeedbackInformation from "../../components/Paritals/Admin/FeedbackPage/FeedbackInformation"
import FeedbackList from "../../components/Paritals/Admin/FeedbackPage/FeedbackList"

const FeedbackManagement = () => {
    const [fbInfo, setFbInfo] = useState(0)
    const [fbID, setFbID] = useState("null")
    const displayReplyForm = () => {
        switch(fbInfo){
            case 1: return <FeedbackInformation setFbInfo={setFbInfo} fbID={fbID}/>
            default: return;
        }
    }
    return(
        <div>
            <FeedbackList setFbInfo={setFbInfo} setFbID={setFbID}/>
            {displayReplyForm()}
        </div>
    )
}

export default FeedbackManagement