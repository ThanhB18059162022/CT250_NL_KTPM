import { useContext, useState } from "react"
import Helper from "../../../helpers"
import { CartContext } from "../../../providers/CartProviders"
import "./ProductBox.Style.scss"
import Notifications from "../../../common/Notifications"
const ProductBox = ({ product }) => {

    const { upItem } = useContext(CartContext)

    const [choose, setChoose] = useState(0)

    const [pos, setPos] = useState(0)

    const sellway = [{ name: 'Zalo', src: '/icon/zalopayicon.png', alt: 'Zalo icon' },
    { name: 'Paypal', src: '/icon/paypalicon.png', alt: 'Paypal icon' },
    { name: 'Stripe', src: '/icon/stripeicon.png', alt: 'Stripe icon' },
    ]

    const [show, setShow] = useState(false);

    const [notify, setNotify] = useState({
        content: "",
        title: "",
        type: "INFOTMATION",
        infoType: "INFO",
        onHideRequest: setShow,
    });

    const addItemToCart = () =>{
        if(upItem(product.prod_no, choose)){
            setNotify({...notify,content:"Đã tăng số lượng sản phẩm này!",title:"Đã thêm"})
        }
        else setNotify({...notify,content:"Đã cho sản phẩm này vào giỏ hàng!",title:"Đã cho vào giỏ hàng"})
        setShow(true)
    }
    return (
        <>
        <div className="ProductBox">
            <div className="product-box-silder">
                <div className="box-silder-wrapper">
                    <img src={product.prod_imgs[pos]} alt="product.jpg" />
                    <ul>
                        {product.prod_imgs.map((item, index) => <li key={index} onMouseEnter={() => setPos(index)}> <img alt="imgae.jpg" src={item} /></li>)}
                    </ul>
                </div>
            </div>
            <div className="product-box-detail">
                <p className="name">{product.prod_name}</p>
                <div className="class-price">
                    {product.prod_details.map((item, index) =>
                        <div onClick={() => setChoose(index)}
                            className={choose === index ? "choose" : ""}
                            key={index}>
                            <p>{item.pd_storage}</p>
                            <p>{Helper.Exchange.toMoney(item.pd_price)}</p>
                        </div>)}
                </div>
                <p className="product-box-price">{Helper.Exchange.toMoney(product.prod_details[choose].pd_price)} VNĐ</p>
                <p className="support-sell">Hỗ trợ thanh toán</p>
                <div className="sell-ways">
                    {sellway.map((item, index) => <img key={index} src={item.src} alt={item.alt} />)}
                </div>
                <button onClick={addItemToCart}>Thêm vào giỏ hàng</button>
            </div>
            <div className="product-box-notify">
                <div>
                    <p>Chính sách bảo hành</p>
                    <p>Đổi trả sản phẩm trong 15 ngày. Bảo hàng theo chính sách bảo hành chính hãng!</p>
                </div>
            </div>
        </div>
        <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    )
}
export default ProductBox