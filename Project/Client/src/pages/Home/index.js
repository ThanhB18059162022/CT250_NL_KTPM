
import MainHeader,{SearchHeader,AdminHeader} from "../../components/Paritals/Header"

const Home = (props) => {
    console.log({...props})
    return (
        <div className="Home">
            <SearchHeader/>
        </div>
    )
}

export default Home