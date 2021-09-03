import MainHeader, {
  SearchHeader,
  AdminHeader,
} from "../../components/Paritals/Header";
import Landing from "../../components/Paritals/Landing";
import "./Home.Style.scss";
import Products from "./Products";
const Home = (props) => {
  console.log({ ...props });
  return (
    <div className="Home">
      <SearchHeader />
      <div style={{ height: "500vh" }} className="home-body-content">
        <Landing />
        <hr />
        <Products />
      </div>
    </div>
  );
};

export default Home;
