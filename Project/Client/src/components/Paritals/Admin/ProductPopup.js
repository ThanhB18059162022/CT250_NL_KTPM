import { useState } from "react"
import ProductFullInfo from "../../../pages/Admin/ProductFullInfo"
import ProductManagement from "../../../pages/Admin/ProductManagement"

const ProductPopup = () =>{
    const [state, setState] = useState(0)
    const [toDo, setToDo] = useState("nothing")
    const [id, setID] = useState("null")

    const DisplayPopup = () => {
        switch(state){
            case 1:{
                return <ProductFullInfo setState={setState} toDo={toDo} setToDo={setToDo} id={id}/>
            }
        }
    }

    return(
        <>
            <ProductManagement setState={setState} setToDo={setToDo} setID={setID}/>
            {DisplayPopup()}
        </>
    )
}

export default ProductPopup