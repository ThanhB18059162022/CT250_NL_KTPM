import MorderatorList from "../../components/Paritals/Admin/ModeratorPage/ModeratorList"
import { AdminButton } from "../../components/Controls"
import { useState } from "react"
import ModeratorInformation from "./ModeratorInformation"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const ModeratorManagement = () => {
    const [addNew, setAddNew] = useState(0)
    const [newModNo, setNewModNo] = useState(0)
    const [newMod, setNewMod] = useState({})
    const displayAddModeratorForm = () => {        
        switch(addNew){
            case 1: return <ModeratorInformation setDisplay={setAddNew} setNewMod={setNewMod} newModNo={newModNo}/>
            default: return;
        }
    }

    return(
        <div>
            <div className="ProductManagementButton">
                <AdminButton IconName={faPlus} ClickEvent={()=>setAddNew(1)}/>
            </div>
            <MorderatorList newMod={newMod} setNewModNo={setNewModNo}/>
            {displayAddModeratorForm()}
        </div>
    )
}

export default ModeratorManagement