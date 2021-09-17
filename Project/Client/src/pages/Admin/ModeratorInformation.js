import {
  faKey,
  faSave,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Notifications from "../../common/Notifications";
import { AdminButton } from "../../components/Controls";
import "../../components/Paritals/Admin/Admin.Style.scss";

const ModeratorInformation = (props) => {
  const {setDisplay, modInfo} = props
  const cusStyle = {
    margin: `0 0 0 ${!modInfo ? "45%" : "40%"}`,
  };

  const [show, setShow] = useState(false)
  
  const [notify, setNotify] = useState({
    type :"INFORMATION", //CONFIRMATION, INFORMATION
    title :"", // title of the notifications
    content :"", // content of the notify
    infoType :""
  })

  const notifyResetPassword = () =>{
      setNotify({
          ...notify,
          title:"Thông báo",
          content:"Đã đặt lại mật khẩu",
          infoType:'SUCCESS'
      })
      setShow(true)
  }

  const notifyCreateMod = () =>{
      setNotify({
          ...notify,
          title:"Thông báo",
          content:"Đã tạo quản trị viên",
          infoType:'SUCCESS'
      })
      setShow(true)
  }
  const notifyEditMod = () =>{
      setNotify({
          ...notify,
          title:"Thông báo",
          content:"Đã lưu thông tin quản trị viên",
          infoType:'SUCCESS'
      })
      setShow(true)
  }

  return (
    <>
      {!modInfo ? (
        <div className="ModeratorInformation">
          <div className="ModeratorInformationBoder">
            <button onClick={() => setDisplay(0)} className="CloseBtn">
              <FontAwesomeIcon icon={faWindowClose} />
            </button>
            <h1>Tạo mới quản trị viên</h1>
            <form className="ModInfoForm">
              <div>
                <p>Mã số:</p>
                <input name="txtModNo" type="text" className="TextField" disabled></input>
              </div>
              <div>
                <p>Họ tên:</p>
                <input name="txtModName" type="text" className="TextField"></input>
              </div>
              <div>
                <p>CMND:</p>
                <input name="txtModID" type="text" className="TextField"></input>
              </div>
              <div>
                <p>SĐT:</p>
                <input name="txtModPhoneNumber" type="text" className="TextField"></input>
              </div>
              <div>
                <p>Giới tính:</p>
                <div className="Sex">
                  <input name="txtModSex" type="radio"></input>&nbsp; Nam &nbsp;&nbsp;&nbsp;&nbsp;
                  <input name="txtModSex" type="radio"></input>&nbsp; Nữ
                </div>
              </div>
              <div>
                <p>Địa chỉ:</p>
                <textarea name="txtModAddress" rows="5"></textarea>
              </div>
            </form>
            <AdminButton
              style={cusStyle}
              ClickEvent={notifyCreateMod}
              IconName={faSave}
            />
          </div>
        </div>
      ) : (
        <div className="ModeratorInformation">
          <div className="ModeratorInformationBoder">
            <button onClick={() => setDisplay(0)} className="CloseBtn">
              <FontAwesomeIcon icon={faWindowClose} />
            </button>
            <h1>Chỉnh sửa quản trị viên</h1>
            <form className="ModInfoForm">
              <div>
                <p>Mã số:</p>
                <input name="txtModNo" type="text" className="TextField" disabled defaultValue={modInfo.mod_no}></input>
              </div>
              <div>
                <p>Họ tên:</p>
                <input name="txtModName" type="text" className="TextField" defaultValue={modInfo.mod_name}></input>
              </div>
              <div>
                <p>CMND:</p>
                <input name="txtModID" type="text" className="TextField" defaultValue={modInfo.mod_id}></input>
              </div>
              <div>
                <p>SĐT:</p>
                <input name="txtModPhoneNumber" type="text" className="TextField" defaultValue={modInfo.mod_phoneNumber}></input>
              </div>
              <div>
                <p>Giới tính:</p>
                <div className="Sex">
                  <input name="txtModSex" type="radio" checked={modInfo.mod_sex==="male"?true:false}></input>&nbsp; Nam &nbsp;&nbsp;&nbsp;&nbsp;
                  <input name="txtModSex" type="radio" checked={modInfo.mod_sex==="female"?true:false}></input>&nbsp; Nữ
                </div>
              </div>
              <div>
                <p>Địa chỉ:</p>
                <textarea name="txtModAddress" rows="5" defaultValue={modInfo.mod_address}></textarea>
              </div>
            </form>
            <AdminButton
              style={cusStyle}
              ClickEvent={notifyResetPassword}
              IconName={faKey}
            />{" "}
            &nbsp;
            <AdminButton
              ClickEvent={notifyEditMod}
              IconName={faSave}
            />
          </div>
        </div>
      )}
      <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
    </>
  );
};

export default ModeratorInformation;
