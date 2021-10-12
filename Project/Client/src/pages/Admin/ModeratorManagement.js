import MorderatorList from "../../components/Paritals/Admin/ModeratorPage/ModeratorList"
import { useState } from "react"
import ModeratorInformation from "./ModeratorInformation"

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
            <MorderatorList newMod={newMod} setNewModNo={setNewModNo} setAddNew={setAddNew}/>
            {displayAddModeratorForm()}
        </div>
    )
}

export default ModeratorManagement