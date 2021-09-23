import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { AdminButton } from "../../components/Controls/Button"
import ProductList from "../../components/Paritals/Admin/ProductPage/ProductList"
import ProductFullInfo from "./ProductFullInfo"
import {caller} from "../../api_services/servicesContainer"

const ProductManagement = () => {
    const [displayAddForm, setDisplayAddForm] = useState(0)
    const [newProduct, setNewProduct] = useState({})
    const [newProductNo, setNewProductNo] = useState()

    const displayAddNewForm = () =>{
        switch(displayAddForm){
            case 1: return <ProductFullInfo setDisplayEditProduct={setDisplayAddForm} newProduct={newProduct} setNewProduct={setNewProduct} newProductNo={newProductNo}/>
            default: return;
        }
    }

    const [productsList, setProductsList] =useState([])
    useEffect(()=>{
        (async()=>{
         let data =  await caller.get('products')
         setProductsList(data.items)
        })(); // IIFE // Note setProduct([...products, item])
    },[])
    
    useEffect(()=>{
        setNewProductNo(productsList.length+1)
    },[productsList])

    if(Object.keys(newProduct).length != 0){
        setProductsList([...productsList, newProduct])
        setNewProduct({})
    }

    return(
        <div>
            <div className="ProductManagementButton">
                <AdminButton IconName={faPlus} ClickEvent={()=>setDisplayAddForm(1)}/>
            </div>
            <ProductList newProduct={newProduct} productsList={productsList}/>
            {displayAddNewForm()}
        </div>
    )
}

export default ProductManagement