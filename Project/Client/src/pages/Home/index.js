
import logo from "../../logo.svg";
import {ApiCaller} from "../../api_services/servicesContainer"
import Helper from "../../helpers";
import { Button, Comment } from "../../components/Controls";
const getData = async () => {
    // var apiCaller = new ApiCaller();

    // var res = await apiCaller.get("notes");
    // console.log(res.data);
    console.log(Helper.Sum(5, 10))
};

const Home = (props) => {
    console.log({...props})
    return (
        <div className="Home">
            <p>Home page will show here</p>
            <Comment title="Nguyễn Văn A" content="This is the content will show here!" style={{background:'red'}}/>
        </div>
    )
}

export default Home