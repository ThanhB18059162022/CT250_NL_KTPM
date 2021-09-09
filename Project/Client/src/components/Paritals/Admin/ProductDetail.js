import { AdminButton } from "../../Controls"

const ProductDetail = () => {
    const CusStyle = {
        margin: "1% 5px 5px 12%"
    };
    return(
        <>
            <div className="DetailButton">
                <AdminButton style={CusStyle} IconName="Delete"/>
            </div>
            <div className="ProductDetail BorderFormat">
                <form className="AddDetailForm">
                    <div className="DetailTitle">
                        <p className="Detail">Mã chi tiết</p>
                        <p className="Detail">Bộ nhớ</p>
                        <p className="Detail">Giá</p>
                        <p className="Detail">Số lượng</p>
                        <p className="Detail">Đã bán</p>
                        <p className="Detail">Hình ảnh</p>
                    </div>
                    <div className="DetailInput">
                        <input name="txtPropNo" type="text" disabled></input> <br/>
                        <input name="txtPropName" type="text"></input> <br/>
                        <input name="txtPropMFG" type="text"></input> <br/>
                        <input name="txtScreen" type="text"></input> <br/>
                        <input name="txtScreen" type="text"></input> <br/>
                        <input type="file" id="myFile" name="filename" multiple></input>
                    </div>
                </form>
            </div>
            <hr className="DetailSplit"/>
        </>
    )
}

export default ProductDetail