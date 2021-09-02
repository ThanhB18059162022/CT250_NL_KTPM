import "./Admin.Style.scss"
import { AdminButton } from "../../Controls"

const ProductInfo = () => {
    return(
        <>
            <div>
                <AdminButton IconName="Edit"/>
                <AdminButton IconName="Delete"/>
            </div>
            <div className="ProductInfo BorderFormat">
                <p className="Title">Thông tin sản phẩm</p>
                <p className="Info">Mã sản phẩm:</p>
                <p className="Info">Tên sản phẩm:</p>
                <p className="Info">Ngày sản xuất:</p>
                <p className="Info">Màn hình:</p>
                <p className="Info">Máy ản:h</p>
                <p className="Info">Kích thước:</p>
                <p className="Info">Pin:</p>
                <p className="Info">Hệ điều hành:</p>
                <p className="Info">Phần cứng:</p>
            </div>
        </>
    )
}

export default ProductInfo