import "./CartDetail.Style.scss";

import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useHistory } from 'react-router-dom'
import { useState, useEffect, useContext, useCallback } from "react";
import ReactDOM from "react-dom";

import { CartContext } from "../../../providers/CartProviders";

import Helper from "../../../helpers";
import { caller } from "../../../api_services/servicesContainer";

import Notifications from "../../../common/Notifications";

import { ZaloPaymentService, StripePaymentService } from "../../../api_services/servicesContainer";
import PayPalPayment from "../../../api_services/payment_services/PayPalPayment";
import ProductServices from "../../../api_services/products_services/ProductsService";
import { Input } from "../../Controls";

//==================To the Getway payment ===================

const services = [new ZaloPaymentService(caller), new StripePaymentService(caller)]

const toGetway = url => {
  window.location.href = url
  //  console.log(url)
}

const checkout = async (type, cart) => toGetway(await services[type].createOrder(cart))
//===========================================================

const CartDetail = () => {
  const [list, setList] = useState([]);

  const [total, setTotal] = useState(0);

  const { clearItem, change, forceItem, getItemList, upItem, removeItem, downItem } =
    useContext(CartContext);

  const [display, setDisplay] = useState(false);

  const [show, setShow] = useState(false);

  const [customer, setCustomer] = useState(null)

  const [notify, setNotify] = useState({
    content: "",
    title: "",
    type: "CONFIRMATION",
    infoType: "INFO",
    onHideRequest: setShow,
  });

  useEffect(() => {
    (async () => {
      let listItem = await Promise.all(
        getItemList().map(async (item) => {
          let data = await ProductServices.getProduct(item.id)

          let { pd_amount: amount, pd_sold: sold } = data.prod_details[item.type]
          let somethinselse = amount - sold;
          if (somethinselse > item.amount)
            data.amount = Number(item.amount);
          else {
            data.amount = somethinselse
            forceItem(item.id, item.type, somethinselse)
          }
          if (somethinselse === 0) clearItem(item.id, item.type)

          data.choosedType = item.type
          return data;
        })
      )
      setList(listItem);
    })();
  }, [change, clearItem, forceItem, getItemList]);

  const onValueChange = (id, choosedType, type) => {
    switch (type) {
      case 'UP':
        upItem(id, choosedType)
        break;
      case 'DOWN':
        downItem(id, choosedType)
        break
      default:
        return;
    }
  };

  const onRemoveItem = (id, type) => {
    setNotify({
      ...notify,
      content: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng",
      title: "Xác nhận",
      type: "CONFIRMATION",
      handle: () => removeItem(id, type),
    });
    setShow(true);
  };

  useEffect(() => {
    let count = list.reduce((pre, item) =>
      pre + item.prod_details[item.choosedType].pd_price * item.amount, 0)

    setTotal(count);
  }, [list]);

  const renderPaypalButtonFrame = (cart) => {
    ReactDOM.unmountComponentAtNode(document.querySelector('#paypalwrapper'))
    ReactDOM.render(<PayPalPayment cart={cart} />, document.querySelector('#paypalwrapper'))

    document.querySelector('.paypalarea').classList.add('shower')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div className="CartDetail">
      <h3>Giỏ hàng của bạn</h3>
      <div className="detail-wrapper">
        <div className="cart-list">
          {list.length > 0 ?
            <ul>
              {list.map((item, index) =>
                <CartItem
                  key={index}
                  info={item}
                  changeValue={onValueChange}
                  removeItem={onRemoveItem} />)}
            </ul> :
            <p>Giỏ hàng trống! Tiếp tục mua hàng đi nào!</p>}
        </div>
        <div className="cart-transaction">
          <div className="wrapper">
            <h3>Thông tin thanh toán</h3>
            <p className="total_title">Tạm tính:</p>
            <p className="total_data">{Helper.Exchange.toMoney(total)} VNĐ</p>

            <p className="total_title">Số lượng sản phẩm:</p>
            <p className="total_data">{getItemList().length} sản phẩm</p>

            <p className="total_title">Số lượng chi tiết:</p>
            <p className="total_data">{getItemList().reduce((pre, item) => pre + item.amount, 0)} chi tiết</p>

            <button title="Thanh toán đơn hàng của bạn" onClick={() => setDisplay(true)}>Thanh toán</button>
          </div>
        </div>
      </div>
      <CartTransaction
        display={display}
        setDisplay={setDisplay}
        setCustomer={setCustomer}

      />
      {customer && <DetailTransaction
        customer={customer}
        setCustomer={setCustomer}
        total={total}
        list={list}
        renderPaypalButtonFrame={renderPaypalButtonFrame} />}
      <Notifications {...notify} isShow={show} onHideRequest={setShow} />
    </div>
  );
};

