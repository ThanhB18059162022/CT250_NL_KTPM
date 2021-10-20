import { useEffect, useState } from "react";
import Footer from "../../components/Paritals/Footer/Footer";
import { SearchHeader } from "../../components/Paritals/Header";
import ProductList from '../../components/Paritals/ProductShower/ProductList'
import ProductServices from "../../api_services/products_services/ProductsService";
const SearchProduct = ({match}) => {
    const [list, setList]= useState([])
    const flug = match.params.flug
    useEffect(()=>{
        (async()=>{
            let ids = await ProductServices.searchProduct(flug)
            setList(ids)
        })()
    },[flug])
    return (
        <div className="Home SearchProduct">
            <SearchHeader />
            <div className="home-body-content">
                <br />
                <ProductList list={list} style={{
                    display:'flex',
                    flexWrap:'wrap',
                    justifyContent:'center',
                    minHeight:'100vh'
                }} />
            </div>
            <Footer/>
        </div>
    )
}
export default SearchProduct;