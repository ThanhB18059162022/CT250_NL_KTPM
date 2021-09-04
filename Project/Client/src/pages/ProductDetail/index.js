import DetailAndRate from "../../components/Paritals/DetailAndRate"
import { SearchHeader } from "../../components/Paritals/Header"
import ProductBox from "../../components/Paritals/ProductBox/"
import ProductSuggestion from "../../components/Paritals/ProductSuggestion"
import Footer from "../../components/Paritals/Footer"
const ProductDetail = (props)=>{
    return(
        <div className="Home">
            <SearchHeader/>
            <br/>
            <div className="home-body-content">
             <ProductBox/>
             <br/>
             <DetailAndRate/>
            </div>
            <br/>
            <ProductSuggestion/>
            <Footer/>
        </div>
    )
}

export default ProductDetail