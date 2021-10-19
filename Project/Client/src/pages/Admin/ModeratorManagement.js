import MorderatorList from "../../components/Paritals/Admin/ModeratorPage/ModeratorList"
import { useState } from "react"
import ModeratorInformation from "./ModeratorInformation"

const ModeratorManagement = (props) => {
    const {currentAdNo} = props
    const [addNew, setAddNew] = useState(0)
    const [newMod, setNewMod] = useState({})
    const displayAddModeratorForm = () => {        
        switch(addNew){
            case 1: return <ModeratorInformation setDisplay={setAddNew} setNewMod={setNewMod}/>
            default: return;
        }
    }

    return(
        <div>
            <MorderatorList newMod={newMod} setAddNew={setAddNew} currentAdNo={currentAdNo}/>
            {displayAddModeratorForm()}
        </div>
    )
}

export default ModeratorManagement