import "../Admin.Style.scss"
import { AdminButton } from "../../../Controls"
import { faSave } from "@fortawesome/free-solid-svg-icons";

const ProductInfo = (props) => {
    const {prodNo} = props
    const CusStyle = {
        margin: "1% 5px 5px 12%"
    };
    // console.log(props.id)
    // if (props.toDo === "addNew") {
        return(
            <>
                <AdminButton style={CusStyle} ClickEvent={()=>alert("luu")} IconName={faSave}/>
                <div className="ProductInfo BorderFormat">
                    <p className="Title">Thông tin sản phẩm</p>
                    <form className="AddProductForm">
                        <div className="InfoTitle">
                            <p>Mã sản phẩm:</p>
                            <input name="txtPropNo" type="text" disabled value={(prodNo)?prodNo:""}></input> <br/>
                        </div>
                        <div>
                            <p>Tên sản phẩm:</p>
                            <input name="txtPropName" type="text"></input> <br/>
                        </div>
                        <div>
                            <p>Ngày sản xuất:</p>
                            <input name="txtPropMFG" type="text"></input> <br/>
                        </div>
                        <div>
                            <p>Màn hình:</p>
                            <input name="txtScreen" type="text"></input> <br/>
                        </div>
                        <div>
                            <p>Máy ảnh:</p>
                            <input name="txtCamera" type="text"></input> <br/>
                        </div>
                        <div>
                            <p>Kích thước:</p>
                            <input name="txtSize" type="text"></input> <br/>
                        </div>
                        <div>
                            <p>Pin:</p>
                            <input name="txtBattery" type="text"></input> <br/>
                        </div>
                        <div>
                            <p>Hệ điều hành:</p>
                            <input name="txtOS" type="text"></input> <br/>
                        </div>
                        <div>
                            <p>Phần cứng:</p>
                            <input name="txtHardware" type="text"></input> <br/>
                        </div>
                    </form>
                </div>
            </>
        )
//     } else if(props.toDo === "edit") {
//         return(
//             <>
//                 <AdminButton style={CusStyle} IconName={faSave}/>
//                 <div className="ProductInfo BorderFormat">
//                     <p className="Title">Thông tin sản phẩm</p>
//                     <form className="AddProductForm">
//                         <div className="InfoTitle">
//                             <p className="Info">Mã sản phẩm</p>
//                             <p className="Info">Tên sản phẩm</p>
//                             <p className="Info">Ngày sản xuất</p>
//                             <p className="Info">Màn hình</p>
//                             <p className="Info">Máy ảnh</p>
//                             <p className="Info">Kích thước</p>
//                             <p className="Info">Pin</p>
//                             <p className="Info">Hệ điều hành</p>
//                             <p className="Info">Phần cứng</p>
//                             {/* <p className="Info">Hình ảnh</p> */}
//                         </div>
//                         <div className="InfoInput">
//                             <input name="txtPropNo" type="text" disabled value={props.id}></input> <br/>
//                             <input name="txtPropName" type="text"></input> <br/>
//                             <input name="txtPropMFG" type="text"></input> <br/>
//                             <input name="txtScreen" type="text"></input> <br/>
//                             <input name="txtCamera" type="text"></input> <br/>
//                             <input name="txtSize" type="text"></input> <br/>
//                             <input name="txtBattery" type="text"></input> <br/>
//                             <input name="txtOS" type="text"></input> <br/>
//                             <input name="txtHardware" type="text"></input> <br/>
//                             {/* <input type="file" id="myFile" name="filename"></input> */}
//                         </div>
//                     </form>
//                 </div>
//             </>
//         )
//     }
}

export default ProductInfo