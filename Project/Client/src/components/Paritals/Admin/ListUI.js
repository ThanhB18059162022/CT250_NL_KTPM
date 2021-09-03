import { AdminSearchInput } from "../../Controls"
import "./Admin.Style.scss"

const ListUI = (props) => {
    const {name} = props
    return(
        <div className="ListUI">
            <AdminSearchInput/>
            <div className="AdminListClass BorderFormat">
                <p className="Title">{name}</p>
            </div>
        </div>
    )
}

export default ListUI