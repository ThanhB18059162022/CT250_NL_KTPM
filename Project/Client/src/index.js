import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import PayPalPayment from "./api_services/payment_services/PayPalPayment";
// import StripePayment from "./api_services/payment_services/StripePayment";
// import ZaloPayment from "./api_services/payment_services/ZaloPayment";
// import BarChart from "./api_services/statistic/BarChart";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <PayPalPayment /> */}
    {/* <StripePayment /> */}
    {/* <ZaloPayment /> */}
    {/* <BarChart /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
