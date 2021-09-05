import MorderatorList from "../../components/Paritals/Admin/ModeratorList"
import { AdminButton } from "../../components/Controls"

const ModeratorManagement = () => {
    return(
        <div>
            <div className="ProductManagementButton">
                <AdminButton IconName="Add"/>
            </div>
            <MorderatorList name="Danh sách quản trị viên"/>
        </div>
    )
}

export default ModeratorManagement