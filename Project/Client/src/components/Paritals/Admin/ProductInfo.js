import "./Admin.Style.scss"
import { AdminButton } from "../../Controls"

const ProductInfo = (props) => {
    const CusStyle = {
        margin: "1% 5px 5px 12%"
    };
    console.log(props.id)
    if (props.toDo === "addProduct") {
        return(
            <>
                <AdminButton style={CusStyle} IconName="Save"/>
                <div className="ProductInfo BorderFormat">
                    <p className="Title">Thông tin sản phẩm</p>
                    <form className="AddProductForm">
                        <div className="InfoTitle">
                            <p className="Info">Mã sản phẩm</p>
                            <p className="Info">Tên sản phẩm</p>
                            <p className="Info">Ngày sản xuất</p>
                            <p className="Info">Màn hình</p>
                            <p className="Info">Máy ảnh</p>
                            <p className="Info">Kích thước</p>
                            <p className="Info">Pin</p>
                            <p className="Info">Hệ điều hành</p>
                            <p className="Info">Phần cứng</p>
                            {/* <p className="Info">Hình ảnh</p> */}
                        </div>
                        <div className="InfoInput">
                            <input name="txtPropNo" type="text" disabled></input> <br/>
                            <input name="txtPropName" type="text"></input> <br/>
                            <input name="txtPropMFG" type="text"></input> <br/>
                            <input name="txtScreen" type="text"></input> <br/>
                            <input name="txtCamera" type="text"></input> <br/>
                            <input name="txtSize" type="text"></input> <br/>
                            <input name="txtBattery" type="text"></input> <br/>
                            <input name="txtOS" type="text"></input> <br/>
                            <input name="txtHardware" type="text"></input> <br/>
                            {/* <input type="file" id="myFile" name="filename"></input> */}
                        </div>
                    </form>
                </div>
            </>
        )
    } else if(props.toDo === "editProduct") {
        return(
            <>
                <AdminButton style={CusStyle} IconName="Save"/>
                <div className="ProductInfo BorderFormat">
                    <p className="Title">Thông tin sản phẩm</p>
                    <form className="AddProductForm">
                        <div className="InfoTitle">
                            <p className="Info">Mã sản phẩm</p>
                            <p className="Info">Tên sản phẩm</p>
                            <p className="Info">Ngày sản xuất</p>
                            <p className="Info">Màn hình</p>
                            <p className="Info">Máy ảnh</p>
                            <p className="Info">Kích thước</p>
                            <p className="Info">Pin</p>
                            <p className="Info">Hệ điều hành</p>
                            <p className="Info">Phần cứng</p>
                            {/* <p className="Info">Hình ảnh</p> */}
                        </div>
                        <div className="InfoInput">
                            <input name="txtPropNo" type="text" disabled value={props.id}></input> <br/>
                            <input name="txtPropName" type="text"></input> <br/>
                            <input name="txtPropMFG" type="text"></input> <br/>
                            <input name="txtScreen" type="text"></input> <br/>
                            <input name="txtCamera" type="text"></input> <br/>
                            <input name="txtSize" type="text"></input> <br/>
                            <input name="txtBattery" type="text"></input> <br/>
                            <input name="txtOS" type="text"></input> <br/>
                            <input name="txtHardware" type="text"></input> <br/>
                            {/* <input type="file" id="myFile" name="filename"></input> */}
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default ProductInfo