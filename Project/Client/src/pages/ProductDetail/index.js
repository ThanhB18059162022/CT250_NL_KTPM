import DetailAndRate from "../../components/Paritals/DetailAndRate"
import { SearchHeader } from "../../components/Paritals/Header"
import ProductBox from "../../components/Paritals/ProductBox/"
import ProductSuggestion from "../../components/Paritals/ProductSuggestion"
import Footer from "../../components/Paritals/Footer"
import ProductModalDetail from "../../components/Paritals/ProductModalDetail"
import { useState } from "react"
const ProductDetail = (props)=>{
    const [show,setShow] = useState(false)
    const showDetail = () =>{
        setShow(true)
        window.scrollTo({
            left:0,
            top:0,
            behavior:'smooth'
        })
    }
    return(
        <div className="Home">
            <SearchHeader/>
            <br/>
            <div className="home-body-content">
             <ProductBox/>
             <br/>
             <DetailAndRate showDetail= {showDetail}/>
             <br/>
            <ProductSuggestion/>
            </div>
           
            <ProductModalDetail active={show} productId={1} setActive={setShow} />
            <Footer/>
        </div>
    )
}

export default ProductDetail