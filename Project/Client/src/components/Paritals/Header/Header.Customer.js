import { CartButton } from "../../Controls";
import { SearchHeaderInput } from "../../Controls";
import { SearchIcon, TimesIcon } from "../../Controls/FlatIcon";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { AdminInformation, ChangePwd } from "../Admin";
import "./Header.Style.scss";
import { CartContext } from "../../../providers/CartProviders";
// Thanh viết
import { AuthenticationService } from "../../../api_services/servicesContainer";
import ApiCaller from "../../../api_services/ApiCaller";

const Header = ({ children, ...rest }) => {
  const history = useHistory();
  return (
    <div className="Header">
      <div className="header-wrapper">
        <div className="header-logo">
          <p onClick={() => history.push("/")}>Octopus.com</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Header;

export const SearchHeader = ({ ...rest }) => {
  const [state, setstate] = useState(false);
  const history = useHistory();
  const { amount } = useContext(CartContext);
  const searchHandle = (entry) => {
    if (entry.trim().length === 0) return;
    history.push(`/search/${entry}`);
  };

  return (
    <>
      <input
        onClick={() => setstate(!state)}
        type="checkbox"
        id="search_header_check"
      />
      <Header {...rest}>
        <SearchHeaderInput searchHandle={searchHandle} />
        <label className="searchsortcut" htmlFor="search_header_check">
          {state ? <TimesIcon /> : <SearchIcon />}{" "}
        </label>
        <div className="header-cart">
          <CartButton amount={amount} handle={() => history.push("/cart")} />
        </div>
      </Header>
    </>
  );
};

export const AdminHeader = ({ ...rest }) => {
  const [state, setState] = useState(0);
  // Thanh viết
  const history = useHistory();

  const review = () => {
    switch (state) {
      case 1:
        return <AdminInformation setState={setState} />;
      case 2:
        return <ChangePwd setState={setState} />;
      default:
        return;
    }
  };

  // Thanh viết
  const logout = () => {
    const auth = new AuthenticationService(new ApiCaller());

    auth.logout();

    history.push("/login");
  };

  return (
    <Header>
      <div className="header-admin">
        <div className="header-admin-panel">
          <label>
            Xin chào <span> Admin name </span>
          </label>
          <div className="admin-control-panel">
            <div className="panel">
              <button onClick={() => setState(1)}>Thông tin</button>
              <button onClick={() => setState(2)}>Đổi mật khẩu</button>
              <button onClick={logout}>Thoát</button>
            </div>
          </div>
        </div>
      </div>
      {review()}
    </Header>
  );
};
