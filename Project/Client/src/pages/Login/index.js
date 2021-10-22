import Header from "../../components/Paritals/Header"
import LoginContainer from "./LoginContainer"
import "./Login.Style.scss"
// import { useHistory } from "react-router"
const Login = () =>{
    // const history = useHistory()
    // if(window.localStorage.getItem('jwtToken')) history.push('/admin')
    return(
        <div className="Login">
            <Header/>
            <LoginContainer/>
        </div>
    )
}

export default Login