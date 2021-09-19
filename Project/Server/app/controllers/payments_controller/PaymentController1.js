// Lưu các order đã đặt mà chưa thanh toán sau 1 ngày sẽ xóa
//static storedOrders = new Map();

captureOrder = async (orderID) => {
  // Kiểm tra còn order trước khi thanh toán
  const { storedOrders } = PayPalService;
  const order = storedOrders.get(orderID);
  if (order === undefined) {
    throw new Error("Order expired");
  }

  // Thanh toán
  await this.payPalCaptureOrder(orderID);

  const paidOrder = { ...order, paid: true };

  // Lưu vào CSDL
  await this.dao.saveOrder(paidOrder);

  return paidOrder;
};
