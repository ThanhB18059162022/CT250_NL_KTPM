import { AdminButton, AdminSearchInput } from "../../../Controls"
import "../Admin.Style.scss"
import { useEffect, useState } from "react"
import {caller} from "../../../../api_services/servicesContainer"
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import ProductFullInfo from "../../../../pages/Admin/ProductFullInfo"
import Notifications from "../../../../common/Notifications"

const ProductList = () => {
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
    
    const notifyDeleteProduct = () =>{
        setNotify({
            ...notify,
            title:"Xác nhận",
            content:"Xóa sản phẩm?",
        })
        setShow(true)
    }

    const [products, setProducts] =useState([])
    const [detail, setDetail] = useState({})
    const [editProduct, setEditProduct] = useState(0)
    const displayEditProduct = () => {
        switch(editProduct){
            case 1: return <ProductFullInfo productInfo={detail} setDisplay={setEditProduct}/>
            default: return;
        }
    }

    useEffect(()=>{
       (async()=>{
        let data =  await caller.get('products')
        setProducts(data.items)
       })(); // IIFE // Note setProduct([...products, item])
    },[])

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
                {products.map((item,index)=><Item key={index} info={item} setDetail={setDetail} setEditProduct={setEditProduct} cusStyle={cusStyle} show={show} setShow={setShow} notify={notify} notifyDeleteProduct={notifyDeleteProduct}/>)}
            </div>
            {displayEditProduct()}
        </div>
    )
}

const Item = (props) => {
    const {info, setDetail, setEditProduct, cusStyle, show, setShow, notify, notifyDeleteProduct} = props
    
    const hardware = info.prod_cpu + " / " + info.prod_ram + " / " + info.prod_battery
    return(
        <>
            <li className="ProductList">
                <p>{info.prod_no}</p>
                <p>{info.prod_name}</p>
                <p>...</p>
                <p>{hardware}</p>
                <p>...</p>
                <p><AdminButton style={cusStyle} ClickEvent={()=>{setEditProduct(1); setDetail(info)}} IconName={faEdit}/> <AdminButton style={cusStyle} IconName={faTrashAlt} ClickEvent={notifyDeleteProduct}/></p>
            </li>
            <hr/>
            <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default ProductList