import React, { useState, useRef, useEffect } from "react";
import PayPalPaymentService from "./PayPalPaymentService";
import ApiCaller from "../ApiCaller";

// Dùng tạm thời nữa cải tiến sau
// Chú ý orderID chứ ko phải orderId vì api nó trả về là orderID

const img =
  "https://susanlacerra.com/wp-content/uploads/2016/06/giving-up-perfection-450-square.jpg";

const payService = new PayPalPaymentService(new ApiCaller());

const PayPalPayment = () => {
  const [paidFor, setPaidFor] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    getId();
  }, []);

  // Cái này phải chạy đầu
  async function getId() {
    const clientId = await payService.getClientId();

    setClientId(clientId);
  }

  // Chưa coi dispose
  useEffect(() => {
    addScript();

    displayButton();
  });

  function addScript() {
    //Load paypal script
    const payPalScript = document.createElement("script");
    payPalScript.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;

    payPalScript.addEventListener("load", () => setLoaded(true));

    document.body.appendChild(payPalScript);
  }

  //Button tham chiếu bên ui dom
  let payPalRef = useRef();
  function displayButton() {
    //Chờ cho load xong
    if (loaded) {
      setTimeout(() => {
        window.paypal
          .Buttons({
            createOrder: creatOrderForPayment,
            onApprove: saveOrderTransaction,
            onError: (err) => console.log(err),
          })
          .render(payPalRef);
      });
    }
  }

  // Mảng sản phẩm phải có 2 trường là id và số lượng
  const products = [
    {
      prod_no: 1,
      prod_quantity: 1,
    },
    {
      prod_no: 2,
      prod_quantity: 1,
    },
  ];
  // createOrder nhận vào id của order
  async function creatOrderForPayment() {
    // Thông tin khác hàng
    const customer = {
      cus_name: "Alexander PayPal",
      cus_id: "555555555",
      cus_email: "alex@gmail.com",
      cus_sex: true,
      cus_address: "3/2 Ninh Kiều Cần Thơ",
      cus_phoneNumber: "0000000000",
    };

    const cart = {
      customer,
      products,
    };
    const orderID = await payService.createOrder(cart);

    return orderID;
  }

  // data là giá trị mặc định của paypal
  async function saveOrderTransaction(data) {
    const { orderID } = data;

    const order = await payService.captureOrder(orderID);

    console.log("Order là", order);

    setPaidFor(true);
  }

  function renderProductInfo() {
    const product = products[0];
    return (
      <div>
        <h1>Buy this picture for ${product.price}</h1>
        <p>{product.description}</p>
        <img src={img} alt="beautiful girl" />
        <div ref={(v) => (payPalRef = v)}> Hello</div>
      </div>
    );
  }

  function renderPurchased() {
    return (
      <div>
        <h1>Thanks for your purchase!</h1>
      </div>
    );
  }

  return <div>{paidFor ? renderPurchased() : renderProductInfo()}</div>;
};

export default PayPalPayment;
