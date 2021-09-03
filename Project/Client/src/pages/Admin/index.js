import { AdminHeader } from "../../components/Paritals/Header";
import Navigation from "../../components/Paritals/Navigation";
import OverView from "./OverView";
import ProductManagement from "./ProductManagement";
import FeedbackManagement from "./FeedbackManagement";
import ModeratorManagement from "./ModeratorManagement";
import Statistic from "./Statistic";
import { useState } from "react";
const Admin = () =>{
    const [pos,setPos] = useState(0)


    const getComponents = ()=>{
        switch (pos){
            case 0: return <OverView/>
            case 1: return <ProductManagement/>
            case 2: return <FeedbackManagement/>
            case 3: return <ModeratorManagement/>
            case 4: return <Statistic/>
        }
    }

    return(
        <div className = "Admin">
            <AdminHeader/>
            <Navigation handle = {setPos}/>
            {getComponents()}
        </div>
    );
}

export default Admin