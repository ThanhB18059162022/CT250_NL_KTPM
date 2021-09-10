import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import ModeratorInformation from "../../../../pages/Admin/ModeratorInformation"
import { AdminButton, AdminSearchInput } from "../../../Controls"
import "../Admin.Style.scss"

const MorderatorList = () => {
    const [editMod, setEditMod] = useState(0)
    const [modNo, setModNo] = useState()
    const cusStyle = {
        fontSize : "15px",
        width : "45px"
    }
    const displayEditMod = () => {
        switch(editMod){
            case 1: return <ModeratorInformation setDisplay={setEditMod} modNo={modNo}/>
            default: return;
        }
    }
    //test data
    let obj2 = [
        {
            mod_no : "001",
            mod_name : "Admin01",
            mod_id : "156878912557",
            mod_phonenumber : "0123456789",
            mod_sex : "Nam",
            mod_address : "Ninh Kiều - Cần Thơ",
        },
        {
            mod_no : "002",
            mod_name : "Admin02",
            mod_id : "156878912557",
            mod_phonenumber : "0123456789",
            mod_sex : "Nữ",
            mod_address : "Cái Răng - Cần Thơ",
        }
    ]
    return(
        <div className="ListLayout">
            <AdminSearchInput/>
            <div className="AdminListClass BorderFormat">
                <p className="Title">Danh sách quản trị viên</p>
                <li className="ModeratorList">
                    <p>Mã quản trị</p>
                    <p>Họ tên</p>
                    <p>CMND</p>
                    <p>SĐT</p>
                    <p>Giới tính</p>
                    <p>Địa chỉ</p>
                    <p>Hành động</p>
                </li>
                <hr/>
                {obj2.map((item, index)=><Moderator key={index} info={item} cusStyle={cusStyle} setEditMod={setEditMod} setModNo={setModNo}/>)}
            </div>
            {displayEditMod()}
        </div>
    )
}

const Moderator = (props) => {
    const {info, cusStyle, setEditMod, setModNo} = props
    return(
        <>
            <li className="ModeratorList">
                <p>{info.mod_no}</p>
                <p>{info.mod_name}</p>
                <p>{info.mod_id}</p>
                <p>{info.mod_phonenumber}</p>
                <p>{info.mod_sex}</p>
                <p>{info.mod_address}</p>
                <p><AdminButton style={cusStyle} IconName={faEdit} ClickEvent={()=>{setEditMod(1); setModNo(info.mod_no)}}/> <AdminButton style={cusStyle} IconName={faTrashAlt} ClickEvent={()=>alert("xoa?")}/></p>
            </li>
            <hr/>
        </>
    )
}

export default MorderatorList