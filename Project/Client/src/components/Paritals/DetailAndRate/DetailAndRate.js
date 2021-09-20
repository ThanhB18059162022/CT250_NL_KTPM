import "./DetailAndRate.Style.scss"
import { Comment } from '../../Controls/'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCogs } from "@fortawesome/free-solid-svg-icons"
const DetailAndRate = ({ productID,showDetail }) => {
    const commnets = [
        {
            user: 'Lê Thanh Ngân',
            content: 'Sản phẩm tốt, sài êm'
        },
        {
            user: 'Cẩm Thanh',
            content: 'Màn hình dễ vỡ, yêu cầu trả hàng!'
        },
        {
            user: 'Lê Thanh Ngân',
            content: 'Pin tốt, chơi game hơn 1 ngày'
        },
        {
            user: 'Lê Thanh Ngân',
            content: 'Sản phẩm tốt, sài êm'
        },
        {
            user: 'Lê Thanh Ngân',
            content: 'Sản phẩm tốt, sài êm'
        },
        {
            user: 'Cẩm Thanh',
            content: 'Màn hình dễ vỡ, yêu cầu trả hàng!'
        },
        {
            user: 'Lê Thanh Ngân',
            content: 'Pin tốt, chơi game hơn 1 ngày'
        },
        {
            user: 'Lê Thanh Ngân',
            content: 'Sản phẩm tốt, sài êm'
        },
        {
            user: 'Lê Thanh Ngân',
            content: 'Sản phẩm tốt, sài êm'
        },
        {
            user: 'Cẩm Thanh',
            content: 'Màn hình dễ vỡ, yêu cầu trả hàng!'
        },
        {
            user: 'Lê Thanh Ngân',
            content: 'Pin tốt, chơi game hơn 1 ngày'
        },
        {
            user: 'Lê Thanh Ngân',
            content: 'Sản phẩm tốt, sài êm'
        }
    ]
    return (
        <div className="DetailAndRate">

            <div className="Comments">
                <h3>Nhận xét sản phẩm</h3>
                <div className="comment-area">
                    <input placeholder="Nhận xét của bạn về sản phẩm"/>
                    <button>Đăng</button>
                </div>
                
                <ul>
                    {commnets.map((item, index) => <li key={index}><Comment style={{ background: "#69baff33" }} title={item.user} content={item.content} options="left" /></li>)}
                </ul>
            </div>
            <div className="DetailInfo">
                <div className="detail-wrapper">
                    <h3>Thông số kỹ thuật</h3>
                    <img src='http://localhost:8000/img/1/prod_img1.jpeg' alt="phone" />
                    <p><span>Tên sản phẩm:</span> iPhone 13 Pro max</p>
                    <p><span>Vi xử lý:</span> Apple A13 Bionic</p>
                    <p><span>Màn hình:</span> 6.5' 1280 x 800</p>
                    <p><span>Pin:</span> Lithion 4000mAh</p>

                </div>
                <div className="detail-ways" onClick={showDetail}>
                    <p> <FontAwesomeIcon icon={faCogs} /><span> Chi tiết cấu hình</span></p>
                </div>
            </div>
        </div>
    )
}

export default DetailAndRate