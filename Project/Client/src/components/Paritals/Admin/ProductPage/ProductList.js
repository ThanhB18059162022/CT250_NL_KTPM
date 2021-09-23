import { AdminButton, AdminSearchInput } from "../../../Controls"
import "../Admin.Style.scss"
import { useState } from "react"
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import ProductFullInfo from "../../../../pages/Admin/ProductFullInfo"
import Notifications from "../../../../common/Notifications"

const ProductList = (props) => {
    const {productsList} = props
    
    const cusStyle = {
        fontSize : "15px",
        width : "45px"
    }

    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type :"CONFIRMATION", //CONFIRMATION, INFORMATION
        title :"", // title of the notifications
        content :"", // content of the notify
        infoType :""
    })
    
    const DeleteProduct = (id) => {
        console.log(id)
    }

    const notifyDeleteProduct = (id) =>{
        setNotify({
            ...notify,
            title:"Xác nhận",
            content:"Xóa sản phẩm?",
            handle: ()=>DeleteProduct(id)
        })
        setShow(true)
    }

    const [productNo, setProductNo] = useState()
    const [displayEditProd, setDisplayEditProduct] = useState(0)
    const displayEditProduct = () => {
        switch(displayEditProd){
            case 1: return <ProductFullInfo productNo={productNo} setDisplayEditProduct={setDisplayEditProduct}/>
            default: return;
        }
    }

    return(
        <div className="ListLayout">
            <AdminSearchInput/>
            <div className="AdminListClass BorderFormat">
                <p className="Title">Danh sách sản phẩm</p>
                <li className="ProductList">
                    <p>Mã sản phẩm</p>
                    <p>Tên sản phẩm</p>
                    <p>Hệ điều hành</p>
                    <p>Phần cứng</p>
                    <p>Số chi tiết</p>
                    <p>Hành động</p>
                </li>
                <hr/>
                {productsList.map((item,index)=><Item key={index} info={item} setProductNo={setProductNo} setDisplayEditProduct={setDisplayEditProduct} cusStyle={cusStyle} show={show} setShow={setShow} notify={notify} notifyDeleteProduct={notifyDeleteProduct}/>)}
            </div>
            {displayEditProduct()}
        </div>
    )
}

const Item = (props) => {
    const {info, setProductNo, setDisplayEditProduct, cusStyle, show, setShow, notify, notifyDeleteProduct} = props
    
    const hardware = info.prod_cpu + " / " + info.prod_battery
    return(
        <>
            <li className="ProductList">
                <p>{info.prod_no}</p>
                <p>{info.prod_name}</p>
                <p>{info.prod_os}</p>
                <p>{hardware}</p>
                <p>{info.prod_detailsLength}</p>
                <p><AdminButton style={cusStyle} ClickEvent={()=>{setDisplayEditProduct(1); setProductNo(info.prod_no)}} IconName={faEdit}/> <AdminButton style={cusStyle} IconName={faTrashAlt} ClickEvent={()=>notifyDeleteProduct(info.prod_no)}/></p>
            </li>
            <hr/>
            <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default ProductList