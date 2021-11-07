import MorderatorList from "../../components/Paritals/Admin/ModeratorPage/ModeratorList"
import { useState } from "react"
import ModeratorInformation from "./ModeratorInformation"

const ModeratorManagement = (props) => {
    const {currentAdNo} = props
    const [addNew, setAddNew] = useState(0)
    const [modifyList, setModifyList] = useState(0)
    const displayAddModeratorForm = () => {        
        switch(addNew){
            case 1: return <ModeratorInformation setDisplay={setAddNew} setModifyList={setModifyList}/>
            default: return;
        }
    }

    return(
        <div>
            <MorderatorList setAddNew={setAddNew} currentAdNo={currentAdNo} modifyList={modifyList} setModifyList={setModifyList}/>
            {displayAddModeratorForm()}
        </div>
    )
}

export default ModeratorManagement