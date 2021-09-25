import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom'
import Helper from "../../../helpers";
import Notifications from "../../../common/Notifications";
import "./CartDetail.Style.scss";
import { caller } from "../../../api_services/servicesContainer";
// import PayPalPayment from "../../../api_services/payment_services/PayPalPayment";
import ZaloPaymentService from "../../../api_services/payment_services/ZaloPaymentService";
import { StripePaymentService } from "../../../api_services/servicesContainer";
import { CartContext } from "../../../providers/CartProviders";

//==================To the Getway payment ===================
const goToGetway = (url) => {
  window.location.href = url;
};

const checkout = async (services, cartContent) => {
  goToGetway(await services.createOrder(cartContent));
};

const paymentServices = [
  new ZaloPaymentService(caller),
  new StripePaymentService(caller),
];
//===========================================================

const CartDetail = () => {
  const [list, setList] = useState([]);

  const [total, setTotal] = useState(0);

  const { clearItem, getItemList, upItem, removeItem, downItem, amount } =
    useContext(CartContext);

  const [display, setDisplay] = useState(false);

  const [show, setShow] = useState(false);

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
          let data = await caller.get(`products/${item.id}`);
          data.amount = item.amount;
          data.choosedType = item.type
          return data;
        })
      );
      setList(listItem);
    })();
  }, [amount, getItemList]);

  const onValueChange = (id, value, choosedType) => {
    const newList = list.map((item) => {
      if (item.prod_no === id && item.choosedType === choosedType) {
        item.amount > value ? downItem(id, choosedType) : upItem(id, choosedType);
        item.amount = value;
      }
      return item;
    });
    setList(newList);
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
    let count = 0;
    list.forEach(
      (element) =>
        (count += Number(element.prod_details[element.choosedType].price) * Number(element.amount))
    );
    setTotal(count);
  }, [list]);

  return (
    <div className="CartDetail">
      <h3>Giỏ hàng của bạn</h3>
      <div className="detail-wrapper">
        <div className="cart-list">
          {list.length > 0 ? (
            <ul>
              {list.map((item, index) => (
                <CartItem
                  key={index}
                  info={item}
                  changeValue={onValueChange}
                  removeItem={onRemoveItem}
                />
              ))}
            </ul>
          ) : (
            <p>Giỏ hàng trống! Tiếp tục mua hàng đi nào!</p>
          )}
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

            <button
              onClick={() => {
                setDisplay(true);
                // clearItem();
              }}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
      <CartTransaction
        display={display}
        setDisplay={setDisplay}
        listPay={list}
        total={total}
      />
      {/* <PayPalPayment/> */}
      <Notifications {...notify} isShow={show} onHideRequest={setShow} />
    </div>
  );
};

export default CartDetail;

