import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons"
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
                    <AdminButton ClickEvent={()=>{alert("Đã đổi mật khẩu!"); props.setState(0)}} style={cusStyle} IconName={faSave}/>
                    <AdminButton IconName={faWindowClose} ClickEvent={()=>props.setState(0)}/>
                </div>
            </div>
        </div>
    )
}

export default ChangePwd