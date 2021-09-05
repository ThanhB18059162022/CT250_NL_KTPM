import { AdminButton } from "../../Controls"
import "./Admin.Style.scss"

const ProductRecord = (props) => {
    const {obj} = props
    const getContent = (props) =>{
        const CusStyle = {
            fontSize: "15px",
            padding: "1px 0"
        };
        if(props === 2) return(<><AdminButton IconName="Watch" style={CusStyle}/> <AdminButton IconName="Delete" style={CusStyle}/></>)
        if(Array.isArray(props)==true) return props.length
        return props
    }
    return(
        <>
            <div className="ProductRecord">
                {Object.keys(obj).map((item,index)=><p>{getContent(obj[item])}</p>)}
            </div>
            <hr/>
        </>
    )
}

export default ProductRecord