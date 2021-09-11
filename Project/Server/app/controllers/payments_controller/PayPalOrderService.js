module.exports = class PaymentSerivce {
  // Lấy danh sách sản phẩm
  // Mỗi phần tử trong danh sách phải có 3 phần
  // Tên - Giá tiền - Số lượng
  // name - price - quantity
  createOrderBody = (products) => {
    const total = this.productService.calculateTotalPrice(products);

    return {
      // Capture để thanh toán
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: this.currency_code,
            value: total, // Tổng tiền

            // Thông tin thêm
            breakdown: {
              item_total: {
                currency_code: this.currency_code,
                value: total, // Tổng tiền
              },
              // Ship vs giảm giá
              // shipping: 0,
              // tax_total: 0,
              // discount: 0,
            },
          },
          // Từng sản phẩm, có breakdown mới xài cái này
          //   items: req.body.items.map((item) => {
          //     const storeItem = storedItems.get(item.id);
          //     // Chi tiết của từng sản phẩm
          //     return {
          //       name: storeItem.name,
          //       // Giá
          //       unit_amount: {
          //         currency_code: this.currency_code,
          //         value: storeItem.price,
          //       },
          //       // Số lượng
          //       quantity: item.quantity,
          //     };
          //   }),
        },
      ],
    };
  };

  saveOrder = async (order) => {
    console.log(order);
  };
};
