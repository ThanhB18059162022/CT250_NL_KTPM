
import "./Controls.Style.scss"

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
