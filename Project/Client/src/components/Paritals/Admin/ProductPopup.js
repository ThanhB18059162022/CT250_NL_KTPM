import { useState } from "react"
import ProductFullInfo from "../../../pages/Admin/ProductFullInfo"
import ProductManagement from "../../../pages/Admin/ProductManagement"

const ProductPopup = () =>{
    const [state, setState] = useState(0)
    const DisplayPopup = (state, setState) => {
        switch(state){
            case 1:
                return <ProductFullInfo state={state} setState={setState}/>
        }
    }
    return(
        <>
            <ProductManagement state={state} setState={setState}/>
            {DisplayPopup(state, setState)}
        </>
    )
}

export default ProductPopup