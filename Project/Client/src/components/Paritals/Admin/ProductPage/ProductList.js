import { AdminButton, AdminSearchInput } from "../../../Controls"
import "../Admin.Style.scss"
import { useState } from "react"
import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import ProductFullInfo from "../../../../pages/Admin/ProductFullInfo"
import Notifications from "../../../../common/Notifications"
import ApiCaller from "../../../../api_services/ApiCaller"

const ProductList = (props) => {
    const { productsList, setDisplayAddForm, setModifyList } = props
    
    const cusStyle = {
        fontSize: "15px",
        width: "45px"
    }
    //hiển thị thông báo
    const [show, setShow] = useState(false)
    //thông báo
    const [notify, setNotify] = useState({
        type: "CONFIRMATION", //CONFIRMATION, INFORMATION
        title: "", // title of the notifications
        content: "", // content of the notify
        infoType: ""
    })
    //gọi api xóa sản phẩm
    const DeleteProduct = async(id) => {
        const caller = new ApiCaller()
        const data = await caller.get("products/" + String(id));
        await caller.put("products/" + String(id), {...data, prod_status: 1})
        setModifyList(1)
    }
    //thông báo xóa sản phẩm
    const notifyDeleteProduct = (id) => {
        setNotify({
            ...notify,
            title: "Xác nhận",
            content: "Xóa sản phẩm?",
            handle: () => DeleteProduct(id)
        })
        setShow(true)
    }
    //lấy mã số sản phẩm
    const [productNo, setProductNo] = useState()
    //hiển thị popup chỉnh sửa sản phẩm
    const [displayEditProduct, setDisplayEditProduct] = useState(0)
    const showEditProduct = () => {
        switch (displayEditProduct) {
            case 1: return <ProductFullInfo productNo={productNo} setDisplayEditProduct={setDisplayEditProduct} setModifyList={setModifyList}/>
            default: return;
        }
    }
    //danh sách sản phẩm đã lọc
    const [productFilter, setProductFilter] = useState([])
    //lọc sản phẩm
    const filterProduct = (message) => {
        const newArr = productsList.filter(item => item.prod_name.toLowerCase().includes(message.toLowerCase()) || item.prod_hardwareAndOS.os.toLowerCase().includes(message.toLowerCase()) || item.prod_manufacturer.madeIn.toLowerCase().includes(message.toLowerCase()))
        setProductFilter(newArr)
    }

    return (
        <div className="ListLayout">
            <div className="ProductToolHeader">
                <AdminButton IconName={faPlus} ClickEvent={() => setDisplayAddForm(1)} />
                <AdminSearchInput filterProduct={filterProduct} />
            </div>

            <li className="ProductListHeader">
                <p>Mã SP</p>
                <p>Tên sản phẩm</p>
                <p>Hệ điều hành</p>
                <p>Xuất xứ</p>
                <p>Số chi tiết</p>
                <p>Hành động</p>
            </li>
            <div className="AdminListClass">
                {productFilter.length === 0 ?
                    (
                        productsList.map((item, index) => <Item key={index} info={item} setProductNo={setProductNo} setDisplayEditProduct={setDisplayEditProduct} cusStyle={cusStyle} show={show} setShow={setShow} notify={notify} notifyDeleteProduct={notifyDeleteProduct} />)
                    ) : (
                        productFilter.map((item, index) => <Item key={index} info={item} setProductNo={setProductNo} setDisplayEditProduct={setDisplayEditProduct} cusStyle={cusStyle} show={show} setShow={setShow} notify={notify} notifyDeleteProduct={notifyDeleteProduct} />)
                    )}
            </div>
            {showEditProduct()}
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </div>
    )
}

const Item = (props) => {
    const { info, setProductNo, setDisplayEditProduct,notifyDeleteProduct } = props
    return (
        info.prod_status === 0 &&
        (
            <li>
                <p>{info.prod_no}</p>
                <p>{info.prod_name}</p>
                <p>{info.prod_hardwareAndOS.os}</p>
                <p>{info.prod_manufacturer.madeIn}</p>
                <p>{info.prod_details.length}</p>
                <p>
                    <AdminButton
                        ClickEvent={() => { setDisplayEditProduct(1); setProductNo(info.prod_no) }}
                        IconName={faEdit} />

                    <AdminButton
                        IconName={faTrashAlt}
                        ClickEvent={() => notifyDeleteProduct(info.prod_no)} />
                    </p>
            </li>
        )
    )
}

export default ProductList