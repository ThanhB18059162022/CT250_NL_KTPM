import "../../components/Paritals/Admin/Admin.Style.scss"
import { ProductInfo, ProductDetail } from "../../components/Paritals/Admin"
import { AdminButton } from "../../components/Controls"
import { faPlus, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ProductFullInfo = (props) => {
    // if(props.toDo === "addNew"){
        return(
            <div className="ProductFullInfo">
                <div>
                    <button onClick={()=>props.setState(0)} className="CloseBtn"><FontAwesomeIcon icon={faWindowClose}/></button>
                    <ProductInfo toDo={props.toDo} id={props.id}/>
                    <div className="ProductFullInfoSplit">
                        <p className="Title Line"><span>Chi tiết sản phẩm</span></p>
                        <div className="Button">
                            <AdminButton IconName={faPlus} />
                        </div>
                    </div>
                    <ProductDetail/>
                </div>
            </div>
        )
    // }
    // else if(props.toDo === "edit"){
    //     return(
    //         <div className="ProductFullInfo">
    //             <div>
    //                 <button onClick={()=>props.setState(0)} className="CloseBtn"><FontAwesomeIcon icon={faWindowClose}/></button>
    //                 <ProductInfo toDo={props.toDo} id={props.id}/>
    //                 <div className="ProductFullInfoSplit">
    //                     <p className="Title Line"><span>Chi tiết sản phẩm</span></p>
    //                     <div className="Button">
    //                         <AdminButton IconName={faPlus} />
    //                     </div>
    //                 </div>
    //                 <ProductDetail/>
    //             </div>
    //         </div>
    //     )
    // }
}

export default ProductFullInfo