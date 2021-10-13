import { faSave, faTrashAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { AdminButton } from "../../../Controls"
import { useState } from "react";
import Notifications from "../../../../common/Notifications";
import "../Admin.Style.scss"

const ProductDetail = (props) => {
    const { setDisplay, productDetails, setProductDetails, productDetail } = props
    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type: "", //CONFIRMARTION, INFORMATION
        title: "", // title of the notifications
        content: "", // content of the notify
        infoType: ""
    })

    const notifyDeleteProdDetail = () => {
        setNotify({
            type: "CONFIRMATION",
            title: "Xác nhận",
            content: "Xóa chi tiết sản phẩm?",
        })
        setShow(true)
    }

    const notifySaveProdDetail = () => {
        setNotify({
            type: "INFORMATION",
            title: "Thông báo",
            content: "Đã lưu chi tiết",
            infoType: "SUCCESS"
        })
        setShow(true)
    }

    const [detail, setDetail] = useState({ ram: "", storage: "", storageAvailable: "", price: 0, totalProducts: 0 })

    const getDetail = () => {
        setProductDetails([...productDetails, detail])
        notifySaveProdDetail()
        setTimeout(() => {
            setDisplay(0)
        }, 3000);
    }

    return (
        <>
            {!productDetail ? (
                <>
                    <div className="ProductDetail">
                        <div className="DetailButton">
                            {!setDisplay ? (<AdminButton IconName={faTrashAlt} ClickEvent={notifyDeleteProdDetail} />) : (<><AdminButton IconName={faWindowClose} ClickEvent={() => setDisplay(0)} /> <AdminButton IconName={faSave} ClickEvent={() => getDetail()} />  </>)}
                        </div>
                        <form className="ProductDetailForm">
                            <li>
                                <p>Ram:</p>
                                <input name="txtPDRam" type="text" onChange={e => setDetail({ ...detail, ram: e.target.value })} /> <br />
                            </li>
                            <li>
                                <p>Bộ nhớ:</p>
                                <input name="txtPDStorage" type="text" onChange={e => setDetail({ ...detail, storage: e.target.value })} /> <br />
                            </li>
                            <li>
                                <p>Bộ nhớ khả dụng:</p>
                                <input name="txtPDStorageAvailable" type="text" onChange={e => setDetail({ ...detail, storageAvailable: e.target.value })} /> <br />
                            </li>
                            <li>
                                <p>Giá:</p>
                                <input name="txtPDPrice" type="text" onChange={e => setDetail({ ...detail, price: Number(e.target.value) })} /> <br />
                            </li>
                            <li>
                                <p>Số lượng:</p>
                                <input name="txtPDAmount" type="text" onChange={e => setDetail({ ...detail, totalProducts: Number(e.target.value) })} /> <br />
                            </li>
                        </form>
                    </div>
                </>
            ) : (
                <>

                    <div className="ProductDetail">
                        <div className="DetailButton">
                            {!setDisplay ? (<AdminButton IconName={faTrashAlt} ClickEvent={notifyDeleteProdDetail} />) : (<><AdminButton IconName={faSave} ClickEvent={() => getDetail()} /> <AdminButton IconName={faWindowClose} ClickEvent={() => setDisplay(0)} /> </>)}
                        </div>
                        <form className="ProductDetailForm">
                            <li>
                                <p>Ram:</p>
                                <input name="txtPDRam" type="text" onChange={e => setDetail({ ...detail, ram: e.target.value })} value={productDetail.ram} /> <br />
                            </li>
                            <li>
                                <p>Bộ nhớ:</p>
                                <input name="txtPDStorage" type="text" onChange={e => setDetail({ ...detail, storage: e.target.value })} value={productDetail.storage} /> <br />
                            </li>
                            <li>
                                <p>Bộ nhớ khả dụng:</p>
                                <input name="txtPDStorageAvailable" type="text" onChange={e => setDetail({ ...detail, storageAvailable: e.target.value })} value={productDetail.storageAvailable} /> <br />
                            </li>
                            <li>
                                <p>Giá:</p>
                                <input name="txtPDPrice" type="text" onChange={e => setDetail({ ...detail, price: Number(e.target.value) })} value={productDetail.price} /> <br />
                            </li>
                            <li>
                                <p>Số lượng:</p>
                                <input name="txtPDAmount" type="text" onChange={e => setDetail({ ...detail, totalProducts: Number(e.target.value) })} value={productDetail.totalProducts} /> <br />
                            </li>
                            <li>
                                <p>Đã bán:</p>
                                <input name="txtPDAmount" type="text" value={productDetail.soldProducts} readOnly /> <br />
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