function CartTransaction(props) {
  const { display, setDisplay, total, listPay } = props;

  const { getItemList } = useContext(CartContext)

  const [step, setStep] = useState(0);

  const [location, setLocation] = useState(false);

  const [customerinfo, setCustomerInfo] = useState({
    ccid: "",
    email: "",
    name: "",
    gender: -1,
    address: "",
    phone: "",
    transactionway: -1,
  });

  const [show, setShow] = useState(false);

  const [notify, setNotify] = useState({
    content: "",
    title: "",
    type: "INFORMATION",
    infoType: "INFO",
  });

  const setAddress = (value) => {
    setCustomerInfo({ ...customerinfo, address: value });
  };

  const previousStep = () => {
    if (step !== 0) {
      setStep(step + 1);
    }
  };

  const nextStep = () => {
    if (step !== -2) {
      if (step === 0) {
        if (validateStep1()) setStep(step - 1);
      }
      if (step === -1) {
        if (validateStep2()) setStep(step - 1);
      }
    } else {
      if (customerinfo.transactionway === -1) {
        setNotify({
          ...notify,
          content: "Vui lòng chọn hình thức thanh toán!",
          infoType: "INFO",
        });
        setShow(true);
      } else {
        checkout(paymentServices[customerinfo.transactionway - 1], {
          customer: customerinfo,
          products: listPay,
        });
      }
      /*TODO*/
    }
  };

  const validateStep1 = () => {
    const validateCCID = Helper.TransactionValidator.checkingCCID(
      customerinfo.ccid
    );
    if (!validate(validateCCID)) return false;

    const validateEmail = Helper.TransactionValidator.checkingEmail(
      customerinfo.email
    );
    if (!validate(validateEmail)) return false;

    return true;
  };

  const validateStep2 = () => {
    const validateName = Helper.TransactionValidator.checkingName(
      customerinfo.name
    );
    if (!validate(validateName)) return false;

    const validateGender = Helper.TransactionValidator.checkingGender(
      customerinfo.gender
    );
    if (!validate(validateGender)) return false;

    const validateAddress = Helper.TransactionValidator.checkingAddress(
      customerinfo.address
    );
    if (!validate(validateAddress)) return false;

    const validatePhone = Helper.TransactionValidator.checkingPhone(
      customerinfo.phone
    );
    if (!validate(validatePhone)) return false;
    return true;
  };

  const validate = (result) => {
    if (!result.result) {
      setNotify({
        ...notify,
        title: "Cảnh báo",
        infoType: "WARN",
        content: result.resson,
      });
      setShow(true);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className={`carttransaction ${display ? "show" : ""}`}>
        <div className="transaction-wrapper">
          <div className="transaction-info">
            <h3>Thông tin đơn hàng của bạn</h3>
            <div className="wrapper">
              <p>
                <span>Tổng giá trị: </span> {Helper.Exchange.toMoney(total)} VNĐ
              </p>
              <p>
                <span>Thời gian: </span>
                {Helper.Exchange.toLocalDate(new Date().toISOString())}
              </p>
              <p>
                <span>Số lượng sản phẩm: </span>
                {getItemList().length}
              </p>
              <p>
                <span>Số lượng chi tiết:</span>
                {getItemList().reduce((pre, item) => pre + item.amount, 0)}
              </p>
            </div>
          </div>
          <div className="transaction-input">
            <h3>Thông tin thanh toán</h3>
            <div className="transaction-slider">
              <div
                className="slider-element"
                style={{ left: `${100 * step}%` }}
              >
                <p>
                  <input
                    value={customerinfo.ccid}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerinfo, ccid: e.target.value })
                    }
                    type="text"
                    placeholder="CMND/CCCD (bắt buộc)"
                  />
                </p>
                <p>
                  <input
                    value={customerinfo.email}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerinfo,
                        email: e.target.value,
                      })
                    }
                    type="email"
                    placeholder="Email (bắt buộc)"
                  />
                </p>
              </div>
              <div
                className="slider-element"
                style={{ left: `${100 * step}%` }}
              >
                <p>
                  <input
                    type="text"
                    placeholder="Họ tên (bắt buộc)"
                    value={customerinfo.name}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerinfo, name: e.target.value })
                    }
                  />
                </p>
                <p>
                  <select
                    value={customerinfo.gender}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerinfo,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="-1" disabled>
                      Giới tính
                    </option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                  </select>
                </p>
                <p>
                  <input
                    type="text"
                    onKeyDown={(e) => e.preventDefault()}
                    onClick={() => setLocation(true)}
                    style={{ cursor: "pointer" }}
                    placeholder="Địa chỉ nhận hàng (bắt buộc)"
                    value={customerinfo.address}
                    readOnly={true}
                  />
                </p>
                <p>
                  <input
                    type="phone"
                    placeholder="Số điện thoại nhận hàng (bắt buộc)"
                    value={customerinfo.phone}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerinfo,
                        phone: e.target.value,
                      })
                    }
                  />
                </p>
              </div>
              <div
                className="slider-element"
                style={{ left: `${100 * step}%` }}
              >
                <p>
                  <input
                    onClick={() => setCustomerInfo({ ...customerinfo, transactionway: 1 })}
                    name="transaction-way"
                    type="radio"
                  />
                  <span>
                    <img alt="zalopay" src="/icon/zalopayicon.png" />
                  </span>
                  <span>Zalo pay</span>
                </p>
                <p>
                  <input
                    onClick={() =>
                      setCustomerInfo({ ...customerinfo, transactionway: 2 })
                    }
                    name="transaction-way"
                    type="radio"
                  />
                  <span>
                    <img alt="stripe" src="/icon/stripeicon.png" />
                  </span>
                  <span>Stripe</span>
                </p>
                <p>
                  <input
                    onClick={() =>
                      setCustomerInfo({ ...customerinfo, transactionway: 3 })
                    }
                    name="transaction-way"
                    type="radio"
                  />
                  <span>
                    <img alt="paypal" src="/icon/paypalicon.png" />
                  </span>
                  <span>Paypal</span>
                </p>
              </div>
            </div>
            <div className="transaction-control">
              <button
                onClick={() => {
                  setDisplay(!display);
                  setStep(0);
                }}
              >
                Hủy
              </button>
              <button onClick={previousStep}>Trở lại</button>
              <button onClick={nextStep}>Tiếp tục</button>
            </div>
          </div>
        </div>
        <SetLocation
          display={location}
          setDisplay={setLocation}
          setAddress={setAddress}
        />
      </div>
      <Notifications {...notify} isShow={show} onHideRequest={setShow} />
    </>
  );
}

