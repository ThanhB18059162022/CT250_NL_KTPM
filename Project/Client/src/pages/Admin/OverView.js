import "../../components/Paritals/Admin/Admin.Style.scss";
import { AdminSearchInput } from "../../components/Controls";
import { useCallback, useEffect, useState } from "react";
import ApiCaller from "../../api_services/ApiCaller";
import Helper from "../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTimes} from "@fortawesome/free-solid-svg-icons";
import ProductServices from "../../api_services/products_services/ProductsService";
import Notifications from "../../common/Notifications";

//lọc sản phẩm
const filterBill = (message) => {};

const dic = {
    zalopay: 'Zalo Pay',
    paypal: 'Paypal',
    stripe: 'Stripe',
    default:'Tại nhà'
}

const OverView = () => {
    const [orders, setOrders] = useState([]);

    const [paidedOrders, setPaidedOrders] = useState([])
    
    const [detail, setDetail] = useState(null);

    const [notify,setNotify]  = useState(null)

    const [show, setShow] = useState(false)

    const callOrderPaided = useCallback(()=>{
        (async()=>{
            let caller = new ApiCaller();
            let data = await caller.get("payments/getAllsaveorder");
            console.log(data)
            setPaidedOrders(data.map(item=>({...item,total:item.order_total, customer:{...item.customer,cus_address:item.customer.cus_location}})));
        })()
    },[setPaidedOrders])

    const callOrderList = useCallback(()=>{
        (async()=>{
            let caller = new ApiCaller();
            let data = await caller.get("payments/storeorders");
            console.log(data)
            setOrders(data);
        })()
    },[setOrders])

    const onAccept = (id, cus_name) =>{
        setNotify({
            type:'CONFIRMATION',
            title:'Xác nhận đơn hàng',
            content:`Bạn có chắc muốn xác nhận đơn hàng của ${cus_name}`,
            handle:async()=>{
                const caller = new ApiCaller()
                await caller.get(`payments/default/checkoutorder/${id}`)

                setNotify({
                    type:'INFOMATION',
                    infoType:'INFO',
                    title:'Thành công',
                    content:'Xác nhận đơn hàng thành công'
                })
                setDetail(null)
                setShow(true)
                callOrderList()
                callOrderPaided()
            }
        })
        setShow(true)
    }

    const onDeny = (id,cus_name) =>{
        setNotify({
            type:'CONFIRMATION',
            title:'Hủy đơn hàng',
            content:`Bạn có chắc muốn hủy đơn hàng của ${cus_name}`,
            handle:async()=>{
                const caller = new ApiCaller()
                await caller.delete(`payments/storeorders/${id}`)
                setNotify({
                    type:'INFOMATION',
                    infoType:'INFO',
                    title:'Thành công',
                    content:'Hủy đơn hàng thành công'
                })
                setDetail(null)
                setShow(true)
                callOrderList()
            }
        })
        setShow(true)
    }

    useEffect(() => {
        callOrderList()
    }, [callOrderList]);

    useEffect(()=>{
        callOrderPaided()
    },[callOrderPaided])

    return (
        <>
            <div className='OverViewContainer'>
                <div className='ProductToolHeader OverViewToolHeader'>
                    <AdminSearchInput filterBill={filterBill} />
                </div>
                <div className='OverViewList'>
                    <div className='OverViewList_Header'>
                        <p>STT</p>
                        <p className='ordername'>Tên Khách Hàng</p>
                        <p className='orderemail'>Email</p>
                        <p className='orderphone'>Số điện thoại</p>
                        <p className='totalorder'>Số sản phẩm</p>
                        <p className='totalorder'>Giá Trị Đơn</p>
                        <p className='timecreated'>Thời gian tạo</p>
                        <p>Hành động</p>
                    </div>
                    <ul className='OverView_Body'>
                        {orders.map((order, index) => (
                            <li key={index}>
                                <p>{index + 1}</p>
                                <p className='ordername'>{order.customer.cus_name}</p>
                                <p className='orderemail'>{order.customer.cus_email}</p>
                                <p className='orderphone'>{order.customer.cus_phoneNumber}</p>
                                <p className='totalorder'>{order.orderProducts.length}</p>
                                <p className='totalorder'>
                                    {Helper.Exchange.toMoney(order.total)} VNĐ
                                </p>
                                <p className='timecreated'>
                                    {new Date(order.createTime).toLocaleTimeString()}{" "}
                                    {Helper.Exchange.toLocalDate(order.createTime)}
                                </p>
                                <p>
                                    <button onClick={() => setDetail(order)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    {!order.paid && (
                                        <button onClick={()=>onDeny(order.id, order.customer.cus_name)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    )}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='OverViewList' style={{marginTop:'20px'}}>
                    <h3 style={{marginBottom:'10px', color:'var(--backgroundColor)'}}>Đơn hàng đã thanh toán</h3>
                    <div className='OverViewList_Header'>
                        <p>STT</p>
                        <p className='ordername'>Tên Khách Hàng</p>
                        <p className='orderemail'>Email</p>
                        <p className='orderphone'>Số điện thoại</p>
                        <p className='totalorder'>Hình thức</p>
                        <p className='totalorder'>Giá Trị Đơn</p>
                        <p className='timecreated'>Thời gian tạo</p>
                        <p>Hành động</p>
                    </div>
                    <ul className='OverView_Body' style={{maxHeight:'100vh'}}>
                        {paidedOrders.map((order, index) => (
                            <li key={index}>
                                <p>{index + 1}</p>
                                <p className='ordername'>{order.customer.cus_name}</p>
                                <p className='orderemail'>{order.customer.cus_email}</p>
                                <p className='orderphone'>{order.customer.cus_phoneNumber}</p>
                                <p className='totalorder'>{dic[order.order_payment]}</p>
                                <p className='totalorder'>
                                    {Helper.Exchange.toMoney(order.order_total)} VNĐ
                                </p>
                                <p className='timecreated'>
                                    {new Date(order.order_pay).toLocaleTimeString()}{" "}
                                    {Helper.Exchange.toLocalDate(order.order_pay)}
                                </p>
                                <p>
                                    <button onClick={() => setDetail(order)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {detail && <OrderDetail detail={detail} onHideRequest={setDetail} onAccept={onAccept} onDeny={onDeny} />}
            <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    );
};

export default OverView;

const OrderDetail = ({ detail, onHideRequest, onAccept, onDeny }) => {
    console.log(detail)
    const { customer, total, orderProducts: list, paid } = detail;
    const [customList, setCustomList] = useState([]);
    useEffect(() => {
        console.log(list);
        (async () => {
            const data = await Promise.all(
                list.map((item) => ProductServices.getProduct(item.prod_no))
            );
            const detail = data.map((item, index) => {
                const { prod_details, prod_name } = item;
                const { pd_price, pd_storage } = prod_details.filter(
                    (item) => item.pd_no === list[index].pd_no
                )[0];
                return {
                    prod_name,
                    pd_storage,
                    pd_price,
                    prod_quantity: list[index].prod_quantity,
                };
            });
            setCustomList(detail);
        })();
    }, [list]);

    return (
        <div className='detail_transaction'>
            <div className='detail_wrapper'>
                <h3>
                    Thông tin đơn hàng
                    <button className="onhide" onClick={() => onHideRequest(null)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </h3>
                <div className='cus_info'>
                    <p>
                        <span>Khách hàng:</span>
                        {customer.cus_name}
                    </p>
                    <p>
                        <span>Số CMND/CCCD:</span>
                        {customer.cus_id}
                    </p>
                    <p>
                        <span>Giới tính:</span>
                        {customer.cus_sex ? "Nam" : "Nữ"}
                    </p>
                    <p>
                        <span>Email:</span>
                        {customer.cus_email}
                    </p>
                    <p>
                        <span>Số điện thoại:</span>
                        {customer.cus_phoneNumber}
                    </p>
                    <p>
                        <span>Địa chỉ nhận hàng:</span>
                        {customer.cus_address}
                    </p>
                    <p>
                        <span>Tổng giá trị:</span>
                        {Helper.Exchange.toMoney(total)} VNĐ
                    </p>
                </div>
                <div className='detail_header'>
                    <p className='dh_name'>Tên sản phẩm</p>
                    <p className='dh_price'>Phiên bản</p>
                    <p className='dh_price'>Đơn giá</p>
                    <p className='dh_amount'>Số lượng</p>
                    <p className='dh_total'>Thành tiền</p>
                </div>
                <ul>
                    {customList.map((item, index) => (
                        <li key={index}>
                            <p className='dh_name'>{item.prod_name}</p>
                            <p className='dh_price'>{item.pd_storage}</p>
                            <p className='dh_price'>{Helper.Exchange.toMoney(item.pd_price)}</p>
                            <p className='dh_amount'>{item.prod_quantity}</p>
                            <p className='dh_total'>
                                {Helper.Exchange.toMoney(
                                    Number(item.prod_quantity) * Number(item.pd_price)
                                )}
                            </p>
                        </li>
                    ))}
                </ul>
                {!paid && <div className="order_behavior">
                    <button onClick={()=>onAccept(detail.id, customer.cus_name)}>Xác nhận thanh toán</button>    
                    <button onClick={()=>onDeny(detail.id,customer.cus_name)}>Hủy đơn hàng</button>    
                </div>}
            </div>
        </div>
    );
};
