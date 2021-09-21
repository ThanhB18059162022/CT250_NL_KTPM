import { useContext, useState } from "react"
import { CartContext } from "../../../providers/CartProviders"
import "./ProductBox.Style.scss"
const ProductBox = ({product})=>{
    const {upItem} = useContext(CartContext)

    //need delete in the future
    const product_info = {
        image:[
            'https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/3/17/637515991822611897_vivo-y12s-2021-den-1.jpg',
            '/image/samsung.jpeg',
            '/image/iphone.jpeg',
            '/image/samsung.jpeg',
            '/image/iphone.jpeg'
        ],
        price:[
            {
                storage: "16Gb",
                price:"20.000.000đ"
            },
            {
                storage: "32Gb",
                price:"40.000.000đ"
            },
            {
                storage: "64Gb",
                price:"30.000.000đ"
            }
        ]
    }
    const [choose, setChoose] = useState(0)
    const [pos, setPos] =useState(0)
    return(
        <div className="ProductBox">
            <div className="product-box-silder">
                <div className="box-silder-wrapper">
                    <img src={product_info.image[pos]} alt="product.jpg"/>
                    <ul>
                        {product_info.image.map((item,index)=><li key={index} onClick={()=>setPos(index)}> <img alt="imgae.jpg" src={item}/></li>)}
                    </ul>
                </div>
            </div>
            <div className="product-box-detail">
                <p className="name">{product.prod_name}</p>
                <div className="class-price">
                    {product_info.price.map((item,index)=>
                        <div onClick={()=>setChoose(index)} 
                            className={choose===index?"choose":""} 
                            key={index}><p>{item.storage}</p><p>{item.price}</p>
                        </div>)}
                </div>
                <p className="product-box-price">{product_info.price[choose].price}</p>
                <p className="support-sell">Hỗ trợ thanh toán</p>
                <div className="sell-ways">
                    <img src="/icon/zalopayicon.png" alt="zalo" />
                    <img src="/icon/paypalicon.png" alt="paypal"/>
                    <img src="/icon/stripeicon.png" alt="cod"/>
                </div>
                <button onClick={()=>upItem(product.prod_no)}>Thêm vào giỏ hàng</button>
            </div>
            <div className="product-box-notify">
                <div>
                    <p>Chính sách bảo hành</p>
                    <p>Đổi trả sản phẩm trong 15 ngày. Bảo hàng theo chính sách bảo hành chính hãng!</p>
                </div>
            </div>
           
        </div>
    )
}
export default ProductBox