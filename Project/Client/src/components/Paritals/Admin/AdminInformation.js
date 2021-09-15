import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { AdminButton } from "../../Controls"
import Notifications from "../../../common/Notifications"
import "./Admin.Style.scss"
import { useState } from "react"

const AdminInformation = (props) => {
    const cusStyle = {
        margin: "0 1% 2% 42%"
    }
    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type :"INFORMATION", //CONFIRMARTION, INFORMATION
        title :"", // title of the notifications
        content :"", // content of the notify
        infoType :""
      })
    
      const notifySaveAdminInformation = () =>{
          setNotify({
              ...notify,
              title:"Thông báo",
              content:"Đã lưu thông tin",
              infoType:'SUCCESS'
          })
          setShow(true)
      }

    return(
        <>
            <div className="BgAdminHeaderPopup">
                <div className="AdminInformation">
                    <h1>Thông tin</h1>
                    <form className="AdminInformationForm">
                        <div>
                            <p>Mã quản trị:</p>
                            <input name="txtAdminNo" className="TextField" type="text" disabled/>
                        </div>
                        <div>
                            <p>Họ tên:</p>
                            <input name="txtAdminName" className="TextField" type="text"/>
                        </div>
                        <div>
                            <p>CMND:</p>
                            <input name="txtAdminID" className="TextField" type="text"/>
                        </div>
                        <div>
                            <p>SĐT:</p>
                            <input name="txtAdminPhone" className="TextField" type="text"/>
                        </div>
                        <div>
                            <p>Giới tính:</p>
                            <div className="Sex">
                                <input type="radio" name="radSex" value="Nam"/> &nbsp; Nam &nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" name="radSex" value="Nữ"/> &nbsp; Nữ
                            </div>
                        </div>
                        <div>
                            <p>Địa chỉ:</p>
                            <textarea rows="5"/>
                        </div>
                    </form>
                    <div className="AdminInformationBtn">
                        <AdminButton ClickEvent={notifySaveAdminInformation} style={cusStyle} IconName={faSave}/>
                        <AdminButton IconName={faWindowClose} ClickEvent={()=>props.setState(0)}/>
                    </div>
                </div>
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default AdminInformation