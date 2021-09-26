import { useState } from "react"
import Notifications from "../../common/Notifications"
import Helper from "../../helpers"

const LoginContainer = () => {
    // Show or not the notify
    const [show, setShow] = useState(false)

    // Notify content
    const [notify, setNotify] = useState({
        content: "",
        title: "",
        type: "INFORMATION",
        infoType: "INFO",
        onHideRequest: setShow,
    })

    // Login information
    const [loginInfo, setLogin] = useState({
        username: '',
        password: ''
    })

    // notify on error // need updating when you want to show it
    const onError = (title = "unknown", content = "unknown", infoType = "INFO") => {
        setNotify({
            ...notify,
            content,
            title,
            infoType
        })
        setShow(true)
    }

    const _validation = () => {
        let result = Helper.TransactionValidator.checkingUsername(loginInfo.username)
        if (!result.result) {
            onError("Tài khoản trống", result.message, "WARN");
            return false
        }

        result = Helper.TransactionValidator.checkingPassword(loginInfo.password)

        if (!result.result) {
            onError("Mật khẩu trống", result.message, "WARN");
            return false
        }
        return true;
    }

    // on login handle
    const loginHandle = () => {
        if (!_validation()) return;

        // add your handle code here............


    }

    return (
        <>
            <div className="LoginContainer">
                <p>Octopus</p>
                <div className="loginwrapper">
                    <div className="login_header">
                        <h2>Đăng nhập</h2>
                        <p>Trang quản lý dành cho quản trị viên</p>
                    </div>

                    <div className="login_form">
                        <input id="username" type="text" required
                            value={loginInfo.username}
                            onChange={e => setLogin({ ...loginInfo, username: e.target.value })} />
                        <label htmlFor="username">Tài khoản</label>
                    </div>

                    <div className="login_form">
                        <input id="password" type="password" required
                            value={loginInfo.password}
                            onChange={e => setLogin({ ...loginInfo, password: e.target.value })} />
                        <label htmlFor="password">Mật khẩu</label>
                    </div>

                    <div className="login_form">
                        <button onClick={loginHandle}>Đăng nhập</button>
                    </div>

                </div>
            </div>
            <Notifications {...notify} isShow={show} />
        </>
    )

}

export default LoginContainer