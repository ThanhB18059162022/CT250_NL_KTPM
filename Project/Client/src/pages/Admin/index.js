import { AdminHeader } from "../../components/Paritals/Header";
import Navigation from "../../components/Paritals/Navigation";
import OverView from "./OverView";
import FeedbackManagement from "./FeedbackManagement";
import ModeratorManagement from "./ModeratorManagement";
import Statistic from "./Statistic";
import { useState } from "react";
import ProductManagement from "./ProductManagement";
// Thanh viết
import { AuthenticationService } from "../../api_services/servicesContainer";
import ApiCaller from "../../api_services/ApiCaller";

import { useHistory } from "react-router-dom";

const Admin = () => {
    const [pos, setPos] = useState(0);
    const [adminNo, setAdminNo] = useState(0);
    // Thanh viết
    const history = useHistory();

    if (!window.localStorage.getItem("jwtToken")) history.push("/login");
    else {
        const auth = new AuthenticationService(new ApiCaller());
        auth.getUser()
            .then((user) => {
                if (!adminNo) setAdminNo(user.user.id);
            })
            .catch((err) => history.push("/login"));
    }

    const getComponents = () => {
        switch (pos) {
            case 0:
                return <OverView />;
            case 1:
                return <ProductManagement />;
            case 2:
                return <FeedbackManagement />;
            case 3:
                return <ModeratorManagement currentAdNo={adminNo} />;
            case 4:
                return <Statistic />;
            default:
                return;
        }
    };

    return (
        <div className='Admin'>
            <AdminHeader adminNo={adminNo} />
            <Navigation handle={setPos} />
            {getComponents()}
        </div>
    );
};

export default Admin;