function SetLocation(props) {
  const { display, setDisplay, setAddress } = props;

  const [location, setLocation] = useState({
    provinces: [],
    districts: [],
    communes: [],
  });

  const [chooseLocation, setChooseLocation] = useState({
    province: -1,
    district: -1,
    commune: -1,
    detail: "",
  });

  const submitAddress = () => {
    if (
      chooseLocation.province === -1 ||
      chooseLocation.district === -1 ||
      chooseLocation.commune === -1 ||
      chooseLocation.detail.trim().length === 0
    ) {
      alert("Chưa nhập đủ thông tin");
      return false;
    }
    const locationString = Helper.Location.getLocationString(
      chooseLocation.province,
      chooseLocation.district,
      chooseLocation.commune
    );
    setAddress(`${chooseLocation.detail}, ${locationString}`);
    setDisplay(false);
  };

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
    })();
  }, [chooseLocation.province]);

  useEffect(() => {
    (async () => {
      let _commune = await Helper.Location.getCommunes(chooseLocation.district);
      setLocation((l) => ({ ...l, communes: _commune }));
      setChooseLocation((c) => ({ ...c, commune: -1 }));
    })();
  }, [chooseLocation.district]);

  return (
    <div className={`carttransaction ${display ? "show" : ""}`}>
      <div className="address-wrapper">
        <h3>Thông tin địa chỉ giao hàng</h3>
        <div className="location-group">
          <select
            value={chooseLocation.province}
            onChange={(e) =>
              setChooseLocation({ ...chooseLocation, province: e.target.value })
            }
          >
            <option value="-1">Chọn tỉnh/ thành phố</option>
            {location.provinces.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="location-group">
          <select
            value={chooseLocation.district}
            onChange={(e) =>
              setChooseLocation({ ...chooseLocation, district: e.target.value })
            }
          >
            <option value="-1">Chọn huyện/ quận</option>
            {location.districts.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="location-group">
          <select
            value={chooseLocation.commune}
            onChange={(e) =>
              setChooseLocation({ ...chooseLocation, commune: e.target.value })
            }
          >
            <option value="-1">Chọn xã phường</option>
            {location.communes.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="location-group">
          <input
            value={chooseLocation.detail}
            placeholder="Số nhà/ Tên đường"
            onChange={(e) =>
              setChooseLocation({ ...chooseLocation, detail: e.target.value })
            }
          />
        </div>
        <div className="location-group">
          <button onClick={() => setDisplay(false)}>Hủy</button>
          <button onClick={submitAddress}>Xong</button>
        </div>
      </div>
    </div>
  );
}

function CartItem(props) {
  const { info, changeValue, removeItem } = props;

  const history = useHistory()

  const onValueChange = (e) => changeValue(info.prod_no, e.target.value, info.choosedType);

  const onRemoveItem = (e) => removeItem(info.prod_no, info.choosedType);

  return (
    <li>
      <span className="img">
        <img src={info.prod_imgs[0]} alt={info.prod_name} onClick={() => history.push(`/product/${info.prod_no}`)} />
      </span>
      <span className="name">{info.prod_name}</span>
      <span className="storage element">
        <span>{info.prod_details[info.choosedType].storage}</span>
      </span>
      <span className="price element">
        {Helper.Exchange.toMoney(info.prod_details[info.choosedType].price)} VNĐ
      </span>
      <span className="amount element">
        <input
          onKeyDown={(evt) => evt.preventDefault()}
          type="number"
          min="1"
          onChange={onValueChange}
          value={info.amount}
        />
      </span>
      <span onClick={onRemoveItem}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </li>
  );
}
