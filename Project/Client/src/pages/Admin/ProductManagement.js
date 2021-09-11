import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { AdminButton } from "../../components/Controls/Button"
import ProductList from "../../components/Paritals/Admin/ProductPage/ProductList"
import ProductFullInfo from "./ProductFullInfo"

const ProductManagement = () => {
    const [addNew, setAddNew] = useState(0)
    const displayAddNewForm = () =>{
        switch(addNew){
            case 1: return <ProductFullInfo setDisplay={setAddNew}/>
            default: return;
        }
    }
    return(
        <div>
            <div className="ProductManagementButton">
                <AdminButton IconName={faPlus} ClickEvent={()=>setAddNew(1)}/>
            </div>
            <ProductList/>
            {displayAddNewForm()}
        </div>
    )
}

export default ProductManagement