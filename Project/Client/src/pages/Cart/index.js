import { SearchHeader } from "../../components/Paritals/Header"
import ProductSuggestion from "../../components/Paritals/ProductSuggestion"
import Footer from '../../components/Paritals/Footer'
import CartDetail from "../../components/Paritals/CartDetail"
import { useEffect, useState } from "react"
import { caller } from "../../api_services/servicesContainer"
const Cart = () =>{
    return(
        <div className="Cart Home">
            <SearchHeader/>
            <div className="home-body-content">
                <CartDetail/>
                <br/>
               <ProductSuggestion id={10}/>
            </div>
            <Footer/>
        </div>
    )
}
export default Cart