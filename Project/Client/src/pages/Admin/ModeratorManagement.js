import MorderatorList from "../../components/Paritals/Admin/ModeratorPage/ModeratorList"
import { AdminButton } from "../../components/Controls"
import { useState } from "react"
import ModeratorInformation from "./ModeratorInformation"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const ModeratorManagement = () => {
    const [state, setState] = useState(0)
    const [toDo, setToDo] = useState("nothing")
    const [id, setID] = useState("null")
    const displayAddModeratorForm = () => {        
        switch(state){
            case 1: return <ModeratorInformation setState={setState} toDo={toDo} id={id}/>
            default: return;
        }
    }
    return(
        <div>
            <div className="ProductManagementButton">
                <AdminButton IconName={faPlus} AddNewClicked={()=>setState(1)} setToDo={setToDo}/>
            </div>
            <MorderatorList name="Danh sách quản trị viên" setState={setState} setToDo={setToDo} setID={setID}/>
            {displayAddModeratorForm()}
        </div>
    )
}

export default ModeratorManagement