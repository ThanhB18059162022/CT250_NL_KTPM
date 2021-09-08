import "./Admin.Style.scss"
import { AdminButton } from "../../Controls"

const ProductInfo = (props) => {
    const CusStyle = {
        margin: "1% 5px 5px 12%"
    };
    if (props.toDo === "addProduct") {
        return(
            <>
                <AdminButton style={CusStyle} IconName="Save"/>
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
    } else if(props.toDo === "editProduct") {
        return(
            <>
                <AdminButton style={CusStyle} IconName="Save"/>
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
}

export default ProductInfo