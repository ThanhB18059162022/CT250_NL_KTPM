import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { AdminButton } from "../../../Controls"
import { useState } from "react";
import Notifications from "../../../../common/Notifications";
import "../Admin.Style.scss"
import ApiCaller from "../../../../api_services/ApiCaller";

const ProductDetail = (props) => {
    const { setDisplay, productDetails, setProductDetails, productDetail } = props
    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type: "", //CONFIRMARTION, INFORMATION
        title: "", // title of the notifications
        content: "", // content of the notify
        infoType: ""
    })
    //thông báo lưu chi tiết sản phẩm thành công
    const notifySaveProdDetail = () => {
        setNotify({
            type: "INFORMATION",
            title: "Thông báo",
            content: "Đã lưu chi tiết",
            infoType: "SUCCESS"
        })
        setShow(true)
    }
    //thông báo lưu chi tiết sản phẩm thất bại
    const notifySaveProdDetailFailed = () => {
        setNotify({
            type: "INFORMATION",
            title: "Thông báo",
            content: "Vui lòng điền đủ các trường thông tin!",
            infoType: "ERROR"
        })
        setShow(true)
    }
    //thông báo cập nhật chi tiết sản phẩm thành công
    const notifyUpdatedProdDetail = () => {
        setNotify({
            type: "INFORMATION",
            title: "Thông báo",
            content: "Đã cập nhật chi tiết",
            infoType: "SUCCESS"
        })
        setShow(true)
    }

    //chi tiết sản phẩm tạm
    const [detail, setDetail] = useState({ pd_ram: "", pd_storage: "", pd_storageAvailable: "", pd_price: 0, pd_amount: 0, pd_sold: 0 })
    if( productDetail && detail.pd_ram.length === 0 && detail.pd_storage.length === 0 && detail.pd_storageAvailable.length === 0 )
    {
        setDetail({ pd_ram: productDetail.pd_ram, 
                    pd_storage: productDetail.pd_storage, 
                    pd_storageAvailable: productDetail.pd_storageAvailable, 
                    pd_price: productDetail.pd_price, 
                    pd_amount: productDetail.pd_amount,
                    pd_sold: productDetail.pd_sold})
        
    }
    //lưu chi tiết sản phẩm mới
    const saveNewDetail = (detail) => {
        if( detail.pd_ram.length>0 && detail.pd_storage.length>0 && detail.pd_storageAvailable.length>0 )
        {
            if(productDetails)
                setProductDetails([...productDetails, detail])
            else setProductDetails([detail])
            notifySaveProdDetail()
            setTimeout(() => {
                setDisplay(0)
            }, 1000);
        }else notifySaveProdDetailFailed()
    }

    //cập nhật chi tiết sản phẩm
    const updateDetail = async(detail) => {
        if(detail.pd_ram.length>0 && detail.pd_storage.length>0 && detail.pd_storageAvailable.length>0)
        {
            console.log("cap nhat chi tiet")
            const caller = new ApiCaller()
            await caller.put("products/" + productDetail.prod_no + "/details/" + productDetail.pd_no, detail)
            notifyUpdatedProdDetail()
            setTimeout(()=>{
                setShow(false)
            }, 1000)
        }else notifySaveProdDetailFailed()
        
    }

    return (
        <>
            {!productDetail ? (
                <>
                    {/* tạo mới chi tiết */}
                    <div className="ProductDetail">
                        <div className="DetailButton">
                            <AdminButton IconName={faWindowClose} ClickEvent={() => setDisplay(0)} /> <AdminButton IconName={faSave} ClickEvent={() => saveNewDetail(detail)} />
                        </div>
                        <form className="ProductDetailForm">
                            <li>
                                <p>Ram:<p>(*)</p></p>
                                <input name="txtPDRam" type="text" onChange={e => setDetail({ ...detail, pd_ram: e.target.value })} /> <br />
                            </li>
                            <li>
                                <p>Bộ nhớ:<p>(*)</p></p>
                                <input name="txtPDStorage" type="text" onChange={e => setDetail({ ...detail, pd_storage: e.target.value })} /> <br />
                            </li>
                            <li>
                                <p>Bộ nhớ khả dụng:<p>(*)</p></p>
                                <input name="txtPDStorageAvailable" type="text" onChange={e => setDetail({ ...detail, pd_storageAvailable: e.target.value })} /> <br />
                            </li>
                            <li>
                                <p>Giá:<p>(*)</p></p>
                                <input name="txtPDPrice" type="text" onKeyPress={e => {if (!/[0-9]/.test(e.key)) {e.preventDefault();}}} onChange={e => setDetail({ ...detail, pd_price: Number(e.target.value) })} /> <br />
                            </li>
                            <li>
                                <p>Số lượng:<p>(*)</p></p>
                                <input name="txtPDAmount" type="text" onKeyPress={e => {if (!/[0-9]/.test(e.key)) {e.preventDefault();}}} onChange={e => setDetail({ ...detail, pd_amount: Number(e.target.value) })} /> <br />
                            </li>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    {/* hiển thị/chỉnh sửa chi tiết */}
                    <div className="ProductDetail">
                        <div className="DetailButton">
                            <AdminButton IconName={faSave} ClickEvent={() => updateDetail(detail)} />
                        </div>
                        <form className="ProductDetailForm">
                            <li>
                                <p>Ram:<p>(*)</p></p>
                                <input name="txtPDRam" type="text" onChange={e => setDetail({ ...detail, pd_ram: e.target.value })} value={detail.pd_ram} /> <br />
                            </li>
                            <li>
                                <p>Bộ nhớ:<p>(*)</p></p>
                                <input name="txtPDStorage" type="text" onChange={e => setDetail({ ...detail, pd_storage: e.target.value })} value={detail.pd_storage} /> <br />
                            </li>
                            <li>
                                <p>Bộ nhớ khả dụng:<p>(*)</p></p>
                                <input name="txtPDStorageAvailable" type="text" onChange={e => setDetail({ ...detail, pd_storageAvailable: e.target.value })} value={detail.pd_storageAvailable} /> <br />
                            </li>
                            <li>
                                <p>Giá:<p>(*)</p></p>
                                <input name="txtPDPrice" type="text" onKeyPress={e => {if (!/[0-9]/.test(e.key)) {e.preventDefault();}}} onChange={e => setDetail({ ...detail, pd_price: Number(e.target.value) })} value={detail.pd_price} /> <br />
                            </li>
                            <li>
                                <p>Số lượng:<p>(*)</p></p>
                                <input name="txtPDAmount" type="text" onKeyPress={e => {if (!/[0-9]/.test(e.key)) {e.preventDefault();}}} onChange={e => setDetail({ ...detail, pd_amount: Number(e.target.value) })} value={detail.pd_amount} /> <br />
                            </li>
                            <li>
                                <p>Đã bán:</p>
                                <input name="txtPDAmount" type="text" value={detail.pd_sold} readOnly /> <br />
                            </li>
                        </form>
                    </div>
                </>
            )
            }
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    )
}

export default ProductDetail