import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import OrderServices from "../../api_services/payment_services/OrderServices";
import Footer from "../../components/Paritals/Footer";
import { SearchHeader } from "../../components/Paritals/Header";
import Helper from "../../helpers";
import { CartContext } from "../../providers/CartProviders";
import emailjs from "emailjs-com";
import "./SuccessDirect.Style.scss";
import ProductServices from "../../api_services/products_services/ProductsService";
import html2pdf from 'html-to-pdf-js'
const dic = {
    zalopay: "Zalo Pay",
    paypal: "Paypal",
    stripe: "Stripe",
};
const SuccessDirect = ({ match }) => {
    const { type, id } = match.params;
    const { clearItem } = useContext(CartContext);
    const [info, setInfo] = useState(null);
    const [isSend, setIsSend] = useState(false);
    const history = useHistory();
    useEffect(() => {
        (async () => {
            let data = await OrderServices.getOrder(type, id);

            data.products = await Promise.all(
                data.products.map(async (item) => {
                    const res = await ProductServices.getProduct(item.prod_no);
                    return {
                        ...res,
                        ...item,
                    };
                })
            );
            if (!data) return;
            setInfo(data);
            data && clearItem();
        })();
    }, [type, id, clearItem]);

    useEffect(()=>{
        if(!info) return
        var element = document.getElementById('topdf');
        const link = document.createElement('link')
        link.rel='stylesheet'
        link.href='/template.css'
        link.type='text/css'
        const clone = element.cloneNode(true)
        clone.appendChild(link)

        const sign = document.createElement('div')
        const address = document.createElement('p')
        address.textContent='Chi tiết liên hệ: 0987654321'
        sign.style.marginLeft='20px'
        sign.appendChild(address)
        clone.appendChild(sign)
        html2pdf(clone,{
            jsPDF:        { unit: 'in', format: [7,15], orientation:'landscape' }
        })
    },[info])

    useEffect(() => {
        if (info !== null && isSend === false) {
            emailjs.send(
                "service_yq4sa8u",
                "template_pjgpgn6",
                {
                    email: info.customer.cus_email,
                    id: info.order_no,
                    order: dic[info.order_payment],
                    total: Helper.Exchange.toMoney(info.order_total) + "VNĐ",
                    time: new Date(info.order_pay).toLocaleTimeString(),
                    date: new Date().toLocaleTimeString(),
                    address: info.customer.cus_location,
                    phone: info.customer.cus_phoneNumber,
                },
                "user_bjZeC0AkWf2EgmLIocYkn"
            );
            setIsSend(true);
        }
    }, [info, isSend]);

    
    return (
        <div className='Home'>
            <SearchHeader />
            <div className='success_container'>
                {info ? (
                    <div id='topdf'>
                     
                        <div className='success_wrapper'>
                            <h3 className='success_header'>
                                HÓA ĐƠN THANH TOÁN <p className='logo'>Octopus</p>
                            </h3>
                            <h3>Hi {info.customer.cus_name}</h3>
                            <p>Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi!</p>
                            <p>
                                <span>Mã đơn hàng:</span> #{id}
                            </p>
                            <p>
                                <span>Cổng thanh toán:</span> {dic[info.order_payment]}
                            </p>
                            <p>
                                <span>Thời gian tạo:</span>{" "}
                                {new Date(info.order_create).toLocaleTimeString()}
                            </p>
                            <p>
                                <span>Thời gian thanh toán:</span>{" "}
                                {new Date(info.order_pay).toLocaleTimeString()}
                            </p>
                            <p>
                                <span>Tổng giá trị đơn hàng:</span>{" "}
                                {Helper.Exchange.toMoney(info.order_total)} VNĐ
                            </p>
                            <br />
                            <h3 className='success_header'>CHI TIẾT THANH TOÁN</h3>
                            <div className='success_detail'>
                                <p className='detail_name'>Tên sản phẩm</p>
                                <p className='detail_price'>Phiên bản</p>
                                <p className='detail_price'>Màu sắc</p>
                                <p className='detail_price'>Đơn giá</p>
                                <p className='detail_discount'>Giảm giá</p>
                                <p className='detail_amount'>Số lượng</p>
                                <p className='detail_total'>Thành tiền</p>
                            </div>
                            <ul>
                                {info.products.map((item, index) => {
                                    const detail = item.prod_details.filter(
                                        (i) => i.pd_no === item.pd_no
                                    )[0];
                                    let percent = 0;

                                    if (detail.pd_discount) {
                                        if (
                                            new Date().getTime() <=
                                                new Date(detail.pd_discount.end).getTime() &&
                                            new Date().getTime() >=
                                                new Date(detail.pd_discount.start).getTime()
                                        )
                                            percent = detail.pd_discount.percent;
                                    }

                                    return (
                                        <li key={index}>
                                            <p className='detail_name'>{item.prod_name}</p>
                                            <p className='detail_price'>
                                                {detail.pd_ram}/{detail.pd_storage}
                                            </p>
                                            <p className='detail_price'>
                                                {item.prod_color || "Mặc định"}
                                            </p>
                                            <p className='detail_price'>
                                                {Helper.Exchange.toMoney(item.prod_price)} VNĐ
                                            </p>
                                            <p className='detail_discount'>{percent} %</p>
                                            <p className='detail_amount'>{item.prod_quantity}</p>
                                            <p className='detail_total'>
                                                {Helper.Exchange.toMoney(
                                                    Helper.CalcularDiscount(
                                                        item.prod_price,
                                                        percent
                                                    )
                                                )}{" "}
                                                VNĐ
                                            </p>
                                        </li>
                                    );
                                })}
                            
                            </ul>
                            <p className='note'>
                            Chúng tôi cũng đã gửi một bản sao hóa đơn đến email của bạn!

                        <button onClick={() => history.push("/")}>Về trang chủ</button>
                        </p>
                        </div>
                      
                    </div>
                ) : (
                    <div className='notfound'>
                        <h3>Trang không tồn tại</h3>
                        <button onClick={() => history.push("/")}>Về trang chủ</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};
export default SuccessDirect;
