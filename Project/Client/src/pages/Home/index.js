import Footer from "../../components/Paritals/Footer/Footer"
import MainHeader,{SearchHeader,AdminHeader} from "../../components/Paritals/Header"
import Landing from "../../components/Paritals/Landing"
import ProductShower from "../../components/Paritals/ProductShower"
import './Home.Style.scss'
const Home = (props) => {
    return (
        <div className="Home">
            <SearchHeader/>
            <div className="home-body-content">
                <Landing/>
                <ProductShower/>
            </div>
            <Footer/>
        </div>
    )
}


export default Home;
