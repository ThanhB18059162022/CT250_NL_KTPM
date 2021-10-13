import { useState } from "react";
import { SearchIcon } from "./FlatIcon";

// const DEFAULT_PLACEHOLDER = "Edit your text";
// const Input = ({ style, options, placeholder, className, type, ...rest }) => {
//   return (
//     <div className="Input">
//       <input
//         className={`input ${options} ${className}`}
//         type={type ? type : "text"}
//         style={style}
//         placeholder={placeholder ? placeholder : DEFAULT_PLACEHOLDER}
//         {...rest}
//       />
//     </div>
//   );
// };
// export default Input;

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

 const RadioInput = ({ data, label, onChange, value, name,...rest }) => {
  return (<div className="input-radio" {...rest}>
    <label>{label}</label>
    <div>
      {data.map((item, index) =>
        <p key={index}><input name={name} {...item} checked={item.value === value} onChange={() => onChange(item.value)} type="radio" /> {item.name}</p>)}
    </div>
  </div>)
}

function TextInput({ value, onChange, label, name, ...rest }) {
  return (
    <div className="input-text-form">
      <input id={name} value={value} onChange={e => onChange(e.target.value)} {...rest} required />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

const SelectInput = ({ value, onChange, label, data, keycode,...rest }) => {
  return (
    <select className="select-input"
      value={value}
      onChange={(e) => onChange(e, keycode)}
      {...rest}
    >
      <option value="-1">{label}</option>
      {data.map((item, index) => (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  )
}

function Input({type,...rest}){
  switch(type){
    case 'input':
      return <TextInput {...rest}/> 
    case 'radio':
      return <RadioInput {...rest}/>
    case 'select':
      return <SelectInput {...rest} />
    default:
      return <div></div>
  }
}

export { Input }

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
  const { filterModerator, filterProduct } = props
  const [search, setSearch] = useState('')
  const SetSearchValue = (text) => {
    setSearch(text.target.value)
    filterModerator ? (
      filterModerator(text.target.value)
    ) : (
      filterProduct(text.target.value)
    )

  }
  return (
    <div className="AdminSearchInput">
      <input placeholder="Tìm kiếm" value={search} onChange={SetSearchValue} required/>
      <button><SearchIcon /></button>
    </div>
  )
}
