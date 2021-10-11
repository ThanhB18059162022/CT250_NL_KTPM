
import { ProductItem } from "../../ProductItem"
const ProductList = (props) => {
    const { list, toNextPage, isNextPage } = props
    return (
        <div className="ProductList">
            {
                list.length > 0 ? <> <ul>
                    {list.map((item, index) => <ProductItem key={index} id={item}/>)}
                </ul>
                    {isNextPage ? <button className="product-more" onClick={toNextPage}>Xem thêm</button>:
                    <p>Bạn đã xem hết sản phẩm</p>}
                </> :
                    <div className="list-is-empty">
                        <p>Không có sản phẩm nào</p>
                    </div>
            }

        </div>
    )
}
export default ProductList;