import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { AdminButton } from "../../../Controls"
import { useState } from "react";
import Notifications from "../../../../common/Notifications";
import "../Admin.Style.scss"

const ProductDetail = () => {
    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type :"CONFIRMATION", //CONFIRMARTION, INFORMATION
        title :"", // title of the notifications
        content :"", // content of the notify
        infoType :""
    })
    
    const notifyDeleteProdDetail = () =>{
        setNotify({
            ...notify,
            title:"Xác nhận",
            content:"Xóa chi tiết sản phẩm?",
        })
        setShow(true)
    }

    const CusStyle = {
        margin: "1% 5px 5px 12%"
    };
    return(
        <>
            <div className="DetailButton">
                <AdminButton style={CusStyle} IconName={faTrashAlt} ClickEvent={notifyDeleteProdDetail}/>
            </div>
            <div className="ProductDetail BorderFormat">
                <form className="ProductDetailForm">
                    <div>
                        <p>Mã chi tiết:</p>
                        <input name="txtPDNo" type="text" disabled></input>
                    </div>
                    <div>
                        <p>Bộ nhớ:</p>
                        <input name="txtPDMemory" type="text"></input> <br/>
                    </div>
                    <div>
                        <p>Giá:</p>
                        <input name="txtPDPrice" type="text"></input> <br/>
                    </div>
                    <div>
                        <p>Số lượng:</p>
                        <input name="txtPDAmount" type="text"></input> <br/>
                    </div>
                    <div>
                        <p>Đã bán:</p>
                        <input name="txtPDSold" type="text"></input> <br/>
                    </div>
                    <div>
                        <p>Hình ảnh:</p>
                        <input type="file" id="myFile" name="filename" multiple></input>
                    </div>
                </form>
            </div>
            <hr className="DetailSplit"/>
            <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default ProductDetail