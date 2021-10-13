import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { AdminButton } from "../../../Controls"
import "../Admin.Style.scss"

const FeedbackRecord = (props) => {
    const {obj, setFbInfo, setFbID} = props
    const getContent = (props) =>{
        const CusStyle = {
            fontSize: "15px",
            padding: "1px 0"
        };
        if(props === 2){
            return(
                <>
                    <AdminButton IconName={faEye} style={CusStyle} WatchClicked={()=>setFbInfo(1)} setID={()=>setFbID(obj.no)}/> &nbsp;
                    <AdminButton IconName={faTrashAlt} style={CusStyle} DeleteClicked={()=>window.confirm("Xóa bình luận?")} setID={()=>setFbID(obj.no)}/>
                </>
            )
        }
        if(Array.isArray(props)===true) return props.length
        return props
    }

    return(
        <>
            <div className="FeedbackRecord">
                {Object.keys(obj).map((item,index)=><p key={index}>{getContent(obj[item])}</p>)}
            </div>
            <hr/>
        </>
    )
}

export default FeedbackRecord