import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import OrderServices from "../../api_services/payment_services/OrderServices"
import ProductServices from "../../api_services/products_services/ProductsService"
import Footer from "../../components/Paritals/Footer"
import { SearchHeader } from "../../components/Paritals/Header"
import { CartContext } from "../../providers/CartProviders"
import './SuccessDirect.Style.scss'
const dic = {
    zalo: 'Zalo Pay',
    paypal: 'Paypal',
    stripe: 'Stripe'
}
const SuccessDirect = ({ match }) => {
    const { type, id } = match.params
    const { clearItem } = useContext(CartContext)
    const [customer, setCustomer] = useState(null)
    const [list, setList] = useState([])
    const [info, setInfo] = useState(null)
    const history = useHistory()
    useEffect(() => {
        (async () => {
            let data = await OrderServices.getOrder(type, id)
            
            setInfo(data)
            if (!data) return;
            setCustomer(data.customer)
            let sublist = await Promise.all(data.product.map(item =>
                ProductServices.getProduct(item.prod_no, 'prod_name', 'prod_imgs', 'prod_details')
            ))

            setList(sublist)
            data && clearItem()
        })()
    }, [type, id,clearItem])
    console.log(list)
    return (
        <div className="Home">
            <SearchHeader />
            <div className="success_container">
                {info ? <div className="success_wrapper">
                    <p className="logo">Octopus</p>
                    <h2>THANH TOÁN {dic[type]}</h2>
                    <h3>Hi {customer && customer}</h3>
                    <p>Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi!</p>
                    <p><span>Mã đơn hàng :</span> #{id}</p>
                    <p><span>Thời gian thanh toán:</span> {new Date(info.time).toLocaleTimeString()}</p>
                    <button onClick={() => history.push('/')}>Về trang chủ</button>
                </div> : <div className="notfound">
                    <h3>Trang không tồn tại</h3>
                    <button onClick={() => history.push('/')}>Về trang chủ</button>
                </div>}
            </div>
            <Footer />
        </div>
    )
}
export default SuccessDirect