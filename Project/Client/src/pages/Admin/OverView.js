import "../../components/Paritals/Admin/Admin.Style.scss";
import { AdminSearchInput } from "../../components/Controls";
import { useEffect, useState } from "react";
import ApiCaller from "../../api_services/ApiCaller";
import Helper from "../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTimes, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//lọc sản phẩm
const filterBill = (message) => {};

const OverView = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        (async () => {
            let caller = new ApiCaller();
            let data = await caller.get("payments/storeorders");
            console.log(data);
            setOrders(data);
        })();
    }, []);
    return (
        <div className='OverViewContainer'>
            <div className='ProductToolHeader OverViewToolHeader'>
                <AdminSearchInput filterBill={filterBill} />
            </div>
            <div className='OverViewList'>
                <div className='OverViewList_Header'>
                    <p>STT</p>
                    <p className="ordername">Tên Khách Hàng</p>
                    <p className="orderemail">Email</p>
                    <p className="orderphone">Số điện thoại</p>
                    <p className="totalorder">Số sản phẩm</p>
                    <p className="totalorder">Giá Trị Đơn</p>
                    <p className="timecreated">Thời gian tạo</p>
                    <p>Hành động</p>
                </div>
                <ul className='OverView_Body'>
                    {orders.map((order, index) => (
                        <li key={index}>
                            <p>{index+1}</p>
                            <p className="ordername">{order.customer.cus_name}</p>
                            <p className="orderemail">{order.customer.cus_email}</p>
                            <p className="orderphone">{order.customer.cus_phoneNumber}</p>
                            <p className="totalorder">{order.orderProducts.length}</p>
                            <p className="totalorder">{Helper.Exchange.toMoney(order.total)} VNĐ</p>
                            <p className="timecreated">{new Date(order.createTime).toLocaleTimeString()} {Helper.Exchange.toLocalDate(order.createTime)}</p>
                            <p>
                                <button>
                                    <FontAwesomeIcon icon={faEye}/>
                                </button>
                                {!order.paid && <button>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </button>}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OverView;
