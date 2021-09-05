import { AdminButton } from "../../Controls"
import "./Admin.Style.scss"

const ModeratorRecord = (props) => {
    const {obj} = props
    const getContent = (props) =>{
        const CusStyle = {
            fontSize: "15px",
            padding: "1px 0"
        };
        if(props === 2) return(<><AdminButton IconName="Edit" style={CusStyle}/> <AdminButton IconName="Delete" style={CusStyle}/></>)
        return props
    }
    return(
        <>
            <div className="ModeratorRecord">
                {Object.keys(obj).map((item,index)=><p key={item}>{getContent(obj[item])}</p>)}
            </div>
            <hr/>
        </>
    )
}

export default ModeratorRecord