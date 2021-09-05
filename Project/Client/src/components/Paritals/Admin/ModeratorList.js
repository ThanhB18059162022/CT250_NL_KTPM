import { AdminSearchInput } from "../../Controls"
import "./Admin.Style.scss"
import ModeratorRecord from "./ModeratorRecord"

const MorderatorList = (props) => {
    const {name} = props
    let obj = {
        no : "Mã số",
        name : "Họ tên",
        id : "CMND",
        phone : "SĐT",
        sex : "Giới tính",
        address : "Địa chỉ",
        action : "Hành động"
    }
    let obj2 = {
        no : "001",
        name : "Admin01",
        id : "156878912557",
        phone : "0123456789",
        sex : "Nam",
        address : "Ninh Kiều - Cần Thơ",
        action : 2
    }
    return(
        <div className="ListLayout">
            <AdminSearchInput/>
            <div className="AdminListClass BorderFormat">
                <p className="Title">{name}</p>
                <br/>
                <ModeratorRecord obj={obj}/>
                <ModeratorRecord obj={obj2}/>
            </div>
        </div>
    )
}

export default MorderatorList