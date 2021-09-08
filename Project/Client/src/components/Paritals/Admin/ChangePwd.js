import { AdminButton } from "../../Controls"
import "./Admin.Style.scss"

const ChangePwd = (props) => {
    const cusStyle = {
        margin: "0 1% 2% 40%"
    }
    return(
        <div className="BgAdminHeaderPopup">
            <div className="ChangePwd">
                <h1>Đổi mật khẩu</h1>
                <form>
                    <ul className="PwdTitle">
                        <li>Mật khẩu cũ</li>
                        <li>Mật khẩu mới</li>
                        <li>Xác nhận mật khẩu</li>
                    </ul>
                    <ul className="PwdField">
                        <li><input name="txtOldPwd" type="password"/></li>
                        <li><input name="txtNewPwd" type="password"/></li>
                        <li><input name="txtConfirmPwd" type="password"/></li>
                    </ul>
                </form>
                <div>
                    <AdminButton style={cusStyle} IconName="Save"/>
                    <AdminButton IconName="Close" CloseClicked={()=>props.setState(0)}/>
                </div>
            </div>
        </div>
    )
}

export default ChangePwd