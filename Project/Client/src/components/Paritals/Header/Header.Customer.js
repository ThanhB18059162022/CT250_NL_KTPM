import { CartButton } from "../../Controls"
import { SearchHeaderInput } from "../../Controls"
import { SearchIcon, TimesIcon } from "../../Controls/FlatIcon"
import { useState } from "react"
import "./Header.Style.scss"
const Header = ({children,...rest}) => {
    return (
        <div className="Header">
            <div className="header-wrapper">
                <div className="header-logo">
                    <p>Octopus.com</p>
                </div>
                {children}
                <div className="header-cart">
                    <CartButton amount ="10" handle={()=>console.log("hello")}/>
                </div>
            </div>

        </div>
    )
}
export default Header;
export const SearchHeader =({...rest})=>{
    const [state, setstate] = useState(false)
    return (
        <>
        <input onClick={()=>setstate(!state)} type="checkbox" id="search_header_check"/>
        <Header {...rest}>
            <SearchHeaderInput/>
            <label htmlFor="search_header_check">{state?<TimesIcon/>:<SearchIcon/>} </label>
        </Header>
        </>
    )
}

