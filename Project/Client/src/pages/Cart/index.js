import { SearchHeader } from "../../components/Paritals/Header"
import ProductSuggestion from "../../components/Paritals/ProductSuggestion"
import Footer from '../../components/Paritals/Footer'
import CartDetail from "../../components/Paritals/CartDetail"
import { useEffect } from "react"
const Cart = () =>{
    useEffect(()=>{
        return ()=> document.querySelector('body').style.overflow ='auto'
    },[])
    return(
        <div className="Cart Home">
            <SearchHeader/>
            <div className="home-body-content">
                <CartDetail/>
                <br/>
               <ProductSuggestion id={Math.floor(Math.random()*26)}/>
            </div>
            <Footer/>
        </div>
    )
}
export default Cart