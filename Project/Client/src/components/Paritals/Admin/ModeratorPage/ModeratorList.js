import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import ModeratorInformation from "../../../../pages/Admin/ModeratorInformation"
import { AdminButton, AdminSearchInput } from "../../../Controls"
import "../Admin.Style.scss"
import Notifications from "../../../../common/Notifications"
import {caller} from "../../../../api_services/servicesContainer"

const MorderatorList = () => {
    const [editMod, setEditMod] = useState(0)
    const [modInfo, setModInfo] = useState()
    const cusStyle = {
        fontSize : "15px",
        width : "45px"
    }
    const displayEditMod = () => {
        switch(editMod){
            case 1: return <ModeratorInformation setDisplay={setEditMod} modInfo={modInfo}/>
            default: return;
        }
    }

    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type :"CONFIRMATION", //CONFIRMATION, INFORMATION
        title :"", // title of the notifications
        content :"", // content of the notify
        infoType :""
      })
    
      const notifyDeleteAdmin = () =>{
          setNotify({
              ...notify,
              title:"Xác nhận",
              content:"Xóa quản trị viên?",
          })
          setShow(true)
      }

    const [mods, setMods] =useState([])
    useEffect(()=>{
        (async()=>{
         let data =  await caller.get('moderators')
         setMods(data.items)
        })(); // IIFE // Note setProduct([...products, item])
     },[])

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
                {mods.map((item, index)=><Moderator key={index} info={item} cusStyle={cusStyle} setEditMod={setEditMod} setModInfo={setModInfo} notify={notify} show={show} setShow={setShow} notifyDeleteAdmin={notifyDeleteAdmin}/>)}
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
                <p><AdminButton style={cusStyle} IconName={faEdit} ClickEvent={()=>{setEditMod(1); setModInfo(info)}}/> <AdminButton style={cusStyle} IconName={faTrashAlt} ClickEvent={notifyDeleteAdmin}/></p>
            </li>
            <hr/>
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    )
}

export default MorderatorList