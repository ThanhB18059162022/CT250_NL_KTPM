import { faSave, faTrashAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { AdminButton } from "../../../Controls"
import { useState } from "react";
import Notifications from "../../../../common/Notifications";
import "../Admin.Style.scss"

const ProductDetail = (props) => {
    const { setDisplay, productDetails, setProductDetails, productDetail, index} = props
    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type: "", //CONFIRMARTION, INFORMATION
        title: "", // title of the notifications
        content: "", // content of the notify
        infoType: ""
    })
    //thông báo xoá chi tiết sản phẩm
    const notifyDeleteProdDetail = (index) => {
        setNotify({
            type: "CONFIRMATION",
            title: "Xác nhận",
            content: "Xóa chi tiết sản phẩm?",
            handle: () => deleteProdDetail(index)
        })
        setShow(true)
    }
    //thông báo lưu chi tiết sản phẩm
    const notifySaveProdDetail = () => {
        setNotify({
            type: "INFORMATION",
            title: "Thông báo",
            content: "Đã lưu chi tiết",
            infoType: "SUCCESS"
        })
        setShow(true)
    }
    //chi tiết sản phẩm tạm
    const [detail, setDetail] = useState({ pd_ram: "", pd_storage: "", pd_storageAvailable: "", pd_price: 0, pd_amount: 0, pd_sold: 0 })
    //xoá chi tiết sản phẩm
    const deleteProdDetail = (pd_no) => {
        let arrTmp = []
        productDetails.map((item, index) => index!==pd_no ? ( arrTmp.push(item) ) : (<></>))
        setProductDetails(arrTmp)
    }
    
    if( productDetail && detail.pd_ram.length === 0 )
    {
        setDetail({ pd_ram: productDetail.pd_ram, 
                    pd_storage: productDetail.pd_storage, 
                    pd_storageAvailable: productDetail.pd_storageAvailable, 
                    pd_price: productDetail.pd_price, 
                    pd_amount: productDetail.pd_amount,
                    pd_sold: productDetail.pd_sold})
    }
    //lưu chi tiết sản phẩm
    const saveDetail = () => {
        if(productDetails)
            setProductDetails([...productDetails, detail])
        else setProductDetails([detail])
        notifySaveProdDetail()
        setTimeout(() => {
            setDisplay(0)
        }, 2000);
    }

    return (
        <>
            {!productDetail ? (
                <>
                    {/* tạo mới chi tiết */}
                    <div className="ProductDetail">
                        <div className="DetailButton">
                            {!setDisplay ? (<AdminButton IconName={faTrashAlt} ClickEvent={()=>notifyDeleteProdDetail(index)} />) : (<><AdminButton IconName={faWindowClose} ClickEvent={() => setDisplay(0)} /> <AdminButton IconName={faSave} ClickEvent={() => saveDetail()} />  </>)}
                        </div>
                        <form className="ProductDetailForm">
                            <li>
                                <p>Ram:</p>
                                <input name="txtPDRam" type="text" onChange={e => setDetail({ ...detail, pd_ram: e.target.value })} /> <br />
                            </li>
                            <li>
                                <p>Bộ nhớ:</p>
                                <input name="txtPDStorage" type="text" onChange={e => setDetail({ ...detail, pd_storage: e.target.value })} /> <br />
                            </li>
                            <li>
                                <p>Bộ nhớ khả dụng:</p>
                                <input name="txtPDStorageAvailable" type="text" onChange={e => setDetail({ ...detail, pd_storageAvailable: e.target.value })} /> <br />
                            </li>
                            <li>
                                <p>Giá:</p>
                                <input name="txtPDPrice" type="text" onChange={e => setDetail({ ...detail, pd_price: Number(e.target.value) })} /> <br />
                            </li>
                            <li>
                                <p>Số lượng:</p>
                                <input name="txtPDAmount" type="text" onChange={e => setDetail({ ...detail, pd_amount: Number(e.target.value) })} /> <br />
                            </li>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    {/* hiển thị chi tiết */}
                    <div className="ProductDetail">
                        <div className="DetailButton">
                            {!setDisplay ? (<AdminButton IconName={faTrashAlt} ClickEvent={()=>notifyDeleteProdDetail(index)} />) : (<><AdminButton IconName={faSave} ClickEvent={() => saveDetail()} /> <AdminButton IconName={faWindowClose} ClickEvent={() => setDisplay(0)} /> </>)}
                        </div>
                        <form className="ProductDetailForm">
                            <li>
                                <p>Ram:</p>
                                <input name="txtPDRam" type="text" onChange={e => setDetail({ ...detail, pd_ram: e.target.value })} value={detail.pd_ram} /> <br />
                            </li>
                            <li>
                                <p>Bộ nhớ:</p>
                                <input name="txtPDStorage" type="text" onChange={e => setDetail({ ...detail, pd_storage: e.target.value })} value={detail.pd_storage} /> <br />
                            </li>
                            <li>
                                <p>Bộ nhớ khả dụng:</p>
                                <input name="txtPDStorageAvailable" type="text" onChange={e => setDetail({ ...detail, pd_storageAvailable: e.target.value })} value={detail.pd_storageAvailable} /> <br />
                            </li>
                            <li>
                                <p>Giá:</p>
                                <input name="txtPDPrice" type="text" onChange={e => setDetail({ ...detail, pd_price: Number(e.target.value) })} value={detail.pd_price} /> <br />
                            </li>
                            <li>
                                <p>Số lượng:</p>
                                <input name="txtPDAmount" type="text" onChange={e => setDetail({ ...detail, pd_amount: Number(e.target.value) })} value={detail.pd_amount} /> <br />
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