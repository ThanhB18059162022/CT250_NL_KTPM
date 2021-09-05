import { AdminSearchInput } from "../../Controls"
import ProductRecord from "./ProductRecord"
import "./Admin.Style.scss"

const ProductList = (props) => {
    const {name} = props
    let obj = {
        no : "Mã sản phẩm",
        name : "Tên sản phẩm",
        os : "Hệ điều hành",
        hardware : "Phần cứng",
        details : "Số chi tiết",
        action : "Hành động"
    }
    let obj2 = {
        no : "001",
        name : "Dien thoai iPhoneX",
        os : "IOS",
        hardware : "Chip A11",
        details : [
            {color : "do"},
            {color : "den"}
        ],
        action : 2
    }

    return(
        <div className="ListLayout">
            <AdminSearchInput/>
            <div className="AdminListClass BorderFormat">
                <p className="Title">{name}</p>
                <br/>
                <ProductRecord obj={obj}/>
                <ProductRecord obj={obj2}/>
                <ProductRecord obj={obj2}/>
            </div>

        </div>
    )
}

export default ProductList