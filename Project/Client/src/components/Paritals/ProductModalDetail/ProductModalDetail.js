import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./ProductModalDetail.Style.scss"
const ProductModalDetail = ({active=false,setActive,...props}) =>{
    return (
        <div className={`ProductModalDetail ${active && 'show'}`}>
            <div className="wrapper">
                <h3>Thông tin chi tiết sản phẩm  <FontAwesomeIcon icon ={faTimes} onClick={()=>setActive(false)}/></h3>
                <div className="product-detail-info" >
                    <div className="image-area">
                        <img src="/image/iphone.jpeg" alt="phone.jpg"/>
                    </div>
                    <div className="info">
                        <h3>iPhone 13 Promax plus plus pus</h3>
                       <div>
                       <p><span>Ngày sản xuất: </span>20/20/2020</p>
                        <p><span>Hệ điều hành: </span>Android 7.0 Loplipo</p>
                        <p><span>Màn hình: </span>20 inch 12k</p>
                        <p><span>Máy ảnh: </span>Lipioc</p>
                        <p><span>Kích thước: </span>30cm x 15px</p>
                        <p><span>Pin: </span>20.000mAh</p>
                        <p><span>Phần cứng: </span>Chipset A54</p>
                       </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModalDetail