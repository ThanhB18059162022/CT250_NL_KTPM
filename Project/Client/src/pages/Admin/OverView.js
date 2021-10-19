import "../../components/Paritals/Admin/Admin.Style.scss"
import { AdminSearchInput } from "../../components/Controls"

//lọc sản phẩm
const filterBill = (message) => {
}

const OverView = () => {
    return(
        <div className="OverViewContainer">
            <div className="ProductToolHeader OverViewToolHeader">
                <AdminSearchInput filterBill={filterBill} />
            </div>
            <div className="OverView_Header">
                <p>STT</p>
                <p>Mã đơn</p>
                <p>Tên Khách Hàng</p>
                <p>Số điện thoại</p>
                <p>Giá Trị Đơn</p>
                <p>Thời gian tạo</p>
                <p>Hình thức thanh toán</p>
                <p>Hành động</p>
            </div>
            <div className="OverView_Body">

            </div>
        </div>
    )
}

export default OverView