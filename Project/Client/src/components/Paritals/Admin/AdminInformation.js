import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { AdminButton } from "../../Controls"
import "./Admin.Style.scss"

const AdminInformation = (props) => {
    const cusStyle = {
        margin: "0 1% 2% 42%"
    }
    return(
        <div className="BgAdminHeaderPopup">
            <div className="AdminInformation">
                <h1>Thông tin</h1>
                <form>
                    <ul className="InfoTitle">
                        <li>Mã quản trị</li>
                        <li>Họ tên</li>
                        <li>CMND</li>
                        <li>SĐT</li>
                        <li>Giới tính</li>
                        <li>Địa chỉ</li>
                    </ul>
                    <ul className="InfoField">
                        <li><input name="txtAdminNo" className="TextField" type="text" disabled/></li>
                        <li><input name="txtAdminName" className="TextField" type="text"/></li>
                        <li><input name="txtAdminID" className="TextField" type="text"/></li>
                        <li><input name="txtAdminPhone" className="TextField" type="text"/></li>
                        <li>
                            <input type="radio" name="radSex"/> Nam &nbsp;
                            <input type="radio" name="radSex"/> Nữ
                        </li>
                        <li><textarea cols="80" rows="5"/></li>
                    </ul>
                </form>
                <div>
                    <AdminButton SaveClicked={()=>{alert("Đã lưu thông tin!"); props.setState(0)}} style={cusStyle} IconName={faSave}/>
                    <AdminButton IconName={faWindowClose} CloseClicked={()=>props.setState(0)}/>
                </div>
            </div>
        </div>
    )
}

export default AdminInformation