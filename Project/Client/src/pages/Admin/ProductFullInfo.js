import "../../components/Paritals/Admin/Admin.Style.scss"
import { ProductInfo, ProductDetail } from "../../components/Paritals/Admin"
import { AdminButton } from "../../components/Controls"

const ProductFullInfo = (props) => {
    return(
        <div className="ProductFullInfo">
            <div>
                <button className="CloseBtn">close</button>
                <ProductInfo/>
                <div className="ProductFullInfoSplit">
                    <p className="Title Line"><span>Chi tiết sản phẩm</span></p>
                    <div className="Button">
                        <AdminButton IconName="Add"/>
                    </div>
                </div>
                <ProductDetail/>
                <ProductDetail/>
            </div>
        </div>
    )
}

export default ProductFullInfo