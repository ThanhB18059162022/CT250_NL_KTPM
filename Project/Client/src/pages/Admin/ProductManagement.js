import { AdminButton } from "../../components/Controls/Button"
import { ProductList } from "../../components/Paritals/Admin"

const ProductManagement = (props) => {
    return(
        <div>
            <div className="ProductManagementButton">
                <AdminButton IconName="Add" AddProductClicked={()=>props.setState(1)} setToDo={props.setToDo}/>
            </div>
            <ProductList name="Danh sách sản phẩm" setState={props.setState} setToDo={props.setToDo} setID={props.setID}/>
        </div>
    )
}

export default ProductManagement