
import Button,{CartButton, AdminListButton, AdminButton} from "./Button";
import Comment from "./Comment";
import Input,{SearchHeaderInput, AdminSearchInput} from "./Input";
import Banner from "./Banner";
import "./Controls.Style.scss";

const Controls = {
  Button,
  CartButton,
  Comment,
  Input,
  SearchHeaderInput,
  Banner
};

export default Controls;
export { Button };
export { Comment };
export { Input };
export {Banner}


//--------Personal Using-----------
export {CartButton}
export {SearchHeaderInput}
//-------Admin------------------
export {AdminListButton}
export {AdminButton}
export {AdminSearchInput}

/** You should import default component
 *  or component you need
 * instead of another class component
 *
 *
 */
