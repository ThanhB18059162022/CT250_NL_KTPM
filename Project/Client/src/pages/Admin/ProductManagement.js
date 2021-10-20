
import { useState, useEffect } from "react"
import ProductList from "../../components/Paritals/Admin/ProductPage/ProductList"
import ProductFullInfo from "./ProductFullInfo"
import ProductServices from "../../api_services/products_services/ProductsService"

const ProductManagement = () => {
    //biến hiển thị form thêm sản phẩm
    const [displayAddForm, setDisplayAddForm] = useState(0)
    //biến load danh sách
    const [modifyList, setModifyList] = useState(0)

    //hiển thị form thêm sản phẩm
    const displayAddNewForm = () => {
        switch (displayAddForm) {
            case 1: return <ProductFullInfo setDisplayEditProduct={setDisplayAddForm} setModifyList={setModifyList}/>
            default: return;
        }
    }

    //danh sách sản phẩm
    const [productsList, setProductsList] = useState([])
    //lấy sản phẩm từ server
    useEffect(() => {
        (async () => {
            let data = (await ProductServices.getProducts(1, 10000, 'prod_no'))
            let items = await Promise.all(data.items.map(item => ProductServices.getProduct(item.prod_no)))
            setProductsList(items)
            if(modifyList === 1) setModifyList(0)
        })(); // IIFE // Note setProduct([...products, item])
    }, [modifyList])

    return (
        <div>
            <ProductList productsList={productsList} setDisplayAddForm={setDisplayAddForm} setModifyList={setModifyList}/>
            {displayAddNewForm()}
        </div>
    )
}

export default ProductManagement