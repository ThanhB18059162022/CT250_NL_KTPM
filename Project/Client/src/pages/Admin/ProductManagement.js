
import { useState, useEffect } from "react"

import ProductList from "../../components/Paritals/Admin/ProductPage/ProductList"
import ProductFullInfo from "./ProductFullInfo"
import ProductServices from "../../api_services/products_services/ProductsService"

const ProductManagement = () => {
    const [displayAddForm, setDisplayAddForm] = useState(0)
    const [newProduct, setNewProduct] = useState({})
    const [newProductNo, setNewProductNo] = useState()

    const displayAddNewForm = () => {
        switch (displayAddForm) {
            case 1: return <ProductFullInfo setDisplayEditProduct={setDisplayAddForm} newProduct={newProduct} setNewProduct={setNewProduct} newProductNo={newProductNo} />
            default: return;
        }
    }

    const [productsList, setProductsList] = useState([])
    useEffect(() => {
        (async () => {
            let data = (await ProductServices.getProducts(1, 10000, 'prod_no'))
            let items = await Promise.all(data.items.map(item => ProductServices.getProduct(item.prod_no)))
            setProductsList(items)
        })(); // IIFE // Note setProduct([...products, item])
    }, [])

    useEffect(() => {
        setNewProductNo(productsList.length + 1)
    }, [productsList])

    if (Object.keys(newProduct).length !== 0) {
        setProductsList([...productsList, newProduct])
        setNewProduct({})
    }

    return (
        <div>
            <ProductList newProduct={newProduct} productsList={productsList} setDisplayAddForm={setDisplayAddForm} />
            {displayAddNewForm()}
        </div>
    )
}

export default ProductManagement