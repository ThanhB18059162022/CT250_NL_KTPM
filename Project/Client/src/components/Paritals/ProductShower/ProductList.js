import "./ProductItem.Style.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMicrochip,faMemory,faMobileAlt,faBatteryThreeQuarters } from "@fortawesome/free-solid-svg-icons"
const ProductList = ()=>{
    let arr = []
    for(let i = 0; i<24; i++){
        arr[i] ={
            src: i%2===0?"./image/samsung.jpeg":"./image/iphone.jpeg"
        }
    }
    return(
        <div className="ProductList">
            <ul>
                {arr.map((item,index)=><ProductItem key={index} info ={item}/>)}
            </ul>
            <button className="product-more">Xem thêm</button>
        </div>
    )
}
export default ProductList;

export const ProductItem = ({info})=>{
    return(
        <li className="ProductItem">
            <img src={info.src} alt={info.src}/>
            <div className="product-info">
                <p className="name">iPhone 13 Pro </p>
                <p className="price">24.000.000đ</p>
                <div  className="product-panel">
                   <p className="chipset"><FontAwesomeIcon icon={faMicrochip}/> Appple A12 Bionic</p>
                    <p>
                        <span>
                            <FontAwesomeIcon icon={faMemory}/> 8Gb
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faMobileAlt}/> 6.5'
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faBatteryThreeQuarters}/>  3000mAh
                        </span>
                    </p>
                </div>
            </div>
            <div className="product-behavior">
                <button className="add-cart">Thêm vào giỏ hàng</button>
            </div>
        </li>
    )
}