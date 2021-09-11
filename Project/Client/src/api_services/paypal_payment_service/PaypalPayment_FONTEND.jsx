// -------------- Cái này không dùng server

// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

import React, { useState, useRef, useEffect } from "react";

const clientId =
  "AZTscyRZHEQU1qdTUQKxi0n_pkI9brHMMLGHmdv_mVHBR4fma58ehRH07_gSVNhjN3at-CA3xABSylmj";

const srcPaypalScript = `https://www.paypal.com/sdk/js?client-id=${clientId}`;

const PaypalPayment_FONTEND = ({
  product = {
    currency_code: "USD",
    price: "0.01",
    description: "Beautiful girl with sunglasses",
  },
}) => {
  const [paidFor, setPaidFor] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    addScript();

    displayButton();
  });

  const addScript = () => {
    //Load paypal script
    const payPalScript = document.createElement("script");
    payPalScript.src = srcPaypalScript;

    payPalScript.addEventListener("load", () => setLoaded(true));

    document.body.appendChild(payPalScript);
  };

  //Button tham chiếu bên ui dom
  let payPalRef = useRef();
  const displayButton = () => {
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
  };

  const creatOrderForPayment = async (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: product.description,
          amount: {
            currency_code: product.currency_code,
            value: product.price,
          },
        },
      ],
    });
  };

  const saveOrderTransaction = async (data, actions) => {
    const order = await actions.order.capture();

    setPaidFor(true);

    console.log(order);
  };

  const renderProductInfo = () => (
    <div ref={(v) => (payPalRef = v)}> Hello</div>
  );

  const renderPurchased = () => <h1>Thanks for your purchase!</h1>;

  return <div>{paidFor ? renderPurchased() : renderProductInfo()}</div>;
};

export default PaypalPayment1;
