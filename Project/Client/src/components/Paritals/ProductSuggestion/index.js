import { ProductItem } from "../ProductShower/ProductList"
import "./ProductSuggestion.Style.scss"
const ProductSuggestion = ({arr, compare = false}) => {
    return (
        <div className="ProductSuggestion">
            {
                arr.length > 0 ? <>
                    <div>
                        <h3>Sản phẩm gợi ý</h3>
                        <ul>
                            {arr.map((item, index) => <ProductItem compare={compare} key={index} info={item} currentId={item.prod_no} />)}
                        </ul>
                    </div>
                </> :
                    <div className="list-is-empty">
                        <p>Không có sản phẩm nào</p>
                    </div>
            }
        </div>
    )
}
export default ProductSuggestion