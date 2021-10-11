import ProductNavigation from "./ProductNavigation";
import ProductList from "./ProductList";
import "./ProductShower.Style.scss"
import { useState, useEffect } from "react";
import ProductServices from "../../../api_services/products_services/ProductsService";
const ProductShower = () =>{
    const [list, setList] = useState([])
    const [nextPage,setNextPage] = useState(1)
    const [isNextPage, setIsNextPage] = useState(true)
    const toNextPage = ()=>{
        isNextPage && setNextPage(nextPage+1)
    }
    
    useEffect(() => {
        (async()=>{
            let data = (await ProductServices.getProducts(nextPage,24,'prod_no'))
            data.items =  data.items.map(item=>item.prod_no)
            !data.next && setIsNextPage(false)
            setList(list=>[...list,...data.items])
        })()
    }, [nextPage])
    return (
        <div className="ProductShower">
            <ProductNavigation/>
            <ProductList list={list} toNextPage={toNextPage} isNextPage={isNextPage}/>
        </div>
    )
}

export default ProductShower;