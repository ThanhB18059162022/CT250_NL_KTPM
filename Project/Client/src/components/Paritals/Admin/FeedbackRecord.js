import { AdminButton } from "../../Controls"
import "./Admin.Style.scss"

const FeedbackRecord = (props) => {
    const {obj} = props
    const getContent = (props) =>{
        const CusStyle = {
            fontSize: "15px",
            padding: "1px 0"
        };
        if(props === 2) return(<><AdminButton IconName="Reply" style={CusStyle}/> <AdminButton IconName="Delete" style={CusStyle}/></>)
        if(Array.isArray(props)==true) return props.length
        return props
    }
    return(
        <>
            <div className="FeedbackRecord">
                {Object.keys(obj).map((item,index)=><p key={item}>{getContent(obj[item])}</p>)}
            </div>
            <hr/>
        </>
    )
}

export default FeedbackRecord