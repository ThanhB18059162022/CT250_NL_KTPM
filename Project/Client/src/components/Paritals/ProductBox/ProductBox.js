import { useState } from "react"
import "./ProductBox.Style.scss"
const ProductBox = ()=>{
    const product_info = {
        image:[
            '/image/iphone.jpeg',
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
                    <img src={product_info.image[pos]}/>
                    <ul>
                        {product_info.image.map((item,index)=><li key={index} onClick={()=>setPos(index)}> <img src={item}/></li>)}
                    </ul>
                </div>
            </div>
            <div className="product-box-detail">
                <p className="name">iPhone 13 Pro Max Max Max Max MAx MMax Max Maxs</p>
                <div className="class-price">
                    {product_info.price.map((item,index)=>
                        <div onClick={()=>setChoose(index)} 
                            className={choose==index?"choose":""} 
                            key={index}><p>{item.storage}</p><p>{item.price}</p>
                        </div>)}
                </div>
                <p className="product-box-price">{product_info.price[choose].price}</p>
                <p className="support-sell">Hỗ trợ thanh toán</p>
                <div className="sell-ways">
                    <img src="/icon/zalopayicon.png" />
                    <img src="/icon/paypalicon.png"/>
                    <img src="/icon/codicon.png"/>
                </div>
                <button>Thêm vào giỏ hàng</button>
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