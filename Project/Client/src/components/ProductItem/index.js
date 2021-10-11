import { faBatteryThreeQuarters, faMemory, faMobileAlt,faMicrochip, faBoxOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState , useContext, useEffect} from "react"
import {useHistory} from 'react-router-dom'
import ProductServices from "../../api_services/products_services/ProductsService"
import Helper from "../../helpers"
import { CartContext } from "../../providers/CartProviders"
import "./ProductItem.Style.scss"

export const ProductItem = ({ id, compare = false, currentId = -1 }) => {

    const history = useHistory()
    
    const {upItem} =useContext(CartContext)
        
    const addToLocalCart = () => {
       upItem(currentId)
    }

    const [item, setItem] = useState(null)

    useEffect(()=>{
        let load = true;
        (async()=>{
            let data = await ProductServices.getProduct(id)
            if(!load) return
            setItem(data)
        })()
        return ()=>load =  false
    },[id])

    return (
        <li className="ProductItem">
            <div  onClick={()=>history.push(`/product/${id}`)}>
                <img src={item?item.prod_imgs[0]:'/image/loading.gif'} alt="product_shower"/>
                <div className="product-info">
                    <p className="name">{item && item.prod_name}</p>
                    <p className="price">{item && Helper.Exchange.toMoney(item.prod_details[0].pd_price)} VND</p>
                    <div className="product-panel">
                        <p className="chipset"><FontAwesomeIcon icon={faMicrochip} /> {item && item.prod_hardwareAndOS.cpu}</p>
                        <p><FontAwesomeIcon icon={faBoxOpen} /> Hệ điều hành: {item && item.prod_hardwareAndOS.os}</p>
                        <p>
                            <span>
                                <FontAwesomeIcon icon={faMemory} /> {item && item.prod_details[0].pd_ram}
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faMobileAlt} /> {item && item.prod_screen.size.substr(0,item.prod_screen.size.indexOf(`'`)+1)}
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBatteryThreeQuarters} /> {item && item.prod_batteryAndCharger.battery}
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