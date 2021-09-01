
import MainHeader,{SearchHeader,AdminHeader} from "../../components/Paritals/Header"
import Landing from "../../components/Paritals/Landing"
import './Home.Style.scss'
const Home = (props) => {
    console.log({...props})
    return (
        <div className="Home">
            <SearchHeader/>
            <div style={{height:'500vh'}} className="home-body-content">
            <Landing/>
            </div>
        </div>
    )
}

export default Home