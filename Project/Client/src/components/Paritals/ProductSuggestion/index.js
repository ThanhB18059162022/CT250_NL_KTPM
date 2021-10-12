import { useEffect, useState } from "react"
import ProductServices from "../../../api_services/products_services/ProductsService"
import "./ProductSuggestion.Style.scss"
import { ProductItem } from "../../ProductItem"
const ProductSuggestion = ({ id, compare = false }) => {
    const [suggests, setSuggests] = useState([])


    useEffect(() => {
        (async () => {
            let list = (await ProductServices.getSuggests(id, 'prod_no'))
            setSuggests(list.map(items => items.prod_no))
        })()
    }, [id])
    return (
        <div className="ProductSuggestion">
            {
                <div>
                    <h3>Sản phẩm gợi ý</h3>
                    {suggests.length>0?<ul>
                        {suggests.map((item, index) => <ProductItem compare={compare} key={index} id={item} currentId={id} style={{minWidth:'350px'}} />)}
                    </ul>:
                    <div className="list-is-empty">
                        <p>Không có sản phẩm nào</p>
                    </div>}
                </div>
            }
        </div>
    )
}
export default ProductSuggestion