export default CartDetail;

const DetailTransaction = ({ customer, setCustomer, total, list, renderPaypalButtonFrame }) => {
  const [pos, setPos] = useState(-1)

  useEffect(() => {
    document.querySelector('html').style.overflow = 'hidden'
    return () => document.querySelector('html').style.overflow = 'visible'
  }, [])

  const trade = type => {
    let index = -1;
    switch (type) {
      case 'ZALOPAY':
        setPos(0)
        index = 0
        break;
      case 'STRIPE':
        setPos(1)
        index = 1;
        break;
      case 'PAYPAL':
        setPos(2)
        index = 2
        break;
      default:
        return;
    }
    const products = list.map(item => ({
      prod_no: item.prod_no,
      prod_quantity: item.amount,
      pd_no: item.prod_details[item.choosedType].pd_no
    }))
    const cart = { customer, products }

    switch (index) {
      case 0:
        checkout(0, cart)
        break;
      case 1:
        checkout(1, cart);
        break
      case 2:
        renderPaypalButtonFrame(cart)
        break;
      default:
        return
    }
  }
  return (
    <div className="detail_transaction">
      <div className="detail_wrapper">
        <h3>Xác nhận mua hàng và chọn hình thức thanh toán</h3>
        <div className="cus_info">
          <p><span>Khách hàng:</span>{customer.cus_name}</p>
          <p><span>Số CMND/CCCD:</span>{customer.cus_id}</p>
          <p><span>Giới tính:</span>{customer.cus_sex ? 'Nam' : 'Nữ'}</p>
          <p><span>Email:</span>{customer.cus_email}</p>
          <p><span>Số điện thoại:</span>{customer.cus_phoneNumber}</p>
          <p><span>Địa chỉ nhận hàng:</span>{customer.cus_address}</p>
          <p><span>Tổng giá trị:</span>{Helper.Exchange.toMoney(total)}</p>
        </div>
        <div className="detail_header">
          <p className="dh_name">Tên sản phẩm</p>
          <p className="dh_price">Phiên bản</p>
          <p className="dh_price">Đơn giá</p>
          <p className="dh_amount">Số lượng</p>
          <p className="dh_total">Thành tiền</p>
        </div>
        <ul>
          {list.map((item, index) => <li key={index}>
            <p className="dh_name">{item.prod_name}</p>
            <p className="dh_price">{item.prod_details[item.choosedType].pd_storage}</p>
            <p className="dh_price">{Helper.Exchange.toMoney(item.prod_details[item.choosedType].pd_price)}</p>
            <p className="dh_amount">{item.amount}</p>
            <p className="dh_total">{Helper.Exchange.toMoney(Number(item.prod_details[item.choosedType].pd_price) * Number(item.amount))} VNĐ</p>
          </li>)}
        </ul>
        <h3>Chọn hình thức thanh toán</h3>
        <div className="transaction-style">
          <img style={pos === 0 ? { border: '2px solid var(--backgroundColor)', cursor: 'progress' } : null} onClick={() => trade('ZALOPAY')} src="/icon/zalopayicon.png" alt="zalo transaction" />
          <img style={pos === 1 ? { border: '2px solid var(--backgroundColor)', cursor: 'progress' } : null} onClick={() => trade('STRIPE')} src="/icon/stripeicon.png" alt="stripe transaction" />
          <img style={pos === 2 ? { border: '2px solid var(--backgroundColor)', cursor: 'progress' } : null} onClick={() => trade('PAYPAL')} src="/icon/paypalicon.png" alt="papal transaction" />
        </div>
        <FontAwesomeIcon icon={faTimes} onClick={() => setCustomer(null)} />
      </div>
    </div>
  )
}


