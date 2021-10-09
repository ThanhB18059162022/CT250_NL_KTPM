import ProductNavigation from "./ProductNavigation";
import ProductList from "./ProductList";
import "./ProductShower.Style.scss"
import {caller} from "../../../api_services/servicesContainer"
import { useState, useEffect } from "react";
const ProductShower = () =>{
    const [list, setList] = useState([])
    const [nextPage,setNextPage] = useState(1)
    const [isNextPage, setIsNextPage] = useState(true)
    const toNextPage = ()=>{

        isNextPage && setNextPage(nextPage+1)
    }

    useEffect(()=>{
        console.log(nextPage)
    },[nextPage])
    
    useEffect(() => {
        (async()=>{
            let data = await caller.get(`products?page=${nextPage}`)
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