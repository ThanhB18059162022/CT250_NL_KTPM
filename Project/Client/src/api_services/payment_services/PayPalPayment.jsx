import React, { useState, useRef, useEffect } from "react";
import PayPalPaymentService from "./PayPalPaymentService";
import ApiCaller from "../ApiCaller";

// Dùng tạm thời nữa cải tiến sau
// Chú ý orderID chứ ko phải orderId vì api nó trả về là orderID
const payService = new PayPalPaymentService(new ApiCaller());

const PayPalPayment = (props) => {
  const { cart } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [clientId, setClientId] = useState("");
  // Chạy 1 lần
  useEffect(() => {
    getId();
  }, []);

  // Cái này phải chạy đầu
  async function getId() {
    const clientId = await payService.getClientId();
    setClientId(clientId);
  }

  // create callback

  // Chưa coi dispose
  useEffect(() => {
    // Use state khởi tạo cũng làm thay đổi clientId'
    if (clientId?.length > 10) {
      //Load paypal script
      const payPalScript = document.createElement("script");
      payPalScript.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      payPalScript.defer = true;

      document.body.appendChild(payPalScript);

      //Chờ cho load xong
      // Event load là event load trang html
      payPalScript.addEventListener("load", displayButton);

      return () => document.body.removeChild(payPalScript);
    }
  }, [clientId]);

  //Button tham chiếu bên ui dom
  let payPalRef = useRef();
  function displayButton() {
    window.paypal
      .Buttons({
        createOrder: creatOrderForPayment,
        onApprove: saveOrderTransaction,
        onError: (err) => console.error(err),
      })
      .render(payPalRef);
  }

  // createOrder nhận vào id của order
  async function creatOrderForPayment() {
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
    return (
      <div>
        <div ref={(v) => (payPalRef = v)}></div>
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
