import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Helper from "../../../helpers"
import "./ProductModalDetail.Style.scss"
const ProductModalDetail = ({ active = false, setActive, product, ...props }) => {
    return (    
        <div className={`ProductModalDetail ${active && 'show'}`}>
            <div className="wrapper">
                <h3>Thông tin chi tiết sản phẩm  <FontAwesomeIcon icon={faTimes} onClick={() => setActive(false)} /></h3>
                <div className="product-detail-info" >
                    <div className="image-area">
                        <img src={product.prod_imgs[0]} alt="phone.jpg" />
                    </div>
                    <div className="info">
                        <h2>{product.prod_name}</h2>
                        <ul className="panel">
                            <li>
                                <h3>Thông tin sản phẩm</h3>
                                <div className="detail_info">
                                    <p><span>Tên sản phẩm:</span><span>{product.prod_name}</span></p>
                                    <p><span>Nhãn hiệu:</span><span>{product.prod_manufacturer.brand_name}</span></p>
                                    <p><span>Ngày sản xuất:</span><span>{Helper.Exchange.toLocalDate(product.prod_manufacturer.releaseDate)}</span></p>
                                    <p><span>Xuất xứ:</span><span>{product.prod_manufacturer.madeIn}</span></p>
                                </div>
                            </li>
                            <li>
                                <h3>Màn hình</h3>
                                <div className="detail_info">
                                    <p><span>Loại màn hình:</span><span>{product.prod_screen.type}</span></p>
                                    <p><span>Độ phân giải:</span><span>{product.prod_screen.resolution}</span></p>
                                    <p><span>Kich thước:</span><span>{product.prod_screen.size}</span></p>
                                    <p><span>Cường lực:</span><span>{product.prod_screen.glass}</span></p>
                                </div>
                            </li>
                            <li>
                                <h3>Camera</h3>
                                <div className="detail_info">
                                    <p><span>Camera trước:</span><span>{product.prod_camera.rear.spec}</span></p>
                                    <p><span>Độ phân giải:</span><span>{product.prod_camera.font}</span></p>
                                    <p className="max"><span>Video:</span><span>{product.prod_camera.rear.videoQuality}</span></p>
                                </div>
                            </li>
                            <li>
                                <h3>Phần cứng và hệ điều hành</h3>
                                <div className="detail_info">
                                    <p><span>Hệ điều hành:</span><span>{product.prod_hardwareAndOS.os}</span></p>
                                    <p><span>Vi xử lý:</span><span>{product.prod_hardwareAndOS.cpu}</span></p>
                                    <p><span>Đồ họa:</span><span>{product.prod_hardwareAndOS.gpu}</span></p>
                                    <p className="max"><span>Tốc độ xử lý:</span><span>{product.prod_hardwareAndOS.cpuSpec}</span></p>
                                </div>
                            </li>
                            <li>
                                <h3>Mạng và Kết nối</h3>
                                <div className="detail_info">
                                    <p><span>Mạng di động:</span><span>{product.prod_network.telecom}</span></p>
                                    <p><span>SIM:</span><span>{product.prod_network.SIM}</span></p>
                                    <p className="max"><span>Wifi:</span><span>{product.prod_network.Wifi}</span></p>
                                    <p><span>GPS:</span><span>{product.prod_network.GPS}</span></p>
                                    <p><span>Bluetooth:</span><span>{product.prod_network.Bluetooth}</span></p>
                                    <p><span>Kết nối:</span><span>{product.prod_network.connector}</span></p>
                                    <p><span>Khác:</span><span>{product.prod_network.others}</span></p>
                                </div>
                            </li>
                            <li>
                                <h3>Pin và Sạc</h3>
                                <div className="detail_info">
                                    <p><span>Pin:</span><span>{product.prod_batteryAndCharger.battery}</span></p>
                                    <p><span>Loại:</span><span>{product.prod_batteryAndCharger.batteryType}</span></p>
                                    <p><span>Kiểu sạc:</span><span>{product.prod_batteryAndCharger.chargeType}</span></p>
                                </div>
                            </li>
                            <li>
                                <h3>Thiết kế</h3>
                                <div className="detail_info">
                                    <p><span>Thiết kế:</span><span>{product.prod_design.structural}</span></p>
                                    <p><span>Chất liệu:</span><span>{product.prod_design.material}</span></p>
                                    <p><span>Kích thước:</span><span>{product.prod_design.size}</span></p>
                                    <p><span>Cân nặng:</span><span>{product.prod_design.size}</span></p>
                                </div>
                            </li>
                            <li>
                                <h3>Đặc điểm khác</h3>
                                <div className="detail_info">
                                {product.prod_utilities.map((item,index)=> <p key={index}><span>{Object.keys(item)[0]}:</span><span>{item[`${Object.keys(item)[0]}`]}</span></p>)}
                                </div>
                            </li>
                            
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModalDetail