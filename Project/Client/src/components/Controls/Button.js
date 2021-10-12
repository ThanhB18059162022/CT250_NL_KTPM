import { CartIcon } from "./FlatIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <button onClick={handle} aria-label="Go to your cart">
                <div className="cart_shower">
                    <CartIcon/>
                    {amount!==0 && <span className="cart_amount">{amount}</span>}
                </div>
                <p> Giỏ hàng</p>
            </button>
        </div>
    )
}


export const AdminListButton = (props) =>{
    const {name,handle,pos} = props
    return <button className="AdminListButton" onClick={()=>handle(pos)}><span>{name}</span></button>
}

export const AdminButton = (props) =>{
    const {IconName, ClickEvent, style} = props 
    return(
        <button style={style} className="AdminButton" onClick={()=>{ClickEvent()}}><FontAwesomeIcon icon={IconName}/></button>
    )
}