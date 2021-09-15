import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { AdminButton } from "../../Controls"
import { useState } from "react"
import Notifications from "../../../common/Notifications"
import "./Admin.Style.scss"

const ChangePwd = (props) => {
    const cusStyle = {
        margin: "0 1% 2% 40%"
    }

    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
      type :"INFORMATION", //CONFIRMARTION, INFORMATION
      title :"", // title of the notifications
      content :"", // content of the notify
      infoType :""
    })
  
    const notifySavePassword = () =>{
        setNotify({
            ...notify,
            title:"Thông báo",
            content:"Đã lưu mật khẩu",
            infoType:'SUCCESS'
        })
        setShow(true)
    }

    return(
        <>
            <div className="BgAdminHeaderPopup">
                <div className="ChangePwd">
                    <h1>Đổi mật khẩu</h1>
                    <form>
                        <div>
                            <p>Mật khẩu cũ:</p>
                            <input name="txtOldPwd" type="password"/>
                        </div>
                        <div>
                            <p>Mật khẩu mới:</p>
                            <input name="txtNewPwd" type="password"/>
                        </div>
                        <div>
                            <p>Xác nhận mật khẩu:</p>
                            <input name="txtConfirmPwd" type="password"/>
                        </div>
                    </form>
                    <div>
                        <AdminButton ClickEvent={ notifySavePassword } style={cusStyle} IconName={faSave}/>
                        <AdminButton IconName={faWindowClose} ClickEvent={()=>props.setState(0)}/>
                    </div>
                </div>
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default ChangePwd