import { ProductItem } from "../ProductShower/ProductList"
import "./ProductSuggestion.Style.scss"
const ProductSuggestion = () => {
    let arr = []
    for (let i = 0; i < 10; i++) {
        arr[i] = {
            src: i % 2 === 0 ? "/image/samsung.jpeg" : "/image/iphone.jpeg"
        }
    }
    return (
        <div className="ProductSuggestion">
            {
                arr.length > 0 ? <>
                    <div>
                        <h3>Sản phẩm gợi ý</h3>
                        <ul>
                            {arr.map((item, index) => <ProductItem compare={true} key={index} info={item} />)}
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