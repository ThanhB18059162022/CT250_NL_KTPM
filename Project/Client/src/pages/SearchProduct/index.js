import Footer from "../../components/Paritals/Footer/Footer";
import { SearchHeader } from "../../components/Paritals/Header";
import ProductShower from "../../components/Paritals/ProductShower";
const SearchProduct = ({ match }) => {
    console.log(match.params.flug)
    return (
        <div className="Home SearchProduct">
            <SearchHeader />
            <div className="home-body-content">
                <br />
                <ProductShower />
            </div>
            <Footer/>
        </div>
    )
}
export default SearchProduct;