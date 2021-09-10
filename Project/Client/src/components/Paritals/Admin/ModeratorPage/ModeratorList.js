import { AdminSearchInput } from "../../../Controls"
import "../Admin.Style.scss"
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
        {
            no : "001",
            name : "Admin01",
            id : "156878912557",
            phone : "0123456789",
            sex : "Nam",
            address : "Ninh Kiều - Cần Thơ",
            action : 2
        },
        {
            no : "002",
            name : "Admin02",
            id : "156878912557",
            phone : "0123456789",
            sex : "Nữ",
            address : "Cái Răng - Cần Thơ",
            action : 2
        }
    }
    return(
        <div className="ListLayout">
            <AdminSearchInput/>
            <div className="AdminListClass BorderFormat">
                <p className="Title">{name}</p>
                <br/>
                <ModeratorRecord obj={obj} setState={props.setState} setToDo={props.setToDo} setID={props.setID}/>
                {obj2.map((item, index)=><ModeratorRecord key={index} obj={item} setState={props.setState} setToDo={props.setToDo} setID={props.setID}/>)}
            </div>
        </div>
    )
}

export default MorderatorList