import { SearchHeader } from "../../components/Paritals/Header"
import ProductSuggestion from "../../components/Paritals/ProductSuggestion"
import Footer from '../../components/Paritals/Footer'
import CartDetail from "../../components/Paritals/CartDetail"
import { useEffect, useState } from "react"
import { caller } from "../../api_services/servicesContainer"
const Cart = () =>{
    const  [product, setProduct]  = useState(null)
    useEffect(()=>{
       (async()=>{
           // Cái này là fake thôi, yêu cầu api suggest với sản phẩm
        let data = await caller.get('products')
        setProduct(data.items)
       })()
    },[])
    return(
        <div className="Cart Home">
            <SearchHeader/>
            <div className="home-body-content">
                <CartDetail/>
                <br/>
                {product!==null && <ProductSuggestion arr = {product}/>}
            </div>
            <Footer/>
        </div>
    )
}
export default Cart