import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { AdminButton } from "../../Controls"
import Notifications from "../../../common/Notifications"
import "./Admin.Style.scss"
import { useEffect, useState } from "react"
import ApiCaller from "../../../api_services/ApiCaller"

const AdminInformation = (props) => {
    const {adminInfo, setAdminInfoChanged, setState} = props
    const [show, setShow] = useState(false)

    useEffect(() => {
        document.querySelector('html').style.overflow = 'hidden'
        return () => document.querySelector('html').style.overflow = 'visible'
    }, [])

    const [notify, setNotify] = useState({
        type: "INFORMATION", //CONFIRMARTION, INFORMATION
        title: "", // title of the notifications
        content: "", // content of the notify
        infoType: ""
    })
    //Thông báo lưu thông tin admin thành công
    const notifySaveAdminInformation = () => {
        setNotify({
            ...notify,
            title: "Thông báo",
            content: "Đã lưu thông tin",
            infoType: 'SUCCESS'
        })
        setShow(true)
    }
    //gọi api lưu thông tin admin
    const SaveAdminInfo = async (adminInfoTmp) => {
        const caller = new ApiCaller()
        await caller.put("moderators/" + adminInfo.mod_no, adminInfoTmp)
        setAdminInfoChanged(1)
        notifySaveAdminInformation()
        setTimeout(() => {
            setState(0)
        }, 2000)
      }
    //biến thông tin admin tmp
    const [adminInfoTmp, setAdminInfoTmp] = useState({  mod_name: adminInfo.mod_name,
                                                        mod_id: adminInfo.mod_id,
                                                        mod_phoneNumber: adminInfo.mod_phoneNumber,
                                                        mod_sex: adminInfo.mod_sex===1?true:false,
                                                        mod_address: adminInfo.mod_address,
                                                        mod_role: adminInfo.mod_role,
                                                        mod_password: adminInfo.mod_password
                                                    })
    return (
        <>
            <div className="BgAdminHeaderPopup">
                <div className="AdminInformation">
                    <div className="InfomationHeader">
                        <AdminButton ClickEvent={()=>SaveAdminInfo(adminInfoTmp)} IconName={faSave} />
                        <h2>Thông tin</h2>
                        <AdminButton IconName={faWindowClose} ClickEvent={() => props.setState(0)} />
                    </div>
                    <form className="AdminInformationForm">
                        <div>
                            <span>Mã quản trị:</span>
                            <input name="txtAdminNo" className="TextField" type="text" defaultValue={adminInfo.mod_no} readOnly />
                        </div>
                        <div>
                            <span>Họ tên:</span>
                            <input name="txtAdminName" className="TextField" type="text" value={adminInfoTmp.mod_name} onChange={e => setAdminInfoTmp({...adminInfoTmp, mod_name: e.target.value})}/>
                        </div>
                        <div>
                            <span>CMND:</span>
                            <input name="txtAdminID" className="TextField" type="text" value={adminInfoTmp.mod_id} onChange={e => setAdminInfoTmp({...adminInfoTmp, mod_id: e.target.value})}/>
                        </div>
                        <div>
                            <span>SĐT:</span>
                            <input name="txtAdminPhone" className="TextField" type="text" value={adminInfoTmp.mod_phoneNumber} onChange={e => setAdminInfoTmp({...adminInfoTmp, mod_phoneNumber: e.target.value})}/>
                        </div>
                        <div>
                            <span>Giới tính:</span>
                            <div className="Sex">
                                <input type="radio" name="radSex" value="Nam" checked={(adminInfoTmp.mod_sex===true)?true:false} onChange={e => setAdminInfoTmp({ ...adminInfoTmp, mod_sex: true })}/> <label>Nam</label>
                                <input type="radio" name="radSex" value="Nữ" checked={(adminInfoTmp.mod_sex===false)?true:false} onChange={e => setAdminInfoTmp({ ...adminInfoTmp, mod_sex: false })}/> <label>Nữ</label>
                            </div>
                        </div>
                        <div>
                            <span>Địa chỉ:</span>
                            <textarea rows="5" value={adminInfoTmp.mod_address} onChange={e => setAdminInfoTmp({...adminInfoTmp, mod_address: e.target.value})}/>
                        </div>
                    </form>
                </div>
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    )
}

export default AdminInformation