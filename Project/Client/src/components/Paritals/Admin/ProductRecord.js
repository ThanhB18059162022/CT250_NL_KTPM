import { AdminButton } from "../../Controls"
import "./Admin.Style.scss"

const ProductRecord = (props) => {
    const {obj, setState, setToDo, setID} = props
    const getContent = (props) =>{
        const CusStyle = {
            fontSize: "15px",
            padding: "1px 0"
        }
        if(props === 2) return(<><AdminButton IconName="Edit" style={CusStyle} EditClicked={()=>setState(1)} setToDo={setToDo} setID={()=>setID(obj.no)}/> <AdminButton IconName="Delete" style={CusStyle} DeleteClicked={()=>window.confirm("Xóa sản phẩm?")}/></>)
        if(Array.isArray(props)===true) return props.length
        return props
    }

    return(
        <>
            <div className="ProductRecord">
                {Object.keys(obj).map((item,index)=><p key={item}>{getContent(obj[item])}</p>)}
            </div>
            <hr/>
        </>
    )
}

export default ProductRecord