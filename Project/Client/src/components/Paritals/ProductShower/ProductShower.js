import ProductNavigation from "./ProductNavigation";
import ProductList from "./ProductList";
import "./ProductShower.Style.scss"
import {caller} from "../../../api_services/servicesContainer"
import { useState, useEffect } from "react";
const ProductShower = () =>{
    const [list, setList] = useState([])
    const [nextPage,setNextPage] = useState(1)
    
    const toNextPage = ()=>{
        setNextPage(nextPage+1)
    }
    
    useEffect(() => {
        (async()=>{
            let data = await caller.get(`products?page=${nextPage}`)
            setList(list=>[...list,...data.items])
        })()
    }, [nextPage])
    return (
        <div className="ProductShower">
            <ProductNavigation/>
            <ProductList list={list} toNextPage={toNextPage}/>
        </div>
    )
}

export default ProductShower;