import ProductNavigation from "./ProductNavigation";
import ProductList from "./ProductList";
import "./ProductShower.Style.scss"
import {ApiCaller} from "../../../api_services/servicesContainer"
import { useState, useEffect } from "react";
const ProductShower = () =>{
    const apiCaller = new ApiCaller()
    const [list, setList] = useState([])
    // const [nextPage,setNextPage] = (null) 
    useEffect(() => {
        (async()=>{
            let data = await apiCaller.get('products')
            console.log(data.items)
            setList(data.items)
        })()
    }, [])
    return (
        <div className="ProductShower">
            <ProductNavigation/>
            <ProductList list={list}/>
        </div>
    )
}

export default ProductShower;