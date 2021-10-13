import { faUserEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../Admin.Style.scss"

const AdminReplied = (props) => {
    const {obj} = props
    return(
        <div className="AdminReplied">
            <div className="AdminReplied_User">
                <FontAwesomeIcon icon={faUserEdit}/> &nbsp;
                <p>{obj.user}</p>
            </div>
            <textarea value={obj.message} readOnly></textarea>
        </div>
    )
}

export default AdminReplied