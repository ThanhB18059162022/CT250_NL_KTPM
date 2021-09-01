import { AdminListButton } from "../../Controls"

import './Navigation.Style.scss'

const Navigation = ()=>{
    const buttonName = [
        {name: "Tổng quan"},
        {name: "Quản lý sản phẩm"},
        {name: "Quản lý đánh giá"},
        {name: "Quản lý quản trị viên"},
        {name: "Thống kê"}
    ]
    return(
        <div className="AdminMenu">
            <ul>
                {buttonName.map((item,index)=><AdminListButton key={index} name={item.name}/>)}
            </ul>
        </div>
    )
}

export default Navigation