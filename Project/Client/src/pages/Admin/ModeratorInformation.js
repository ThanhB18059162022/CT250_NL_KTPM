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
  const {setDisplay, modNo} = props
  const cusStyle = {
    margin: `0 0 0 ${!modNo ? "45%" : "40%"}`,
  };

  const [show, setShow] =useState(false)
  
  const [notify, setNotify] = useState({
    type :"INFORMATION", //CONFIRMARTION, INFORMATION
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

  return (
    <>
      {!modNo ? (
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
              ClickEvent={() => {
                alert("Da tao quan tri vien");
                setDisplay(0);
              }}
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
                <input name="txtModNo" type="text" className="TextField" disabled value={modNo}></input>
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
              ClickEvent={notifyResetPassword}
              IconName={faKey}
            />{" "}
            &nbsp;
            <AdminButton
              ClickEvent={() => {
                alert("da luu");
                setDisplay(0);
              }}
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
