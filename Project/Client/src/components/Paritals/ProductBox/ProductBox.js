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

    const [currentColor, setCurrentColor] = useState(null);

    const addItemToCart = () => {
        if (upItem(id, choose, currentColor)) {
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
        let load = true;
        (async () => {
            let data = await ProductServices.getProduct(
                id,
                "prod_status",
                "prod_no",
                "prod_imgs",
                "prod_name",
                "prod_details",
                "prod_hardwareAndOS",
                "prod_colors"
            );

            if (!load) return;
            setCurrentColor(data.prod_colors[0]);
            setImages(data.prod_imgs);
            delete data.prod_imgs;
            setProduct(data);
        })();
        return () => (load = false);
    }, [id]);

    const getIsDiscount = () => {
        if (!product) return;
        if (product.prod_details[choose].pd_discount) {
            if (
                new Date().getTime() <=
                    new Date(product.prod_details[choose].pd_discount.end).getTime() &&
                new Date().getTime() >=
                    new Date(product.prod_details[choose].pd_discount.start).getTime()
            )
                return (
                    <div className='discount_area'>
                        <img src='/icon/discounticon.png' alt='discount_icon' />
                        <span>
                            {product.prod_details[choose].pd_discount.percent}
                            <i>%</i>
                        </span>
                        <i>OFF</i>
                    </div>
                );
        }
        return <></>;
    };

    const getMoney = () => {
        let percent =0
        if (product.prod_details[choose].pd_discount)
            if (
                new Date().getTime() <=
                    new Date(product.prod_details[choose].pd_discount.end).getTime() &&
                new Date().getTime() >=
                    new Date(product.prod_details[choose].pd_discount.start).getTime()
            )
                percent = product.prod_details[choose].pd_discount.percent
        return <p className='product-box-price'>
            {Helper.Exchange.toMoney(
                Helper.CalcularDiscount(
                    product.prod_details[choose].pd_price,
                    percent
                )
            )}{" "} VNĐ
        </p>;
    };

    const getOldPrice = () => {
        let percent = 0
        if (product.prod_details[choose].pd_discount)
        if (
            new Date().getTime() <=
                new Date(product.prod_details[choose].pd_discount.end).getTime() &&
            new Date().getTime() >=
                new Date(product.prod_details[choose].pd_discount.start).getTime()
        )
            percent = product.prod_details[choose].pd_discount.percent
        if(percent!==0)
            return <p className='discount'>
                Giá cũ:{" "}
                <span>
                    {Helper.Exchange.toMoney(product.prod_details[choose].pd_price)} VNĐ
                </span>
            </p>;
    };

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
                    <div className='product_color'>
                        {product &&
                            product.prod_colors.length > 0 &&
                            product.prod_colors.map((item, index) => (
                                <p
                                    onClick={() => setCurrentColor(item)}
                                    className={`${item === currentColor && "check"}`}
                                    key={index}
                                >
                                    {item}
                                </p>
                            ))}
                    </div>
                    <div className='someinfo'>
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
                    </div>

                    {product &&
                        (product.prod_status === 0 ? (
                            <>
                                {getMoney()}
                                {getOldPrice()}
                            </>
                        ) : (
                            <p>
                                <span style={{ fontSize: "24px", width: "auto" }}>
                                    NGỪNG KINH DOANH
                                </span>
                            </p>
                        ))}

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
                {getIsDiscount()}
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    );
};
export default ProductBox;
