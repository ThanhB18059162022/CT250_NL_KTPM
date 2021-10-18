import { AdminListButton } from "../../Controls"

import './Navigation.Style.scss'

const Navigation = (props)=>{
    const {handle} = props //rest
    const buttonName = [
        {name: "Đơn hàng"},
        {name: "Quản lý sản phẩm"},
        {name: "Quản lý đánh giá"},
        {name: "Quản lý quản trị viên"},
        {name: "Thống kê"}
    ]
    return(
        <div className="AdminMenu">
            <ul>
                {buttonName.map((item,index)=><AdminListButton pos={index} key={index} name={item.name} handle={handle}/>)}
            </ul>
        </div>
    )
}

export default Navigation