function CartTransaction({ display, setDisplay, setCustomer }) {

  const [ccid, setCcid] = useState("")

  const [name, setName] = useState("")

  const [email, setEmail] = useState("")

  const [gender, setGender] = useState(-1)

  const [phone, setPhone] = useState("")

  const [show, setShow] = useState(false);

  const [address, setAddress] = useState({
    province: '',
    district: '',
    commune: '',
    detail: '',
  })

  useEffect(() => {
    document.querySelector('html').style.overflow = display ? 'hidden' : 'visible'
  }, [display])

  const [notify, setNotify] = useState({
    content: "",
    title: "",
    type: "INFORMATION",
    infoType: "INFO",
  });

  const leftInput = [
    { type: 'input', value: name, name: 'name', onChange: setName, label: 'Họ và tên', title:'Họ và tên' },
    { type: 'input', value: ccid, name: 'ccid', onChange: setCcid, label: 'Số CMND/CCCD', title:"CMNN/ CCCD" },
    { type: 'input', value: email, name: 'email', onChange: setEmail, label: 'Email' , title:"Địa chỉ email"},
    { type: 'radio', value: gender, name: 'gender', onChange: setGender, label: 'Giới tính', data: [{ name: 'Nam', value: "1", title:'Giới tính nam' }, { name: 'Nữ', value: "0", title:'Giới tính nữ' }] }
  ]

  const showResult = (mess) => {
    setNotify({ ...notify, content: mess })
    setShow(true)
  }

  const checkValidation = () => {
    let result = Helper.TransactionValidator.checkingName(name)
    if (!result.result) {
      showResult(result.resson)
      return false
    }

    result = Helper.TransactionValidator.checkingCCID(ccid)
    if (!result.result) {
      showResult(result.resson)
      return false
    }

    result = Helper.TransactionValidator.checkingEmail(email)
    if (!result.result) {
      showResult(result.resson)
      return false
    }


    result = Helper.TransactionValidator.checkingGender(gender)
    if (!result.result) {
      showResult(result.resson)
      return false
    }

    result = Helper.TransactionValidator.checkingPhone(phone)
    if (!result.result) {
      showResult(result.resson)
      return false
    }

    if (address.province.length === 0 || address.commune.length === 0 || address.district.length === 0 || address.detail.length === 0) {
      showResult('Bạn chưa hoàn thành địa chỉ nhận hàng')
      return false
    }
    return true;
  }

  const makeAddressTemplate = () => `${address.detail.trim()}, ${address.commune.trim()}, ${address.district.trim()}, ${address.province.trim()}, Việt Nam`

  const transationHandle = () => {
    if (!checkValidation()) return
    setCustomer({
      "cus_name": name,
      "cus_id": ccid,
      "cus_email": email,
      "cus_sex": Number(gender) === 1,
      "cus_address": makeAddressTemplate(),
      "cus_phoneNumber": phone
    })
    setDisplay(false)
  }

  return (
    <>
      <div className={`cart-info ${display ? "show" : ""}`}>
        <div className="transaction-wrapper">
          <h3>Thông tin thanh toán</h3>
          <div>
            <div>
              {leftInput.map((item, index) => <Input key={index} {...item} />)}
            </div>
            <div>
              <Input
                type='input'
                value={phone}
                onChange={setPhone}
                name="phone"
                label={"Số điện thoại nhận hàng"}
              />
              <AddressInput
                value={address}
                name="address"
                onChange={setAddress}
                label={"Địa chỉ nhận hàng"}
              />
            </div>
          </div>
          <div className="behavior">
            <button title="Hủy thanh toán" onClick={() => setDisplay(false)}>Hủy</button>
            <button title="Tiến hành thanh toán" onClick={transationHandle}>Thanh toán</button>
          </div>
        </div>
      </div>
      <Notifications {...notify} isShow={show} onHideRequest={setShow} />
    </>
  );
}

