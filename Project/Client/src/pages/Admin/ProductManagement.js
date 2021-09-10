import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { AdminButton } from "../../components/Controls/Button"
import ProductList from "../../components/Paritals/Admin/ProductPage/ProductList"

const ProductManagement = (props) => {
    return(
        <div>
            <div className="ProductManagementButton">
                <AdminButton IconName={faPlus} AddNewClicked={()=>props.setState(1)} setToDo={props.setToDo}/>
            </div>
            <ProductList name="Danh sách sản phẩm" setState={props.setState} setToDo={props.setToDo} setID={props.setID}/>
        </div>
    )
}

export default ProductManagement