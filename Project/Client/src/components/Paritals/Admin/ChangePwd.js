import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { AdminButton } from "../../Controls";
import { useEffect, useState } from "react";
import Notifications from "../../../common/Notifications";
import "./Admin.Style.scss";
import ApiCaller from "../../../api_services/ApiCaller";
// import { sha256 } from "js-sha256"
// Khỏi xài thư viện ngoài
const crypto = require("crypto");
const sha256 = (pwd) => crypto.createHash("sha256").update(pwd).digest("hex");

const ChangePwd = (props) => {
    const { adminInfo, setAdminInfoChanged, setState } = props;
    const [show, setShow] = useState(false);

    const [notify, setNotify] = useState({
        type: "INFORMATION", //CONFIRMARTION, INFORMATION
        title: "", // title of the notifications
        content: "", // content of the notify
        infoType: "",
    });
    //thông báo đổi pwd thành công
    const notifySavePassword = () => {
        setNotify({
            ...notify,
            title: "Thông báo",
            content: "Đã lưu mật khẩu",
            infoType: "SUCCESS",
        });
        setShow(true);
    };
    //thông báo đổi pwd thất bại
    const notifyWrongPassword = () => {
        setNotify({
            ...notify,
            title: "Thông báo",
            content: "Mật khẩu chưa chính xác",
            infoType: "ERROR",
        });
        setShow(true);
    };
    //biến thông tin admin tmp
    const adminInfoTmp = {
        mod_name: adminInfo.mod_name,
        mod_id: adminInfo.mod_id,
        mod_phoneNumber: adminInfo.mod_phoneNumber,
        mod_sex: adminInfo.mod_sex === 1 ? true : false,
        mod_address: adminInfo.mod_address,
        mod_role: adminInfo.mod_role,
        mod_password: adminInfo.mod_password,
    };
    //gọi api lưu pwd
    const SavePassword = async (pwd) => {
        if (
            sha256(adminInfo.mod_username + "-" + pwd.old_pwd) === adminInfo.mod_password &&
            pwd.new_pwd === pwd.cfm_pwd
        ) {
            const caller = new ApiCaller();
            await caller.put("moderators/" + adminInfo.mod_no, {...adminInfoTmp,mod_password: sha256(adminInfo.mod_username + "-" + pwd.new_pwd) } );
            setAdminInfoChanged(1);
            notifySavePassword();
            setTimeout(() => {
                setState(0);
            }, 2000);
        } else notifyWrongPassword();
    };

    useEffect(() => {
        document.querySelector("html").style.overflow = "hidden";
        return () => (document.querySelector("html").style.overflow = "visible");
    }, []);

    //biến pwd tiền xử lý
    const [pwd, setPwd] = useState({});
    return (
        <>
            <div className='BgAdminHeaderPopup'>
                <div className='ChangePwd'>
                    <div className='ChangePwdHeader'>
                        <AdminButton ClickEvent={() => SavePassword(pwd)} IconName={faSave} />
                        <h2>Đổi mật khẩu</h2>
                        <AdminButton
                            IconName={faWindowClose}
                            ClickEvent={() => props.setState(0)}
                        />
                    </div>
                    <form>
                        <div>
                            <span>Mật khẩu cũ:</span>
                            <input
                                name='txtOldPwd'
                                type='password'
                                onChange={(e) => setPwd({ ...pwd, old_pwd: e.target.value })}
                            />
                        </div>
                        <div>
                            <span>Mật khẩu mới:</span>
                            <input
                                name='txtNewPwd'
                                type='password'
                                onChange={(e) => setPwd({ ...pwd, new_pwd: e.target.value })}
                            />
                        </div>
                        <div>
                            <span>Xác nhận mật khẩu:</span>
                            <input
                                name='txtConfirmPwd'
                                type='password'
                                onChange={(e) => setPwd({ ...pwd, cfm_pwd: e.target.value })}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    );
};

export default ChangePwd;
