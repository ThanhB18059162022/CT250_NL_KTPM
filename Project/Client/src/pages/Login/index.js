import Header from "../../components/Paritals/Header"
import LoginContainer from "./LoginContainer"
import "./Login.Style.scss"
import { useEffect } from "react"
// import { useHistory } from "react-router"
const Login = () =>{
    useEffect(()=>{
        const cus =  document.querySelector('.fb_dialog_content')
        if(!cus) return
        cus.style.display ='none'
        return () => cus.style.display='inherit'
    })
    return(
        <div className="Login">
            <Header/>
            <LoginContainer/>
        </div>
    )
}

export default Login