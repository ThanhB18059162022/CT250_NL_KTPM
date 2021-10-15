import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { AdminButton } from "../../Controls"
import Notifications from "../../../common/Notifications"
import "./Admin.Style.scss"
import { useEffect, useState } from "react"

const AdminInformation = (props) => {
  
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

    const notifySaveAdminInformation = () => {
        setNotify({
            ...notify,
            title: "Thông báo",
            content: "Đã lưu thông tin",
            infoType: 'SUCCESS'
        })
        setShow(true)
    }

    return (
        <>
            <div className="BgAdminHeaderPopup">
                <div className="AdminInformation">
                    <div className="InfomationHeader">
                        <AdminButton ClickEvent={notifySaveAdminInformation} IconName={faSave} />
                        <h2>Thông tin</h2>
                        <AdminButton IconName={faWindowClose} ClickEvent={() => props.setState(0)} />
                    </div>
                    <form className="AdminInformationForm">
                        <div>
                            <span>Mã quản trị:</span>
                            <input name="txtAdminNo" className="TextField" type="text" disabled />
                        </div>
                        <div>
                            <span>Họ tên:</span>
                            <input name="txtAdminName" className="TextField" type="text" />
                        </div>
                        <div>
                            <span>CMND:</span>
                            <input name="txtAdminID" className="TextField" type="text" />
                        </div>
                        <div>
                            <span>SĐT:</span>
                            <input name="txtAdminPhone" className="TextField" type="text" />
                        </div>
                        <div>
                            <span>Giới tính:</span>
                            <div className="Sex">
                                <input type="radio" name="radSex" value="Nam" /> <label>Name</label>
                                <input type="radio" name="radSex" value="Nữ" /> <label>Nữ</label>
                            </div>
                        </div>
                        <div>
                            <span>Địa chỉ:</span>
                            <textarea rows="5" />
                        </div>
                    </form>
                </div>
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    )
}

export default AdminInformation