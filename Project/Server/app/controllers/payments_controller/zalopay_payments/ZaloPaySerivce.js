// Tham khảo https://docs.zalopay.vn/v2/general/overview.html

const crypto = require("crypto");

module.exports = class ZaloPaySerivce {
  constructor(config, apiCaller) {
    // Config trên tài liệu zalo
    const { app_id, key1, key2, endpoint } = config;

    this.app_id = app_id;
    this.key1 = key1;
    this.key2 = key2;
    this.endpoint = endpoint;

    this.apiCaller = apiCaller;
  }

  createOrder = async (id, amount, url) => {
    const orderBody = this.createOrderBody(id, amount, url);

    // Vì tạo order nhận orderBody là url query
    // Chuyển orderBody sang queryString
    const queryString = Object.keys(orderBody)
      .map((key) => `${key}=${orderBody[key]}`)
      .join("&");

    // Gọi api
    const { order_url } = await this.apiCaller.post(
      `${this.endpoint}?${queryString}`
    );

    return order_url;
  };

  // Id tự tạo, tên khách hàng, tổng tiền và url gọi khi thành công
  createOrderBody = (id, amount, url) => {
    const currentDate = new Date();

    // Định dạng YYMMDD - 210921
    const currentDateFormat = currentDate
      .toISOString()
      .slice(2, 10)
      .replace(/-/g, "");

    const embed_data = {
      // Save order rồi về trang khách hàng
      redirecturl: url,
    };
    const items = [];

    const order = {
      app_id: this.app_id,
      app_trans_id: `${currentDateFormat}_${id.slice(33, 64)}`, // Max 40 ký tự
      app_user: "Customer",
      app_time: currentDate.getTime(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount, // Tổng tiền
      description: `Order total: ${amount}`,
    };

    order.mac = this.generateOrderHmac(order);

    return order;
  };

  generateOrderHmac = (order) => {
    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      this.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;

    const hmac = this.generateHmac(this.key1, data);

    return hmac;
  };

  validRedirectQuery = (query) => {
    const {
      appid,
      apptransid,
      pmcid,
      bankcode,
      amount,
      discountamount,
      status,
      checksum,
    } = query;

    const data =
      appid +
      "|" +
      apptransid +
      "|" +
      pmcid +
      "|" +
      bankcode +
      "|" +
      amount +
      "|" +
      discountamount +
      "|" +
      status;

    const hmac = this.generateHmac(this.key2, data);

    return hmac === checksum;
  };

  generateHmac = (key, data) => {
    const hmac = crypto
      .createHmac("sha256", key)
      .update(data)
      .digest("hex")
      .toString();

    return hmac;
  };
};
