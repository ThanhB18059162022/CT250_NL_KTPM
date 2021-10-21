import { useContext, useState, useEffect } from "react";
import Helper from "../../../helpers";
import { CartContext } from "../../../providers/CartProviders";
import "./ProductBox.Style.scss";
import Notifications from "../../../common/Notifications";
import ProductServices from "../../../api_services/products_services/ProductsService";
const ProductBox = ({ id }) => {
    const { upItem } = useContext(CartContext);

    const [choose, setChoose] = useState(0);

    const [pos, setPos] = useState(0);

    const [product, setProduct] = useState(null);

    const [images, setImages] = useState(null);

    const sellway = [
        { name: "Zalo", src: "/icon/zalopayicon.png", alt: "Zalo icon" },
        { name: "Paypal", src: "/icon/paypalicon.png", alt: "Paypal icon" },
        { name: "Stripe", src: "/icon/stripeicon.png", alt: "Stripe icon" },
    ];

    const [show, setShow] = useState(false);

    const [notify, setNotify] = useState({
        content: "",
        title: "",
        type: "INFOTMATION",
        infoType: "INFO",
        onHideRequest: setShow,
    });

    const addItemToCart = () => {
        if (upItem(id, choose)) {
            setNotify({
                ...notify,
                content: "Đã tăng số lượng sản phẩm này!",
                title: "Đã thêm",
            });
        } else
            setNotify({
                ...notify,
                content: "Đã cho sản phẩm này vào giỏ hàng!",
                title: "Đã cho vào giỏ hàng",
            });
        setShow(true);
    };

    useEffect(() => {
        (async () => {
            let data = await ProductServices.getProduct(
                id,
                "prod_status",
                "prod_no",
                "prod_imgs",
                "prod_name",
                "prod_details",
                "prod_hardwareAndOS"
            );
            setImages(data.prod_imgs);
            delete data.prod_imgs;
            setProduct(data);
        })();
    }, [id]);

    return (
        <>
            <div className='ProductBox'>
                <div className='product-box-silder'>
                    <div className='box-silder-wrapper'>
                        <img src={images ? images[pos] : "/image/loading.gif"} alt='product.jpg' />
                        <ul>
                            {images &&
                                images.map((item, index) => (
                                    <li key={index} onMouseEnter={() => setPos(index)}>
                                        <img
                                            style={pos === index ? { opacity: "1" } : null}
                                            alt='imgae.jpg'
                                            src={item}
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                <div className='product-box-detail'>
                    <p className='name'>{product && product.prod_name}</p>
                    <div className='class-price'>
                        {product &&
                            product.prod_details.map((item, index) => (
                                <div
                                    onClick={() => setChoose(index)}
                                    className={choose === index ? "choose" : ""}
                                    key={index}
                                >
                                    <p>{item.pd_storage}</p>
                                    <p>{Helper.Exchange.toMoney(item.pd_price)}</p>
                                </div>
                            ))}
                    </div>
                    <p>
                        <span>Hệ điều hành: </span>
                        {product && product.prod_hardwareAndOS.os}
                    </p>
                    <p>
                        <span>Vi xử lý: </span>
                        {product && product.prod_hardwareAndOS.cpu}
                    </p>
                    <p>
                        <span>Đồ họa: </span>
                        {product && product.prod_hardwareAndOS.gpu}
                    </p>
                    <p>
                        <span>RAM: </span>
                        {product && product.prod_details[choose].pd_ram}
                    </p>
                    <p className='product-box-price'>
                        {product &&
                            (product.prod_status === 0 ? (
                                `${Helper.Exchange.toMoney(
                                    product && product.prod_details[choose].pd_price
                                )}
                        VNĐ`
                            ) : (
                                <span style={{ fontSize: "24px", width: "auto" }}>
                                    NGỪNG KINH DOANH
                                </span>
                            ))}
                    </p>
                    <p className='support-sell'>Hỗ trợ thanh toán</p>
                    <div className='sell-ways'>
                        {sellway.map((item, index) => (
                            <img key={index} src={item.src} alt={item.alt} />
                        ))}
                    </div>

                    <div className='product-box-notify'>
                        <p>Chính sách bảo hành</p>
                        <p>
                            Đổi trả sản phẩm trong 15 ngày.
                            <br />
                            Bảo hàng theo chính sách bảo hành chính hãng!
                        </p>
                    </div>
                    {product &&
                        (product.prod_status === 0 ? (
                            <>
                                {product.prod_details[choose].pd_amount ===
                                product.prod_details[choose].pd_sold ? (
                                    <button
                                        style={{
                                            background: "transparent",
                                            color: "var(--backgroundColor)",
                                            border: "2px solid var(--backgroundColor)",
                                        }}
                                    >
                                        hết hàng
                                    </button>
                                ) : (
                                    <button onClick={addItemToCart}>Thêm vào giỏ hàng</button>
                                )}
                            </>
                        ) : (
                            <button
                                style={{
                                    background: "transparent",
                                    color: "var(--backgroundColor)",
                                    border: "2px solid var(--backgroundColor)",
                                }}
                            >
                                NGừng kinh doanh
                            </button>
                        ))}
                </div>
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    );
};
export default ProductBox;
