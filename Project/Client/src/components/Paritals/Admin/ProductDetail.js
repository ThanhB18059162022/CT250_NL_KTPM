import { AdminButton } from "../../Controls"

const ProductDetail = () => {
    const CusStyle = {
        margin: "1% 5px 5px 12%"
    };
    return(
        <>
            <div className="Button">
                <AdminButton style={CusStyle} IconName="Edit"/>
                <AdminButton IconName="Save"/>
            </div>
            <div className="ProductDetail BorderFormat">
                <p className="Detail">Mã chi tiết:</p>
                <p className="Detail">Bộ nhớ:</p>
                <p className="Detail">Giá:</p>
                <p className="Detail">Số lượng:</p>
                <p className="Detail">Đã bán:</p>
            </div>
            <hr className="DetailSplit"/>
        </>
    )
}

export default ProductDetail