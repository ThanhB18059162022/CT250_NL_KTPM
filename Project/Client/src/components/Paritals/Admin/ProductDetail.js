import { AdminButton } from "../../Controls"

const ProductDetail = () => {
    return(
        <>
            <div className="Button">
                <AdminButton IconName="Edit"/>
                <AdminButton IconName="Delete"/>
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