import "./ProductItem.Style.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMicrochip, faMemory, faMobileAlt, faBatteryThreeQuarters } from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router"
import Helper from "../../../helpers"
import { useContext } from "react"
import { CartContext } from "../../../providers/CartProviders"
const ProductList = (props) => {
    const { list, toNextPage } = props
    return (
        <div className="ProductList">
            {
                list.length > 0 ? <> <ul>
                    {list.map((item, index) => <ProductItem key={index} info={item} currentId={item.prod_no} />)}
                </ul>
                    <button className="product-more" onClick={toNextPage}>Xem thêm</button>
                </> :
                    <div className="list-is-empty">
                        <p>Không có sản phẩm nào</p>
                    </div>
            }

        </div>
    )
}
export default ProductList;

export const ProductItem = ({ info, compare = false, currentId = -1 }) => {
    const history = useHistory()
    const {upItem} =useContext(CartContext)
    const addToLocalCart = () => {
       upItem(currentId)
    }
    return (
        <li className="ProductItem">
            <div  onClick={()=>history.push(`/product/${currentId}`)}>
                <img src={info.prod_img} alt="product_shower"/>
                <div className="product-info">
                    <p className="name">{info.prod_name}</p>
                    <p className="price">{Helper.Exchange.toMoney(info.prod_price)} VND</p>
                    <div className="product-panel">
                        <p className="chipset"><FontAwesomeIcon icon={faMicrochip} /> {info.prod_cpu}</p>
                        <p>
                            <span>
                                <FontAwesomeIcon icon={faMemory} /> {info.prod_ram}
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faMobileAlt} /> {info.prod_screen}
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBatteryThreeQuarters} /> {info.prod_battery}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="product-behavior">
                <button className="add-cart" aria-label="Add product to the cart" onClick={addToLocalCart}>Thêm vào giỏ hàng</button>
                {compare && <button>So sánh</button>}
            </div>
        </li>
    )
}