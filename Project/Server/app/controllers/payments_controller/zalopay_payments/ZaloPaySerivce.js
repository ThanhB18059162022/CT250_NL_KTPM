// Tham khảo https://docs.zalopay.vn/v2/general/overview.html

const crypto = require("crypto");

module.exports = class ZaloPaySerivce {
  constructor(config, apiCaller) {
    // Key là key1 trên tài liệu zalo
    const { app_id, key, endpoint } = config;

    this.app_id = app_id;
    this.key = key;
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
    const { data } = await apiCaller.post(`${this.endpoint}?${queryString}`);

    console.log(data);

    return data;
  };

  // Id tự tạo, tên khách hàng, tổng tiền và url gọi khi thành công
  createOrderBody = (id, cus_name, amount, url) => {
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
      app_trans_id: `${currentDateFormat}_${id}`,
      app_user: cus_name,
      app_time: currentDate.getTime(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount, // Tổng tiền
      description: `Đơn hàng của ${cus_name} có giá trị ${amount}`,
    };

    order.mac = this.generateHmac(order);

    console.log(order);

    return order;
  };

  generateHmac = (order) => {
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

    const hmac = crypto
      .createHmac("sha256", this.key)
      .update(data)
      .digest("hex")
      .toString();

    return hmac;
  };
};
