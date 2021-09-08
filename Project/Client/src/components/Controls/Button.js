import { CartIcon } from "./FlatIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrashAlt, faKey, faReply, faEye, faSave } from "@fortawesome/free-solid-svg-icons";

const Button = ({
    content,
    options,
    style,
    handle,
    children,
    className,
    ...rest
}) => {
    return (
        <div className="Button">
            <button
                className={`button ${className!=null?className:""} ${options}`}
                onClick={handle}
                style={style}
                {...rest}
            >
                {content}
                {children}
            </button>
        </div>
    );
}

export default Button

/** Using
 *
 * option:  empty: nothing, just content
 *        shadow:show shadow around the button
 *        noneradius: remove the radius
 *        hover: make button can be hover with shadow around
 *        default; just content and radius border
 *        /you can use multiple option/
 * style: override the current style (with reactjs systax)
 *
 * content: the title will be show on the button
 *
 * handle: the event will happpen when click
 *
 *  */


//----Customizimg------------
export const CartButton = ({handle, amount}) => {
    return (
        <div className="CartButton">
            <button onClick={handle}>
                <div className="cart_shower">
                    <CartIcon/>
                    {amount!==undefined && <span className="cart_amount">{amount}</span>}
                </div>
                <p> Giỏ hàng</p>
            </button>
        </div>
    )
}


export const AdminListButton = (props) =>{
    const {name,handle,pos} = props
    return(
        <button className="AdminListButton" onClick={()=>handle(pos)}>{name}</button>
    )
}

export const AdminButton = (props) =>{
    const {IconName} = props 
    const getIcon = (IconName) => {
        if (IconName === "Add") return faPlus
        else if (IconName === "Edit") return faEdit
        else if (IconName === "Delete") return faTrashAlt
        else if (IconName === "Reply") return faReply
        else if (IconName === "Watch") return faEye
        else if (IconName === "Save") return faSave
        else return faKey 
    }
    const GetClick = (props) => {
        if(props.AddProductClicked){
            props.setToDo("addProduct")
            props.AddProductClicked()
        }
        else if(props.EditClicked){
            props.setToDo("editProduct")
            props.setID()
            props.EditClicked()
        } 
        else if(props.DeleteClicked) props.DeleteClicked()
    }     
    return(
        <button style={props.style} className="AdminButton" onClick={()=>GetClick(props)}><FontAwesomeIcon icon={getIcon(IconName)}/></button>
    )
}