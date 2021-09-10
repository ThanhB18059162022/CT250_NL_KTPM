import { faKey, faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AdminButton } from "../../components/Controls"
import "../../components/Paritals/Admin/Admin.Style.scss"

const ModeratorInformation = (props) => {
    if(props.toDo === "addNew"){
        const cusStyle = {
            margin : "0 0 0 45%"
        }
        return(
            <div className="ModeratorInformation">
                <div className="ModeratorInformationBoder">
                    <button onClick={()=>props.setState(0)} className="CloseBtn"><FontAwesomeIcon icon={faWindowClose}/></button>
                    <h1>Tạo mới quản trị viên</h1>
                    <form className="ModInfoForm">
                        <div>
                            <p>Mã số</p>
                            <p>Họ tên</p>
                            <p>CMND</p>
                            <p>SĐT</p>
                            <p>Giới tính</p>
                            <p>Địa chỉ</p>
                        </div>
                        <div>
                            <input name="txtModNo" type="text" disabled></input> <br/>
                            <input name="txtModName" type="text"></input> <br/>
                            <input name="txtModID" type="text"></input> <br/>
                            <input name="txtModPhoneNumber" type="text"></input> <br/>
                            <input name="txtModSex" type="radio"></input> Nam &nbsp;
                            <input name="txtModSex" type="radio"></input> Nữ <br/>
                            <textarea name="txtModAddress" cols="80" rows="5"></textarea>
                        </div>
                    </form>
                    <AdminButton style={cusStyle} SaveClicked={()=>{alert("Da tao quan tri vien"); props.setState(0)}} IconName={faSave}/>
                </div>
            </div>
        )
    }
    else{
        const cusStyle = {
            margin : "0 0 0 40%"
        }
        return(
            <div className="ModeratorInformation">
                <div className="ModeratorInformationBoder">
                    <button onClick={()=>props.setState(0)} className="CloseBtn"><FontAwesomeIcon icon={faWindowClose}/></button>
                    <h1>Chỉnh sửa quản trị viên</h1>
                    <form className="ModInfoForm">
                        <div>
                            <p>Mã số</p>
                            <p>Họ tên</p>
                            <p>CMND</p>
                            <p>SĐT</p>
                            <p>Giới tính</p>
                            <p>Địa chỉ</p>
                        </div>
                        <div>
                            <input name="txtModNo" type="text" disabled value={props.id}></input> <br/>
                            <input name="txtModName" type="text"></input> <br/>
                            <input name="txtModID" type="text"></input> <br/>
                            <input name="txtModPhoneNumber" type="text"></input> <br/>
                            <input name="txtModSex" type="radio"></input> Nam &nbsp;
                            <input name="txtModSex" type="radio"></input> Nữ <br/>
                            <textarea name="txtModAddress" cols="80" rows="5"></textarea>
                        </div>
                    </form>
                    <AdminButton style={cusStyle} ChangePwdClicked={()=>alert("da dat lai mat khau")} IconName={faKey}/> &nbsp;
                    <AdminButton SaveClicked={()=>{alert("da luu"); props.setState(0)}} IconName={faSave}/>
                </div>
            </div>
        )
    }
}

export default ModeratorInformation