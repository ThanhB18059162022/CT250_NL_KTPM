import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import ModeratorInformation from "../../../../pages/Admin/ModeratorInformation"
import { AdminButton, AdminSearchInput } from "../../../Controls"
import "../Admin.Style.scss"
import Notifications from "../../../../common/Notifications"
import {caller} from "../../../../api_services/servicesContainer"

const MorderatorList = (props) => {
    const {newMod, setNewModNo} = props
    const [editMod, setEditMod] = useState(0)
    const [modInfo, setModInfo] = useState()
    const cusStyle = {
        fontSize : "15px",
        width : "45px"
    }
    //hiển thị form sửa thông tin quản trị
    const displayEditMod = () => {
        switch(editMod){
            case 1: return <ModeratorInformation setDisplay={setEditMod} modInfo={modInfo} setModInfo={setModInfo} mods={mods} setMods={setMods} modsTmp={modsTmp} setModsTmp={setModsTmp}/>
            default: return;
        }
    }
    //biến hiển thị thông báo
    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type :"CONFIRMATION", //CONFIRMATION, INFORMATION
        title :"", // title of the notifications
        content :"", // content of the notify
        infoType :""
    })
    //gọi api xóa quản trị
    const callApiDelete = (id) => {
        console.log("deleted " + id)
    }
    //thông báo xóa quản trị
    const notifyDeleteAdmin = (id) =>{
        setNotify({
            ...notify,
            title:"Xác nhận",
            content:"Xóa quản trị viên?",
            handle: ()=>callApiDelete(id)
        })
        setShow(true)
    }
    //danh sách quản trị
    const [mods, setMods] = useState([])
    //danh sách mod tạm
    const [modsTmp, setModsTmp] = useState([])
    //danh sách quản trị đã lọc
    const [filter, setFilter] = useState([])
    //lấy danh sách quản trị từ server
    useEffect(()=>{
        (async()=>{
         let data =  await caller.get('moderators')
         setMods(data.items)
        })(); // IIFE // Note setProduct([...products, item])
    },[])
    //gán id cho mod thêm mới
    useEffect(()=>{
       setNewModNo(mods.length+1)
    },[mods])
    //thêm mod mới vào mảng
    useEffect(()=>{
        setMods([...mods, newMod])
    },[newMod])
    //lọc danh sách quản trị
    const filterModerator = (message) => {
        const newArray = mods.filter(item => item.mod_name.includes(message))
        setFilter(newArray)
    }

    return(
        <div className="ListLayout">
            <AdminSearchInput filterModerator={filterModerator}/>
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
                {filter.length===0?(
                    mods.map((item, index)=><Moderator key={index} info={item} cusStyle={cusStyle} setEditMod={setEditMod} setModInfo={setModInfo} notify={notify} show={show} setShow={setShow} notifyDeleteAdmin={notifyDeleteAdmin}/>)
                ):(
                    filter.map((item, index)=><Moderator key={index} info={item} cusStyle={cusStyle} setEditMod={setEditMod} setModInfo={setModInfo} notify={notify} show={show} setShow={setShow} notifyDeleteAdmin={notifyDeleteAdmin}/>)
                )}
            </div>
            {displayEditMod()}
        </div>
    )
}

const Moderator = (props) => {
    const {info, cusStyle, setEditMod, setModInfo, show, setShow, notify, notifyDeleteAdmin} = props
    return(
        <>
            <li className="ModeratorList">
                <p>{info.mod_no}</p>
                <p>{info.mod_name}</p>
                <p>{info.mod_id}</p>
                <p>{info.mod_phoneNumber}</p>
                <p>{info.mod_sex}</p>
                <p>{info.mod_address}</p>
                <p><AdminButton style={cusStyle} IconName={faEdit} ClickEvent={()=>{setEditMod(1); setModInfo(info)}}/> <AdminButton style={cusStyle} IconName={faTrashAlt} ClickEvent={()=>notifyDeleteAdmin(info.mod_no)}/></p>
            </li>
            <hr/>
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    )
}

export default MorderatorList