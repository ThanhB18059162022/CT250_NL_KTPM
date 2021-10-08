import { faSave, faTrashAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { AdminButton } from "../../../Controls"
import { useState } from "react";
import Notifications from "../../../../common/Notifications";
import "../Admin.Style.scss"

const ProductDetail = (props) => {
    const {setDisplay, productDetails, setProductDetails, productDetail} = props
    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type :"", //CONFIRMARTION, INFORMATION
        title :"", // title of the notifications
        content :"", // content of the notify
        infoType :""
    })
    
    const notifyDeleteProdDetail = () =>{
        setNotify({
            type : "CONFIRMATION",
            title:"Xác nhận",
            content:"Xóa chi tiết sản phẩm?",
        })
        setShow(true)
    }

    const notifySaveProdDetail = () =>{
        setNotify({
            type : "INFORMATION",
            title:"Thông báo",
            content:"Đã lưu chi tiết",
            infoType : "SUCCESS"
        })
        setShow(true)
    }

    const [detail, setDetail] = useState({ram: "", storage: "", storageAvailable: "", price: 0, totalProducts: 0})

    const getDetail = () => {
        setProductDetails([...productDetails, detail])
        notifySaveProdDetail()
        setTimeout(() => {
            setDisplay(0)
        }, 3000);
    }

    const CusStyle = {
        margin: "1% 5px 5px 12%"
    };
    return(
        <>
        {!productDetail ? (
            <>
                <div className="DetailButton">
                    {!setDisplay?(<AdminButton style={CusStyle} IconName={faTrashAlt} ClickEvent={notifyDeleteProdDetail}/>) : (<><AdminButton style={CusStyle} IconName={faSave} ClickEvent={()=>getDetail()}/> <AdminButton IconName={faWindowClose} ClickEvent={()=>setDisplay(0)}/> </>)}
                </div>
                <div className="ProductDetail BorderFormat">
                    <form className="ProductDetailForm">
                        <div>
                            <p>Ram:</p>
                            <input name="txtPDRam" type="text" onChange={e=>setDetail({...detail,ram: e.target.value})} /> <br/>
                        </div>
                        <div>
                            <p>Bộ nhớ:</p>
                            <input name="txtPDStorage" type="text" onChange={e=>setDetail({...detail,storage: e.target.value})} /> <br/>
                        </div>
                        <div>
                            <p>Bộ nhớ khả dụng:</p>
                            <input name="txtPDStorageAvailable" type="text" onChange={e=>setDetail({...detail,storageAvailable: e.target.value})} /> <br/>
                        </div>
                        <div>
                            <p>Giá:</p>
                            <input name="txtPDPrice" type="text" onChange={e=>setDetail({...detail,price: Number(e.target.value)})} /> <br/>
                        </div>
                        <div>
                            <p>Số lượng:</p>
                            <input name="txtPDAmount" type="text" onChange={e=>setDetail({...detail,totalProducts: Number(e.target.value)})} /> <br/>
                        </div>
                    </form>
                </div>
                <hr className="DetailSplit"/>
            </>
        ) : (
            <>
                <div className="DetailButton">
                    {!setDisplay?(<AdminButton style={CusStyle} IconName={faTrashAlt} ClickEvent={notifyDeleteProdDetail}/>) : (<><AdminButton style={CusStyle} IconName={faSave} ClickEvent={()=>getDetail()}/> <AdminButton IconName={faWindowClose} ClickEvent={()=>setDisplay(0)}/> </>)}
                </div>
                <div className="ProductDetail BorderFormat">
                    <form className="ProductDetailForm">
                        <div>
                            <p>Ram:</p>
                            <input name="txtPDRam" type="text" onChange={e=>setDetail({...detail,ram: e.target.value})} value={productDetail.ram}/> <br/>
                        </div>
                        <div>
                            <p>Bộ nhớ:</p>
                            <input name="txtPDStorage" type="text" onChange={e=>setDetail({...detail,storage: e.target.value})} value={productDetail.storage}/> <br/>
                        </div>
                        <div>
                            <p>Bộ nhớ khả dụng:</p>
                            <input name="txtPDStorageAvailable" type="text" onChange={e=>setDetail({...detail,storageAvailable: e.target.value})} value={productDetail.storageAvailable}/> <br/>
                        </div>
                        <div>
                            <p>Giá:</p>
                            <input name="txtPDPrice" type="text" onChange={e=>setDetail({...detail,price: Number(e.target.value)})} value={productDetail.price}/> <br/>
                        </div>
                        <div>
                            <p>Số lượng:</p>
                            <input name="txtPDAmount" type="text" onChange={e=>setDetail({...detail,totalProducts: Number(e.target.value)})} value={productDetail.totalProducts}/> <br/>
                        </div>
                        <div>
                            <p>Đã bán:</p>
                            <input name="txtPDAmount" type="text" value={productDetail.soldProducts} readOnly/> <br/>
                        </div>
                    </form>
                </div>
                <hr className="DetailSplit"/>
            </>
            )
        }
        <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default ProductDetail