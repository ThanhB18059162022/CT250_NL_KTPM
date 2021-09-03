import ProductNavigation from "./ProductNavigation";
import ProductList from "./ProductList";
import "./ProductShower.Style.scss"

const ProductShower = () =>{
    return (
        <div className="ProductShower">
            <ProductNavigation/>
            <ProductList/>
        </div>
    )
}

export default ProductShower;