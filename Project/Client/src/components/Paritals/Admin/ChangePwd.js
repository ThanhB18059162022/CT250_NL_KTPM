import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { AdminButton } from "../../Controls"
import { useEffect, useState } from "react"
import Notifications from "../../../common/Notifications"
import "./Admin.Style.scss"

const ChangePwd = (props) => {

    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type: "INFORMATION", //CONFIRMARTION, INFORMATION
        title: "", // title of the notifications
        content: "", // content of the notify
        infoType: ""
    })

    const notifySavePassword = () => {
        setNotify({
            ...notify,
            title: "Thông báo",
            content: "Đã lưu mật khẩu",
            infoType: 'SUCCESS'
        })
        setShow(true)
    }

    useEffect(() => {
        document.querySelector('html').style.overflow = 'hidden'
        return () => document.querySelector('html').style.overflow = 'visible'
    }, [])

    return (
        <>
            <div className="BgAdminHeaderPopup">
                <div className="ChangePwd">
                    <div className="ChangePwdHeader">
                        <AdminButton ClickEvent={notifySavePassword} IconName={faSave} />
                        <h2>Đổi mật khẩu</h2>
                        <AdminButton IconName={faWindowClose} ClickEvent={() => props.setState(0)} />
                    </div>
                    <form>
                        <div>
                            <span>Mật khẩu cũ:</span>
                            <input name="txtOldPwd" type="password" />
                        </div>
                        <div>
                            <span>Mật khẩu mới:</span>
                            <input name="txtNewPwd" type="password" />
                        </div>
                        <div>
                            <span>Xác nhận mật khẩu:</span>
                            <input name="txtConfirmPwd" type="password" />
                        </div>
                    </form>
                </div>
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    )
}

export default ChangePwd