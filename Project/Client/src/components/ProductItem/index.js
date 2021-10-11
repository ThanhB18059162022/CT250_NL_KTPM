import { faBatteryThreeQuarters, faMemory, faMobileAlt,faMicrochip, faBoxOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState , useContext, useEffect} from "react"
import {useHistory} from 'react-router-dom'
import ProductServices from "../../api_services/products_services/ProductsService"
import Helper from "../../helpers"
import { CartContext } from "../../providers/CartProviders"
import "./ProductItem.Style.scss"

export const ProductItem = ({ id, compare = false, currentId = -1,...rest }) => {

    const history = useHistory()
    
    const {upItem} =useContext(CartContext)

    const [item, setItem] = useState(null)

    const [isHover,setHover] = useState(false)

    const [images, setImages] = useState(null)

    const [idx, setIdx] = useState(0)

    const addToLocalCart = () =>upItem(id)

    useEffect(()=>{
        let load = true;
        (async()=>{
            let data = await ProductServices.getProduct(id)
            if(!load) return
            setImages(data.prod_imgs)
            setItem(data)
        })()
        return ()=>load =  false
    },[id])

    useEffect(()=>{
        let interval = null
        if(isHover){
            interval =setInterval(()=>{
                if(idx===images.length-1) setIdx(0)
                else setIdx(idx+1)
            },1000)
        }
        else setIdx(0)
        return ()=>{
            interval && clearInterval(interval)
        }
    },[isHover, idx, images])

    return (
        <li className="ProductItem" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} {...rest}>
            <div  onClick={()=>history.push(`/product/${id}`)}>
                <img src={images?images[idx]:'/image/loading.gif'} alt="product_shower"/>
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