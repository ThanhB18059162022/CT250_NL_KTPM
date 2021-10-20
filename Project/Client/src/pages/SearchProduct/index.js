import Footer from "../../components/Paritals/Footer/Footer";
import { SearchHeader } from "../../components/Paritals/Header";
import ProductList from '../../components/Paritals/ProductShower/ProductList'
const SearchProduct = ({ match }) => {
    console.log(match.params.flug)
    return (
        <div className="Home SearchProduct">
            <SearchHeader />
            <div className="home-body-content">
                <br />
                <ProductList/>
            </div>
            <Footer/>
        </div>
    )
}
export default SearchProduct;