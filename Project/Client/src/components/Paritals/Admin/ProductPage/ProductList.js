import { AdminButton, AdminSearchInput } from "../../../Controls"
import "../Admin.Style.scss"
import { useEffect, useState } from "react"
import {caller} from "../../../../api_services/servicesContainer"
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import ProductFullInfo from "../../../../pages/Admin/ProductFullInfo"

const ProductList = () => {
    const cusStyle = {
        fontSize : "15px",
        width : "45px"
    }
    const [products, setProducts] =useState([])
    const [prodNo, setProdNo] = useState(0)
    const [editProduct, setEditProduct] = useState(0)
    const displayEditProduct = () => {
        switch(editProduct){
            case 1: return <ProductFullInfo prodNo={prodNo} setDisplay={setEditProduct}/>
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
                {products.map((item,index)=><Item key={index} info={item} setProdNo={setProdNo} setEditProduct={setEditProduct} cusStyle={cusStyle}/>)}
            </div>
            {displayEditProduct()}
        </div>
    )
}

const Item = (props) => {
    const {info, setProdNo, setEditProduct, cusStyle} = props
    
    const hardware = info.prod_cpu + " / " + info.prod_ram + " / " + info.prod_battery
    return(
        <>
            <li className="ProductList">
                <p>{info.prod_no}</p>
                <p>{info.prod_name}</p>
                <p>{info.prod_os}</p>
                <p>{hardware}</p>
                <p>...</p>
                <p><AdminButton style={cusStyle} ClickEvent={()=>{setEditProduct(1); setProdNo(info.prod_no)}} IconName={faEdit}/> <AdminButton style={cusStyle} IconName={faTrashAlt}/></p>
            </li>
            <hr/>
        </>
    )
}

export default ProductList