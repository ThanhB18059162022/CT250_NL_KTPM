import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Notifications from "../../common/Notifications";
import { AdminButton } from "../../components/Controls";
import "../../components/Paritals/Admin/Admin.Style.scss";
import ApiCaller from "../../api_services/ApiCaller";
// import { sha256 } from "js-sha256"

const crypto = require("crypto");
const sha256 = (pwd) => crypto.createHash("sha256").update(pwd).digest("hex");

const ModeratorInformation = (props) => {
    const { setDisplay, modInfo, setNewMod, setModInfo } = props;

    //biến hiển thị thông báo
    const [show, setShow] = useState(false);

    const [notify, setNotify] = useState({
        type: "INFORMATION", //CONFIRMATION, INFORMATION
        title: "", // title of the notifications
        content: "", // content of the notify
        infoType: "",
    });
    //thông báo tạo mod mới
    const notifyCreateMod = () => {
        setNotify({
            ...notify,
            title: "Thông báo",
            content: "Đã tạo quản trị viên",
            infoType: "SUCCESS",
        });
        setShow(true);
    };
    //thông báo sửa thông tin mod
    const notifyEditMod = () => {
        setNotify({
            ...notify,
            title: "Thông báo",
            content: "Đã lưu thông tin quản trị viên",
            infoType: "SUCCESS",
        });
        setShow(true);
    };
    //mod tạm
    const [modTmp, setModTmp] = useState({
        mod_name: "",
        mod_id: "",
        mod_phoneNumber: "",
        mod_sex: "",
        mod_address: "",
        mod_role: 0,
        mod_username: "",
        mod_password: "",
    });
    //gọi api tạo quản trị mới
    const CreateMod = async (modTmp) => {
        const caller = new ApiCaller();
        await caller.post("moderators", modTmp);
        setNewMod(modTmp);
        notifyCreateMod();
        setTimeout(() => {
            setDisplay(0);
        }, 2000);
    };
    //gán thông tin mod cần chỉnh thông tin cho modTmp
    if (modInfo && modTmp.mod_name.length === 0) {
        setModTmp({
            mod_name: modInfo.mod_name,
            mod_id: modInfo.mod_id,
            mod_phoneNumber: modInfo.mod_phoneNumber,
            mod_sex: modInfo.mod_sex === 1 ? true : false,
            mod_address: modInfo.mod_address,
            mod_role: modInfo.mod_role,
            mod_password: modInfo.mod_password,
        });
    }

    //gọi api cập nhật thông tin mod
    const callApiUpdateMod = async (modTmp) => {
        const caller = new ApiCaller();
        await caller.put("moderators/" + modInfo.mod_no, modTmp);
        setModInfo(modTmp);
        notifyEditMod();
        setTimeout(() => {
            setDisplay(0);
        }, 3000);
    };

    return (
        <>
            {!modInfo ? (
                //tạo mới quản trị
                <div className='ModeratorInformation'>
                    <div className='ModeratorInformationBoder'>
                        <div className='ModeratorHeader'>
                            <AdminButton ClickEvent={() => CreateMod(modTmp)} IconName={faSave} />
                            <h2>Tạo mới quản trị viên</h2>
                            <button onClick={() => setDisplay(0)} className='CloseBtn'>
                                <FontAwesomeIcon icon={faWindowClose} />
                            </button>
                        </div>
                        <form className='ModInfoForm'>
                            <div>
                                <p>Họ tên:</p>
                                <input
                                    name='txtModName'
                                    type='text'
                                    className='TextField'
                                    onChange={(e) =>
                                        setModTmp({ ...modTmp, mod_name: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <p>CMND:</p>
                                <input
                                    name='txtModID'
                                    type='text'
                                    className='TextField'
                                    onChange={(e) =>
                                        setModTmp({ ...modTmp, mod_id: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <p>SĐT:</p>
                                <input
                                    name='txtModPhoneNumber'
                                    type='text'
                                    className='TextField'
                                    onChange={(e) =>
                                        setModTmp({ ...modTmp, mod_phoneNumber: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <p>Giới tính:</p>
                                <div className='Sex'>
                                    <input
                                        name='txtModSex'
                                        type='radio'
                                        onChange={() => setModTmp({ ...modTmp, mod_sex: true })}
                                    />{" "}
                                    <label>Nam</label>
                                    <input
                                        name='txtModSex'
                                        type='radio'
                                        onChange={() => setModTmp({ ...modTmp, mod_sex: false })}
                                    />{" "}
                                    <label>Nữ</label>
                                </div>
                            </div>
                            <div>
                                <p>Địa chỉ:</p>
                                <textarea
                                    name='txtModAddress'
                                    rows='5'
                                    onChange={(e) =>
                                        setModTmp({ ...modTmp, mod_address: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <p>Vai trò:</p>
                                <div className='Role'>
                                    <input
                                        name='txtModRole'
                                        type='radio'
                                        onChange={() => setModTmp({ ...modTmp, mod_role: 1 })}
                                    />{" "}
                                    <label>Quản trị</label>
                                    <input
                                        name='txtModRole'
                                        type='radio'
                                        onChange={() => setModTmp({ ...modTmp, mod_role: 0 })}
                                    />{" "}
                                    <label>Nhân viên</label>
                                </div>
                            </div>
                            <div>
                                <p>Tài khoản:</p>
                                <input
                                    name='txtModUserName'
                                    type='text'
                                    className='TextField'
                                    onChange={(e) =>
                                        setModTmp({ ...modTmp, mod_username: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <p>Mật khẩu:</p>
                                <input
                                    name='txtModPassword'
                                    type='password'
                                    className='TextField'
                                    onChange={(e) =>
                                        setModTmp({
                                            ...modTmp,
                                            mod_password: sha256(
                                                modTmp.mod_username + "-" + e.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                //sửa thông tin quản trị
                <div className='ModeratorInformation'>
                    <div className='ModeratorInformationBoder'>
                        <div className='ModeratorHeader'>
                            <AdminButton
                                ClickEvent={() => callApiUpdateMod(modTmp)}
                                IconName={faSave}
                            />
                            <h2>Chỉnh sửa quản trị viên</h2>
                            <button onClick={() => setDisplay(0)} className='CloseBtn'>
                                <FontAwesomeIcon icon={faWindowClose} />
                            </button>
                        </div>
                        <form className='ModInfoForm' onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <p>Mã số:</p>
                                <input
                                    name='txtModNo'
                                    type='text'
                                    className='TextField'
                                    disabled
                                    defaultValue={modInfo.mod_no}
                                />
                            </div>
                            <div>
                                <p>Họ tên:</p>
                                <input
                                    name='txtModName'
                                    type='text'
                                    className='TextField'
                                    value={modTmp.mod_name}
                                    onChange={(e) =>
                                        setModTmp({ ...modTmp, mod_name: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <p>CMND:</p>
                                <input
                                    name='txtModID'
                                    type='text'
                                    className='TextField'
                                    value={modTmp.mod_id}
                                    onChange={(e) =>
                                        setModTmp({ ...modTmp, mod_id: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <p>SĐT:</p>
                                <input
                                    name='txtModPhoneNumber'
                                    type='text'
                                    className='TextField'
                                    value={modTmp.mod_phoneNumber}
                                    onChange={(e) =>
                                        setModTmp({ ...modTmp, mod_phoneNumber: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <p>Giới tính:</p>
                                <div className='Sex'>
                                    <input
                                        name='txtModSex'
                                        type='radio'
                                        checked={modTmp.mod_sex === true ? true : false}
                                        onChange={(e) => setModTmp({ ...modTmp, mod_sex: true })}
                                    />
                                    &nbsp; Nam &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input
                                        name='txtModSex'
                                        type='radio'
                                        checked={modTmp.mod_sex === false ? true : false}
                                        onChange={(e) => setModTmp({ ...modTmp, mod_sex: false })}
                                    />
                                    &nbsp; Nữ
                                </div>
                            </div>
                            <div>
                                <p>Địa chỉ:</p>
                                <textarea
                                    name='txtModAddress'
                                    rows='5'
                                    value={modTmp.mod_address}
                                    onChange={(e) =>
                                        setModTmp({ ...modTmp, mod_address: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <p>Vai trò:</p>
                                <div className='Role'>
                                    <input
                                        name='txtModRole'
                                        type='radio'
                                        checked={modTmp.mod_role === 1 ? true : false}
                                        onChange={() => setModTmp({ ...modTmp, mod_role: 1 })}
                                    />{" "}
                                    <label>Quản trị</label>
                                    <input
                                        name='txtModRole'
                                        type='radio'
                                        checked={modTmp.mod_role === 0 ? true : false}
                                        onChange={() => setModTmp({ ...modTmp, mod_role: 0 })}
                                    />{" "}
                                    <label>Nhân viên</label>
                                </div>
                            </div>
                            <div>
                                <p>Mật khẩu:</p>
                                <input
                                    name='txtModPassword'
                                    type='password'
                                    className='TextField'
                                    onChange={(e) =>
                                        setModTmp({
                                            ...modTmp,
                                            mod_password: sha256(
                                                modInfo.mod_username + "-" + e.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    );
};

export default ModeratorInformation;
