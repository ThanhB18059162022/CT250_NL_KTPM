const StripePaymentController = require("../StripePaymentController");
// Kiểm tra các api end-points của Stripe Payment

function getController() {
  return new StripePaymentController();
}

// Tạo một đơn hàng cần
// Danh sách đối tượng gồm số lượng sản phẩm  + mã sản phẩm
// Url của client khi thành công
// Url khi thất bại
describe("Kiểm tra tạo đơn hàng và thanh toán", () => {
  test("OK", () => {});
});
