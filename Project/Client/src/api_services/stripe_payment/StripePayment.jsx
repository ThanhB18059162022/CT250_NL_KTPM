import ApiCaller from "../ApiCaller";
import StripePaymentService from "./StripePaymentService";
const payService = new StripePaymentService(new ApiCaller());

export default function StripePayment() {
  // Mảng sản phẩm phải có 2 trường là id và số lượng
  const products = [
    {
      prod_no: 1,
      prod_quantity: 100,
    },
    {
      prod_no: 2,
      prod_quantity: 1,
    },
  ];

  async function checkOut() {
    const url = await payService.createOrder(products);

    window.location = url;
  }

  return (
    <>
      <button onClick={checkOut}>Tính tiền</button>
    </>
  );
}
