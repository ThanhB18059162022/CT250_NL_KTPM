import ApiCaller from "../ApiCaller";
import ZaloPaymentService from "./ZaloPaymentService";
const payService = new ZaloPaymentService(new ApiCaller());

export default function ZaloPayment() {
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
    // Thông tin khác hàng
    const customer = {
      cus_name: "Alexander Zalo",
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

    const url = await payService.createOrder(cart);

    window.location = url;
  }

  return (
    <>
      <button onClick={checkOut}>Tính tiền Zalo</button>
    </>
  );
}
