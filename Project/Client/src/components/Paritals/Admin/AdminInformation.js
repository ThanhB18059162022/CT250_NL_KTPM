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
                            <input type="radio" name="radSex"/> &nbsp; Nam &nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio" name="radSex"/> &nbsp; Nữ
                        </div>
                    </div>
                    <div>
                        <p>Địa chỉ:</p>
                        <textarea rows="5"/>
                    </div>
                </form>
                <div className="AdminInformationBtn">
                    <AdminButton ClickEvent={()=>{alert("Đã lưu thông tin!"); props.setState(0)}} style={cusStyle} IconName={faSave}/>
                    <AdminButton IconName={faWindowClose} ClickEvent={()=>props.setState(0)}/>
                </div>
            </div>
        </div>
    )
}

export default AdminInformation