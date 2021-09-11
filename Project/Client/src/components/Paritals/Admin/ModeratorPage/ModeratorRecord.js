import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { AdminButton } from "../../../Controls"
import "../Admin.Style.scss"

const ModeratorRecord = (props) => {
    const {obj, setToDo, setID, setState} = props
    const getContent = (props) =>{
        const CusStyle = {
            fontSize: "15px",
            padding: "1px 0"
        };
        if(props === 2) return(<><AdminButton IconName={faEdit} style={CusStyle} EditClicked={()=>setState(1)} setToDo={setToDo} setID={()=>setID(obj.no)}/> <AdminButton IconName={faTrashAlt} style={CusStyle} DeleteClicked={()=>window.confirm("Xóa quản trị viên?")} setID={()=>setID(obj.no)}/></>)
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