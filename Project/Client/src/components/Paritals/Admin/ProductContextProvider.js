import React from "react"

const ProductContext = React.createContext()

const ProductContextProvider = (props) => {
    return(
        <ProductContext.Provider>
            {props.Children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider