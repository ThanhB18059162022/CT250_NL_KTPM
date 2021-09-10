import { CartIcon } from "./FlatIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrashAlt, faKey, faReply, faEye, faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";

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
    const GetClick = (props) => {
        if(props.AddNewClicked){
            props.setToDo("addNew")
            props.AddNewClicked()
        }
        else if(props.EditClicked){
            props.setToDo("edit")
            props.setID()
            props.EditClicked()
        }
        else if(props.CloseClicked){
            props.CloseClicked()
        }
        else if(props.DeleteClicked){
            props.setID()
            props.DeleteClicked()
        }
        else if(props.WatchClicked){
            props.setID()
            props.WatchClicked()
        }
        else if(props.ReplyClicked){
            props.ReplyClicked()
        }
        else if(props.ChangePwdClicked){
            props.ChangePwdClicked()
        }
        else if(props.SaveClicked){
            props.SaveClicked()
        }
    }     
    return(
        <button style={props.style} className="AdminButton" onClick={()=>GetClick(props)}><FontAwesomeIcon icon={IconName}/></button>
    )
}