const AddressInput = ({ onChange }) => {
  const [chooseLocation, setChooseLocation] = useState({
    province: -1,
    district: -1,
    commune: -1,
    detail: "",
  });

  const [location, setLocation] = useState({
    provinces: [],
    districts: [],
    communes: [],
  });

  const setChange = useCallback(onChange,[onChange])

  const setAddress = (event, key) => {
    if (typeof (event) === 'string') {
      setChooseLocation({ ...chooseLocation, detail: event })
      setChange(pre => ({ ...pre, detail: event }))
      return
    }

    const { target } = event
    setChange(pre => ({ ...pre, [key]: target.options[target.selectedIndex].innerText }))
    setChooseLocation(pre => ({ ...pre, [key]: event.target.value }))
  }

  useEffect(() => {
    (async () => {
      let _province = await Helper.Location.getProvince();
      setLocation((l) => ({ ...l, provinces: _province }));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let _districts = await Helper.Location.getDistricts(
        chooseLocation.province
      );
      setLocation((l) => ({ ...l, districts: _districts }));
      setChooseLocation((c) => ({ ...c, district: -1, commune: -1 }));
      setChange(pre => ({ ...pre, district: '', commune: '' }))
    })();
  }, [chooseLocation.province, setChange]);

  useEffect(() => {
    (async () => {
      let _commune = await Helper.Location.getCommunes(chooseLocation.district);
      setLocation((l) => ({ ...l, communes: _commune }));
      setChooseLocation((c) => ({ ...c, commune: -1 }));
      setChange(pre => ({ ...pre, commune: '' }))
    })();
  }, [chooseLocation.district, setChange]);
  const inputs = [
    { type: 'select', value: chooseLocation.province, onChange: setAddress, label: 'Chọn tỉnh/thành phố', data: location.provinces, keycode: 'province', title:'Chọn tỉnh/ thành phố' },
    { type: 'select', value: chooseLocation.district, onChange: setAddress, label: 'Chọn huyện/quận', data: location.districts, keycode: 'district',title:'Chọn quận/ huyện' },
    { type: 'select', value: chooseLocation.commune, onChange: setAddress, label: 'Chọn xã/phường', data: location.communes, keycode: 'commune', title:'Chọn phường/xã' }
  ]
  return (
    <div className='address'>
      <span>Địa chỉ nhận hàng</span>
      {inputs.map((item, index) => <Input key={index} {...item} />)}
      <Input
        type='input'
        value={chooseLocation.detail}
        label="Số nhà/ Tên đường"
        name="house"
        title="Số nhà hoặc tên đường"
        onChange={setAddress}
      />
    </div>
  )
}

function CartItem(props) {
  const { info, changeValue, removeItem } = props;

  const history = useHistory()

  const onRemoveItem = (e) => removeItem(info.prod_no, info.choosedType);

  const step = (type) => {
    switch (type) {
      case 'DOWN':
        (info.amount !== 1) && changeValue(info.prod_no, info.choosedType, type);
        return
      case 'UP':
        (info.amount < info.prod_details[info.choosedType].pd_amount - info.prod_details[info.choosedType].pd_sold) && changeValue(info.prod_no, info.choosedType, type);
        return
      default:
          return
    }
  }

  return (
    <li>
      <div className="images">
        <img src={info.prod_imgs[0]} alt={info.prod_name} onClick={() => history.push(`/product/${info.prod_no}`)} />
      </div>
      <div className="info">
        <p className="name">{info.prod_name}</p>
        <div className="details">
          <div className="manufactor">
            <p><span>Nhãn hiệu:</span>{info.prod_manufacturer.brand_name}</p>
            <p><span>Bộ nhớ:</span>{info.prod_details[info.choosedType].pd_storage}</p>
            <p><span>Xuất xứ:</span>{info.prod_manufacturer.madeIn}</p>
          </div>
          <div className="price">
            <p>{Helper.Exchange.toMoney(info.prod_details[info.choosedType].pd_price)} VNĐ</p>
          </div>
          <div className="amount">
            <div className="amountwrapper">
              <button title="Tăng số lượng" onClick={() => step('UP')}><FontAwesomeIcon icon={faPlus} /></button>
              <input
                onKeyDown={(evt) => evt.preventDefault()}
                type="number"
                min="1"
                placeholder="Số lượng"
                title="Số lượng bạn đã đặt"
                max={info.prod_details[info.choosedType].pd_amount - info.prod_details[info.choosedType].pd_sold}
                value={info.amount}
                readOnly
              />
              <button title="Giảm số lượng" onClick={() => step('DOWN')}><FontAwesomeIcon icon={faMinus} /></button>
            </div>
          </div>
        </div>
      </div>
      <span onClick={onRemoveItem}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </li>
  );
}
