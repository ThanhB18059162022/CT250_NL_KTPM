import "../Admin.Style.scss"
import { AdminButton } from "../../../Controls"
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Notifications from "../../../../common/Notifications";

const ProductInfo = (props) => {
    const {productInfo} = props
    const CusStyle = {
        margin: "1% 5px 5px 12%"
    };
    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type :"INFORMATION", //CONFIRMATION, INFORMATION
        title :"", // title of the notifications
        content :"", // content of the notify
        infoType :""
    })

    const notifySaveProduct = () =>{
        setNotify({
            ...notify,
            title:"Thông báo",
            content:"Đã lưu sản phẩm",
            infoType:"SUCCESS"
        })
        setShow(true)
    }
    return(
        <>
        {productInfo?(
            <>
                <AdminButton style={CusStyle} ClickEvent={notifySaveProduct} IconName={faSave}/>
                <div className="ProductInfo BorderFormat">
                    <p className="Title">Thông tin sản phẩm</p>
                    <form className="AddProductForm">
                        <div className="InfoTitle">
                            <p>Mã sản phẩm:</p>
                            <input name="txtPropNo" type="text" disabled defaultValue={productInfo.prod_no}/> <br/>
                        </div>
                        <div>
                            <p>Tên sản phẩm:</p>
                            <input name="txtPropName" type="text" defaultValue={productInfo.prod_name}/> <br/>
                        </div>
                        <div>
                            <p>Ngày sản xuất:</p>
                            <input name="txtPropMFG" type="text"/> <br/>
                        </div>
                        <div>
                            <p>Màn hình:</p>
                            <input name="txtScreen" type="text"/> <br/>
                        </div>
                        <div>
                            <p>Máy ảnh:</p>
                            <input name="txtCamera" type="text"/> <br/>
                        </div>
                        <div>
                            <p>Kích thước:</p>
                            <input name="txtSize" type="text"/> <br/>
                        </div>
                        <div>
                            <p>Pin:</p>
                            <input name="txtBattery" type="text" defaultValue={productInfo.prod_battery}/> <br/>
                        </div>
                        <div>
                            <p>Hệ điều hành:</p>
                            <input name="txtOS" type="text"/> <br/>
                        </div>
                        <div>
                            <p>Phần cứng:</p>
                            <input name="txtHardware" type="text" defaultValue={productInfo.prod_cpu + " " + productInfo.prod_ram}/> <br/>
                        </div>
                    </form>
                </div>
            </>
        ):(
            <>
            <AdminButton style={CusStyle} ClickEvent={notifySaveProduct} IconName={faSave}/>
                <div className="ProductInfo BorderFormat">
                    <p className="Title">Thông tin sản phẩm</p>
                    <form className="AddProductForm">
                        <div className="InfoTitle">
                            <p>Mã sản phẩm:</p>
                            <input name="txtPropNo" type="text" disabled defaultValue={"chua co ma so"} /> <br/>
                        </div>
                        <div>
                            <p>Tên sản phẩm:</p>
                            <input name="txtPropName" type="text" /> <br/>
                        </div>
                        <div>
                            <p>Ngày sản xuất:</p>
                            <input name="txtPropMFG" type="text" /> <br/>
                        </div>
                        <div>
                            <p>Màn hình:</p>
                            <input name="txtScreen" type="text" /> <br/>
                        </div>
                        <div>
                            <p>Máy ảnh:</p>
                            <input name="txtCamera" type="text" /> <br/>
                        </div>
                        <div>
                            <p>Kích thước:</p>
                            <input name="txtSize" type="text" /> <br/>
                        </div>
                        <div>
                            <p>Pin:</p>
                            <input name="txtBattery" type="text" /> <br/>
                        </div>
                        <div>
                            <p>Hệ điều hành:</p>
                            <input name="txtOS" type="text" /> <br/>
                        </div>
                        <div>
                            <p>Phần cứng:</p>
                            <input name="txtHardware" type="text" /> <br/>
                        </div>
                    </form>
                </div>
            </>
        )}
            <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default ProductInfo