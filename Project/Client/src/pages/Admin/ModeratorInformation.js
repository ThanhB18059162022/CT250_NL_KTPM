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
  const {setDisplay, modInfo, setNewMod, setModInfo, newModNo, mods, setMods, modsTmp, setModsTmp} = props
  const cusStyle = {
    margin: `0 0 0 ${!modInfo ? "45%" : "40%"}`,
  };
  //biến hiển thị thông báo
  const [show, setShow] = useState(false)
  
  const [notify, setNotify] = useState({
    type :"INFORMATION", //CONFIRMATION, INFORMATION
    title :"", // title of the notifications
    content :"", // content of the notify
    infoType :""
  })
  //thông báo reset pass
  const notifyResetPassword = () =>{
      setNotify({
          ...notify,
          title:"Thông báo",
          content:"Đã đặt lại mật khẩu",
          infoType:'SUCCESS'
      })
      setShow(true)
  }
  //thông báo tạo mod mới
  const notifyCreateMod = () =>{
      setNotify({
          ...notify,
          title:"Thông báo",
          content:"Đã tạo quản trị viên",
          infoType:'SUCCESS'
      })
      setShow(true)
  }
  //thông báo xóa mod
  const notifyEditMod = () =>{
      setNotify({
          ...notify,
          title:"Thông báo",
          content:"Đã lưu thông tin quản trị viên",
          infoType:'SUCCESS'
      })
      setShow(true)
  }
  //mod tạm
  const [modTmp, setModTmp] = useState({mod_no: newModNo, mod_name: "", mod_id: "", mod_phoneNumber: "", mod_sex: "", mod_address: ""})
  //tạo quản trị mới
  const CreateMod = () => {
      setNewMod(modTmp)
      notifyCreateMod()
      setTimeout(()=>{
        setDisplay(0)
      },2000)
  }
  //gọi api cập nhật thông tin mod
  const callApiUpdateMod = () => {
    setModInfo(modInfo)
    mods.map((item, index)=>index+1!==modInfo.mod_no ? (setModsTmp([...modsTmp, modsTmp[index] = item])) : (setModsTmp([...modsTmp, modsTmp[index] = modInfo])) )
    setMods([])
    setMods(modsTmp)
    notifyEditMod()
    setTimeout(() => {
      setDisplay(0)
    }, 3000);
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
                <input name="txtModNo" type="text" className="TextField" disabled defaultValue={newModNo}  />
              </div>
              <div>
                <p>Họ tên:</p>
                <input name="txtModName" type="text" className="TextField" onChange={e=>setModTmp({...modTmp, mod_name: e.target.value})} />
              </div>
              <div>
                <p>CMND:</p>
                <input name="txtModID" type="text" className="TextField" onChange={e=>setModTmp({...modTmp, mod_id: e.target.value})} />
              </div>
              <div>
                <p>SĐT:</p>
                <input name="txtModPhoneNumber" type="text" className="TextField" onChange={e=>setModTmp({...modTmp, mod_phoneNumber: e.target.value})} />
              </div>
              <div>
                <p>Giới tính:</p>
                <div className="Sex">
                  <input name="txtModSex" type="radio" onChange={()=>setModTmp({...modTmp, mod_sex: "male"})} />&nbsp; Nam &nbsp;&nbsp;&nbsp;&nbsp;
                  <input name="txtModSex" type="radio" onChange={()=>setModTmp({...modTmp, mod_sex: "female"})} />&nbsp; Nữ
                </div>
              </div>
              <div>
                <p>Địa chỉ:</p>
                <textarea name="txtModAddress" rows="5" onChange={e=>setModTmp({...modTmp, mod_address: e.target.value})} />
              </div>
            </form>
            <AdminButton
              style={cusStyle}
              ClickEvent={()=>CreateMod()}
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
                <input name="txtModNo" type="text" className="TextField" disabled defaultValue={modInfo.mod_no} />
              </div>
              <div>
                <p>Họ tên:</p>
                <input name="txtModName" type="text" className="TextField" value={modInfo.mod_name} onChange={e=>setModInfo({...modInfo, mod_name: e.target.value})}/>
              </div>
              <div>
                <p>CMND:</p>
                <input name="txtModID" type="text" className="TextField" value={modInfo.mod_id} onChange={e=>setModInfo({...modInfo, mod_id: e.target.value})}/>
              </div>
              <div>
                <p>SĐT:</p>
                <input name="txtModPhoneNumber" type="text" className="TextField" value={modInfo.mod_phoneNumber} onChange={e=>setModInfo({...modInfo, mod_phoneNumber: e.target.value})}/>
              </div>
              <div>
                <p>Giới tính:</p>
                <div className="Sex">
                  <input name="txtModSex" type="radio" checked={modInfo.mod_sex==="male"?true:false} onChange={e=>setModInfo({...modInfo, mod_sex: "male"})}/>&nbsp; Nam &nbsp;&nbsp;&nbsp;&nbsp;
                  <input name="txtModSex" type="radio" checked={modInfo.mod_sex==="female"?true:false} onChange={e=>setModInfo({...modInfo, mod_sex: "female"})}/>&nbsp; Nữ
                </div>
              </div>
              <div>
                <p>Địa chỉ:</p>
                <textarea name="txtModAddress" rows="5" value={modInfo.mod_address} onChange={e=>setModInfo({...modInfo, mod_address: e.target.value})}/>
              </div>
            </form>
            <AdminButton
              style={cusStyle}
              ClickEvent={notifyResetPassword}
              IconName={faKey}
            />{" "}
            &nbsp;
            <AdminButton
              ClickEvent={()=>callApiUpdateMod()}
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
