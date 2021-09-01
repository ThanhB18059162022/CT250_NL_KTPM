
import MainHeader,{SearchHeader,AdminHeader} from "../../components/Paritals/Header"

const Home = (props) => {
    console.log({...props})
    return (
        <div className="Home">
            <MainHeader/>
        </div>
    )
}

export default Home