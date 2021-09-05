import { useState } from "react"
import { AdminButton } from "../../components/Controls/Button"
import { ProductList } from "../../components/Paritals/Admin"
import ProductFullInfo from "./ProductFullInfo"

const ProductManagement = (props) => {
    // const [state,setState] = useState(0)
    // const displayReview = (props.state) => {
    //     switch (props.state){
    //         case 1:
    //             return <ProductFullInfo state={props.state} setState={props.setState}/>
    //     }
    // }
    
    return(
        <div>
            <div className="ProductManagementButton">
                <AdminButton IconName="Add"/>
            </div>
            <ProductList name="Danh sách sản phẩm"/>
            <button onClick={()=>props.setState(1)}>hien review thong tin sp</button>
            <br/>
            {/* <button onClick={displayReview(state, setState)}>an review thong tin sp</button> */}
            {/* {displayReview(state, setState)} */}
        </div>
    )
}

export default ProductManagement