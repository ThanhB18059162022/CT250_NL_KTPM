import "./DetailAndRate.Style.scss"
import { Comment } from '../../Controls/'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCogs } from "@fortawesome/free-solid-svg-icons"
import Helper from "../../../helpers"
import { useState, useEffect } from "react"
import ProductServices from "../../../api_services/products_services/ProductsService"
const DetailAndRate = ({ id, showDetail }) => {
    const [product, setProduct] = useState(null)
    const [feedback, setFeedback] = useState(null)

    useEffect(()=>{
        (async()=>{
            let data = await ProductServices.getProduct(id, 'prod_name','prod_screen','prod_manufacturer','prod_hardwareAndOS','prod_batteryAndCharger','prod_design')
           setProduct(data)
        })()
        setFeedback([])
    },[id])

    return (
        <div className="DetailAndRate">
            <div className="Comments">
                <h3>Nhận xét sản phẩm</h3>
                <div className="comment-area">
                    <input placeholder="Nhận xét của bạn về sản phẩm" />
                    <button>Đăng</button>
                </div>

                <ul>
                    {feedback && feedback.length > 0 ? product.prod_feedbacks.map((item, index) =>
                        <li key={index}>
                            <Comment style={{ background: "#69baff33" }} title={item.fb_cusomter.cus_name} content={item.fb_content} options="left" time={Helper.Exchange.toLocalDate(item.fb_time)}
                                children={item.fb_replies.map((e, idx) => <Comment key={idx} style={{ background: "#69baff33" }} title={e.rep_mod} content={e.rep_content} options="left" time={Helper.Exchange.toLocalDate(e.rep_time)} />)} />
                        </li>) : <p>Chưa có đánh giá nào</p>}
                </ul>
            </div>
            <div className="DetailInfo">
                <h3>Thông số kỹ thuật</h3>
                <ul className="some_info">
                    <li><span>Tên sản phẩm:</span> {product && product.prod_name}</li>
                    <li><span>Nhãn hiệu:</span> {product && product.prod_manufacturer.brand_name}</li>
                    <li><span>Ngày sản xuất:</span> {product && product.prod_manufacturer.releaseDate}</li>
                    <li><span>Hệ điều hành:</span> {product && product.prod_hardwareAndOS.os}</li>
                    <li><span>Vi xử lý:</span> {product && product.prod_hardwareAndOS.cpu}</li>
                    <li><span>Màn hình:</span> {product && product.prod_screen.type}</li>
                    <li><span>Pin:</span> {product && product.prod_batteryAndCharger.batteryType} {product && product.prod_batteryAndCharger.battery}</li>
                    <li><span>Thiết kế:</span> {product && product.prod_design.structural}</li>
                    <li><span>Xuất xứ:</span> {product && product.prod_manufacturer.madeIn}</li>
                </ul>
                <div className="detail-ways" onClick={showDetail}>
                    <p> <FontAwesomeIcon icon={faCogs} /></p>
                </div>
            </div>

        </div>
    )
}

export default DetailAndRate