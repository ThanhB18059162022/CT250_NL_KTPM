const total = this.getTotalPrice(orderProducts);
//Lưu tạm order
const tmpOrder = {
  id,
  orderProducts,
  customer: cart.customer,
  successUrl: cart.url.success,
  total,
  time: new Date(),
  paid: false, // Chưa trả tiền
};
this.storeOrder(tmpOrder);

return { url };

//#region Checkout Order

checkoutOrder = async (orderId) => {
  const paidOrder = { ...order, paid: true };

  // Lưu vào CSDL
  await this.dao.saveOrder(paidOrder);

  return paidOrder.successUrl;
};

//#endregion
