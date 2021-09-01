import { ListButton } from "../../Controls"
const Navigation = ()=>{
    const buttonName = ["Home","About","Contact"]
    return(
        <ul>
            {buttonName.map((item,index)=><ListButton key={index} name={item}/>)}
        </ul>
    )
}

export default Navigation