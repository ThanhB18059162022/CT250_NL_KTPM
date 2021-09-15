import MorderatorList from "../../components/Paritals/Admin/ModeratorPage/ModeratorList"
import { AdminButton } from "../../components/Controls"
import { useState } from "react"
import ModeratorInformation from "./ModeratorInformation"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const ModeratorManagement = () => {
    const [addNew, setAddNew] = useState(0)
    const displayAddModeratorForm = () => {        
        switch(addNew){
            case 1: return <ModeratorInformation setDisplay={setAddNew}/>
            default: return;
        }
    }
    return(
        <div>
            <div className="ProductManagementButton">
                <AdminButton IconName={faPlus} ClickEvent={()=>setAddNew(1)}/>
            </div>
            <MorderatorList/>
            {displayAddModeratorForm()}
        </div>
    )
}

export default ModeratorManagement