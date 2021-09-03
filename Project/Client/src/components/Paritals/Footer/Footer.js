import "./Footer.Style.scss"
const Footer = () => {
    const trandmade = [
        "Apple","Samsung","Oppo","Nokia"
    ]
    const policy = [
        "Chính sách bảo hành",
        "Chính sách đổi trả",
        "Chính sách thanh toán"
    ]
    return (
        <div className="Footer">
            <div>
                <p><b>Sản phẩm</b></p>
                <ul className="trademade">
                    {trandmade.map((item,index)=><li key={index}><p>{item}</p></li>)}
                </ul>
            </div>
            <div>
                <p><b>Chính sách</b></p>
                <ul className="policy">
                {policy.map((item,index)=><li key={index}><p>{item}</p></li>)}
                </ul>
            </div>
            <div>
                <p><b>Về chúng tôi</b></p>
                <ul>
                    <li className="storename">
                       <p>Octopus</p>
                    </li>
                    <li><p>Liên hệ: 0987654311</p></li>
                    <li><p>Fan page: fb.com/octopus</p></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;