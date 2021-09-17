import "../../components/Paritals/Admin/Admin.Style.scss"
import { ProductInfo, ProductDetail } from "../../components/Paritals/Admin"
import { AdminButton } from "../../components/Controls"
import { faPlus, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const ProductFullInfo = (props) => {
    const {productInfo} = props
    const [details, setDetails] = useState([])
    const [display, setDisplay] = useState(0)
    const displayAddDetail = () => {
        switch(display){
            case 1: return  <div className="AddProductDetail">
                                <ProductDetail setDisplay={setDisplay} details={details} setDetails={setDetails}/>
                            </div>
            default: return;
        }
    }

    return(
        <div className="ProductFullInfo">
            <div className="ProductFullInfoWrapper">
                <button onClick={()=>props.setDisplay(0)} className="CloseBtn"><FontAwesomeIcon icon={faWindowClose}/></button>
                <ProductInfo productInfo={productInfo}/>
                <div className="ProductFullInfoSplit">
                    <p className="Title Line"><span>Chi tiết sản phẩm</span></p>
                    <div className="Button">
                        <AdminButton IconName={faPlus} ClickEvent={()=>setDisplay(1)}/>
                    </div>
                </div>
                {details.map((detail,index)=><ProductDetail key={index} info={detail}/>)}
                {displayAddDetail()}
            </div>
        </div>
    )
}

export default ProductFullInfo