import { AdminHeader } from "../../components/Paritals/Header";
import Navigation from "../../components/Paritals/Navigation";
import { AccessCount, Sales, ProductTrend_Rating } from "../../components/Paritals/Admin";
const Admin = () =>{
    return(
        <div className = "Admin">
            <AdminHeader/>

            <Navigation/>

            <AccessCount/>

            <Sales/>

            <ProductTrend_Rating/>
        </div>
    );
}

export default Admin