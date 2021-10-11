import "./DetailAndRate.Style.scss"
import { Comment } from '../../Controls/'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCogs } from "@fortawesome/free-solid-svg-icons"
import Helper from "../../../helpers"
const DetailAndRate = ({ product, showDetail }) => {
    console.log(product)
    return (
        <div className="DetailAndRate">
            <div className="Comments">
                <h3>Nhận xét sản phẩm</h3>
                <div className="comment-area">
                    <input placeholder="Nhận xét của bạn về sản phẩm" />
                    <button>Đăng</button>
                </div>

                <ul>
                    {product.prod_feedbacks?product.prod_feedbacks.length > 0 ? product.prod_feedbacks.map((item, index) =>
                        <li key={index}>
                            <Comment style={{ background: "#69baff33" }} title={item.fb_cusomter.cus_name} content={item.fb_content} options="left" time={Helper.Exchange.toLocalDate(item.fb_time)}
                                children={item.fb_replies.map((e,idx) => <Comment key={idx} style={{ background: "#69baff33" }} title={e.rep_mod} content={e.rep_content} options="left" time={Helper.Exchange.toLocalDate(e.rep_time)} />)} />
                        </li>): <p>Chưa có đánh giá nào</p>:<p>Chưa có đánh giá nào</p>}
                </ul>
            </div>
            <div className="DetailInfo">
                <div className="detail-wrapper">
                    <h3>Thông số kỹ thuật</h3>
                    <img src={product.prod_imgs[0]} alt="phone" />
                    <div className="some_info">
                        <p><span>Tên sản phẩm:</span>{product.prod_name}</p>
                        <p><span>Vi xử lý:</span> {product.prod_hardwareAndOS.cpu}</p>
                        <p><span>Màn hình:</span> 6.5' 1280 x 800</p>
                        <p><span>Pin:</span>{product.prod_batteryAndCharger.batteryType} {product.prod_batteryAndCharger.battery}</p>
                        <p><span>Thiết kế:</span>{product.prod_design.structural}</p>
                    </div>
                </div>
                <div className="detail-ways" onClick={showDetail}>
                        <p> <FontAwesomeIcon icon={faCogs} /><span> Chi tiết cấu hình</span></p>
                    </div>
            </div>
        </div>
    )
}

export default DetailAndRate