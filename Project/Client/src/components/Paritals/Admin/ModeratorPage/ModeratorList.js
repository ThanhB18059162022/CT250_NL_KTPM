import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import ModeratorInformation from "../../../../pages/Admin/ModeratorInformation"
import { AdminButton, AdminSearchInput } from "../../../Controls"
import "../Admin.Style.scss"
import Notifications from "../../../../common/Notifications"
import ApiCaller from "../../../../api_services/ApiCaller"

const MorderatorList = (props) => {
    const { newMod, setAddNew, currentAdNo } = props
    const [editMod, setEditMod] = useState(0)
    const [modInfo, setModInfo] = useState()
   
    //hiển thị form sửa thông tin quản trị
    const displayEditMod = () => {
        switch (editMod) {
            case 1: return <ModeratorInformation setDisplay={setEditMod} modInfo={modInfo} setModInfo={setModInfo} />
            default: return;
        }
    }
    //biến hiển thị thông báo
    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type: "CONFIRMATION", //CONFIRMATION, INFORMATION
        title: "", // title of the notifications
        content: "", // content of the notify
        infoType: ""
    })
    //gọi api xóa mod
    const callApiDelete = async (id) => {
        const caller = new ApiCaller()
        await caller.delete("moderators/" + id)
        setModInfo({...modInfo, mod_id: id})
    }
    //thông báo xóa mod
    const notifyDeleteAdmin = (id) => {
        setNotify({
            ...notify,
            title: "Xác nhận",
            content: "Xóa quản trị viên?",
            handle: () => callApiDelete(id)
        })
        setShow(true)
    }
    //danh sách mod
    const [mods, setMods] = useState([])
    //danh sách mod đã lọc
    const [filter, setFilter] = useState([])

    //lấy danh sách mod từ server
    useEffect(() => {
        (async () => {
            const caller = new ApiCaller();
            let data = await caller.get('moderators')
            setMods(data.items)
        })(); // IIFE // Note setProduct([...products, item])
    }, [modInfo])

    //thêm mod mới vào mảng
    useEffect(() => {
        setMods(pre=>([...pre, newMod]))
    }, [newMod])
    //lọc danh sách quản trị
    const filterModerator = (message) => {
        const newArray = mods.filter(item => item.mod_name.includes(message))
        setFilter(newArray)
    }
    return (
        <div className="ListLayout">
            <div className="ProductToolHeader">
                <AdminButton IconName={faPlus} ClickEvent={() => setAddNew(1)} />
                <AdminSearchInput filterModerator={filterModerator} />
            </div>
            <li className="ModeratorListHeader">
                <p>Mã số</p>
                <p>Họ tên</p>
                <p>CMND</p>
                <p>SĐT</p>
                <p>Giới tính</p>
                <p>Địa chỉ</p>
                <p>Trạng thái</p>
                <p>Hành động</p>
            </li>
            <div className="AdminListClass">
                {filter.length === 0 ? (
                    mods.map((item, index) => item.mod_no!==currentAdNo ? (<Moderator key={index} info={item} setEditMod={setEditMod} setModInfo={setModInfo} notify={notify} show={show} setShow={setShow} notifyDeleteAdmin={notifyDeleteAdmin} />):(<></>))
                ) : (
                    filter.map((item, index) => item.mod_no!==currentAdNo ? (<Moderator key={index} info={item} setEditMod={setEditMod} setModInfo={setModInfo} notify={notify} show={show} setShow={setShow} notifyDeleteAdmin={notifyDeleteAdmin} />):(<></>))
                )}
            </div>
            {displayEditMod()}
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </div>
    )
}

const Moderator = (props) => {
    const { info, setEditMod, setModInfo, notifyDeleteAdmin } = props
    return (
        <>
            <li className="ModeratorList">
                <p>{info.mod_no}</p>
                <p>{info.mod_name}</p>
                <p>{info.mod_id}</p>
                <p>{info.mod_phoneNumber}</p>
                <p>{info.mod_sex===1?'Nam':'Nữ'}</p>
                <p>{info.mod_address}</p>
                <p>{(info.mod_password)?("Kích hoạt"):("Vô hiệu")}</p>
                <p><AdminButton IconName={faEdit} ClickEvent={() => { setEditMod(1); setModInfo(info) }} /> <AdminButton IconName={faTrashAlt} ClickEvent={() => notifyDeleteAdmin(info.mod_no)} /></p>
            </li>
        </>
    )
}

export default MorderatorList