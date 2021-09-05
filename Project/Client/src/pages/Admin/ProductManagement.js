import { useState } from "react"
import { AdminButton } from "../../components/Controls/Button"
import { ProductList } from "../../components/Paritals/Admin"
import ProductFullInfo from "./ProductFullInfo"

const ProductManagement = () => {
    const [state,setState] = useState(0)
    const displayReview = () => {
        switch (state){
            case 1:
                return <ProductFullInfo/>
        }
    }
    return(
        <div>
            <div className="ProductManagementButton">
                <AdminButton IconName="Add"/>
            </div>
            <ProductList name="Danh sách sản phẩm"/>
            <button onClick={()=>setState(1)}>hien review thong tin sp</button>
            <br/>
            <button onClick={()=>setState(0)}>an review thong tin sp</button>
            {displayReview()}
        </div>
    )
}

export default ProductManagement