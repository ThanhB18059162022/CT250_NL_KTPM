import { useState } from "react";
import { SearchIcon } from "./FlatIcon";

const DEFAULT_PLACEHOLDER = "Edit your text";
const Input = ({ style, options, placeholder, className, type, ...rest }) => {
  return (
    <div className="Input">
      <input
        className={`input ${options} ${className}`}
        type={type ? type : "text"}
        style={style}
        placeholder={placeholder ? placeholder : DEFAULT_PLACEHOLDER}
        {...rest}
      />
    </div>
  );
};
export default Input;

/** Using Input
 *  options:  shadow: make shadow around the input
 *            radius: input border radius
 *            noneborder: remove the border
 *  style: override your style
 *
 *  placeholder:promt text
 *
 *  className: add your className if necessary
 *
 *  type: type of input
 *  */
//-------------Customizing---------------

export const SearchHeaderInput = ({ searchHandle }) => {
  const [text, setText] = useState("")

  const searchEvent = () => searchHandle(text)

  return (
    <div className="HeaderSearch">
      <div className="header-search">
        <input value={text} onChange={e => setText(e.target.value)} type="text" placeholder="Nhập sản phẩm bạn cần tìm..." />
        <button onClick={searchEvent} aria-label="Search your product">
          <SearchIcon />
        </button>
      </div>
    </div>
  )
}

export const AdminSearchInput = (props) => {
  const {filterModerator, filterProduct} = props
  const [search, setSearch] = useState('')
  const SetSearchValue = (text) => {
    setSearch(text.target.value)
    {filterModerator?(
      filterModerator(text.target.value)
    ):(
      filterProduct(text.target.value)
    )}
    
  }
  return(
    <div className="AdminSearchInput">
      <input placeholder="Tìm kiếm" value={search} onChange={SetSearchValue}/>
      <button><SearchIcon/></button>
    </div>
  )
}
