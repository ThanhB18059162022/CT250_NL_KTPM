CREATE OR REPLACE DATABASE Phone_E_Commerece_DB;

-- Tạo các bảng (13 bảng)

-- Bảng khách hàng

CREATE TABLE Customers(
  cus_no INT AUTO_INCREMENT, -- Mã khách hàng tự tăng
  cus_name VARCHAR(70) , -- Họ tên khách hàng
  cus_id CHAR(12) , -- Chứng minh nhân dân
  cus_email VARCHAR(128) , -- Email của khách
  cus_sex TINYINT(1) NOT NULL DEFAULT '0', -- Giới tính 1 là nam 0 là nữ
 
 -- Khóa chính
  CONSTRAINT Customers_PK PRIMARY KEY (cus_no)
);

-- Bảng quản trị viên
CREATE TABLE Moderators(
  mod_no INT AUTO_INCREMENT, -- Mã quản trị viên tự tăng
  mod_name VARCHAR(70) NOT NULL, -- Họ tên quản trị viên
  mod_id CHAR(12) NOT NULL UNIQUE, -- Chứng minh nhân dân
  mod_phoneNumber VARCHAR(12) NOT NULL UNIQUE, -- Số điện thoại
  mod_sex TINYINT(1) NOT NULL DEFAULT '0', -- Giới tính 1 là nam 0 là nữ
  mod_address VARCHAR(128) NOT NULL, -- Địa chỉ
  mod_role TINYINT(1) NOT NULL DEFAULT '0', -- Vai trò 0 là nhân viên 1 là quản lý
  mod_username VARCHAR(70) NOT NULL UNIQUE, -- Tài khoản
  mod_password CHAR(64) NOT NULL, -- Mật khẩu

 -- Khóa chính
  CONSTRAINT Moderators_PK PRIMARY KEY (mod_no)
);


-- Bảng địa chỉ
CREATE TABLE Addresses(
  addr_no INT AUTO_INCREMENT, -- Mã địa chỉ tự tăng
  addr_location VARCHAR(100) , -- Địa chỉ
  addr_phoneNumber VARCHAR(12) , -- Số điện thoại
  cus_no INT NOT NULL, -- Mã khách hàng khóa ngoại tham chiếu bảng khách hàng 
 
 -- Khóa chính
  CONSTRAINT Addresses_PK PRIMARY KEY (addr_no),

 -- Khóa ngoại
  CONSTRAINT Addresses_Customers_FK FOREIGN KEY(cus_no) REFERENCES Customers(cus_no) ON DELETE CASCADE
); 


-- Bảng thương hiệu
CREATE TABLE Brands(
  brand_no INT AUTO_INCREMENT, -- Mã thương hiệu tự tăng
  brand_name VARCHAR(128) NOT NULL UNIQUE, -- Tên thương hiệu phải độc nhất

 -- Khóa chính
  CONSTRAINT Brands_PK PRIMARY KEY (brand_no)
); 

-- Bảng sản phẩm
CREATE TABLE Products(
  prod_no INT AUTO_INCREMENT, -- Mã sản phẩm tự tăng
  prod_name VARCHAR(50) NOT NULL UNIQUE, -- Tên sản phẩm phải độc nhất
  prod_manufacturer VARCHAR(1000) NOT NULL , -- Nhà sản xuất
  prod_screen VARCHAR(1000) NOT NULL, -- Màn hình
  prod_camera VARCHAR(1000) NOT NULL, -- Camera
  prod_hardwareAndOS VARCHAR(1000) NOT NULL, -- Phần cứng và hệ điều hành
  prod_network VARCHAR(1000) NOT NULL, -- Mạng kết nối
  prod_batteryAndCharger VARCHAR(1000) NOT NULL, -- Pin và sạc
  prod_utilities VARCHAR(1000) NOT NULL, -- Tiện ích
  prod_design VARCHAR(1000) NOT NULL, -- Thiết kế
  prod_status TINYINT(1) NOT NULL DEFAULT '0', -- Trạng thái sản phẩm
  brand_no INT NOT NULL, -- Thương hiệu khóa ngoại tham chiếu bảng thương hiệu

 -- Khóa chính
  CONSTRAINT Products_PK PRIMARY KEY (prod_no),

 -- Khóa ngoại
  CONSTRAINT Products_Brands_FK FOREIGN KEY(brand_no) REFERENCES Brands(brand_no) ON DELETE CASCADE
); 

-- Bảng hình ảnh
CREATE TABLE Images(
  img_no INT AUTO_INCREMENT, -- Mã hình ảnh tự tăng
  img_src VARCHAR(128) NOT NULL, -- Đường dẫn đến resource trên server
  prod_no INT NOT NULL, -- Mã sản phẩm khóa ngoại tham chiếu bảng sản phẩm

 -- Khóa chính
  CONSTRAINT Images_PK PRIMARY KEY (img_no),

 -- Khóa ngoại
  CONSTRAINT Images_Products_FK FOREIGN KEY(prod_no) REFERENCES Products(prod_no) ON DELETE CASCADE
); 

-- Bảng đánh giá
CREATE TABLE Feedbacks(
  fb_no INT AUTO_INCREMENT, -- Mã đánh giá tự tăng
  fb_content VARCHAR(500) NOT NULL, -- Nội dung đánh giá
  fb_time DATETIME NOT NULL DEFAULT NOW() , -- Thời gian đánh giá
  prod_no INT NOT NULL, -- Mã sản phẩm khóa ngoại tham chiếu bảng sản phẩm
  cus_no INT NOT NULL, -- Mã khách hàng khóa ngoại tham chiếu bảng khách hàng

 -- Khóa chính
  CONSTRAINT Feedbacks_PK PRIMARY KEY (fb_no),

 -- Khóa ngoại
  CONSTRAINT Feedbacks_Products_FK FOREIGN KEY(prod_no) REFERENCES Products(prod_no) ON DELETE CASCADE,
  CONSTRAINT Feedbacks_Customers_FK FOREIGN KEY(cus_no) REFERENCES Customers(cus_no) ON DELETE CASCADE
); 

-- Bảng trả lời
CREATE TABLE Replies(
  rep_no INT AUTO_INCREMENT, -- Mã trả lời tự tăng
  rep_content VARCHAR(500) NOT NULL, -- Nội dung trả lời
  rep_time DATETIME NOT NULL DEFAULT NOW() , -- Thời gian trả lời
  mod_no INT NOT NULL, -- Mã quản trị viên khóa ngoại tham chiếu bảng quản trị viên
  fb_no INT NOT NULL, -- Mã đánh giá khóa ngoại tham chiếu bảng đánh giá

 -- Khóa chính
  CONSTRAINT Replies_PK PRIMARY KEY (rep_no),

 -- Khóa ngoại
  CONSTRAINT Replies_Moderators_FK FOREIGN KEY(mod_no) REFERENCES Moderators(mod_no) ON DELETE CASCADE,
  CONSTRAINT Replies_Feedbacks_FK FOREIGN KEY(fb_no) REFERENCES Feedbacks(fb_no) ON DELETE CASCADE
); 

-- Bảng đơn hàng
CREATE TABLE Orders(
  order_no INT AUTO_INCREMENT, -- Mã đơn hàng tự tăng
  order_time DATETIME NOT NULL DEFAULT NOW(), -- Ngày tạo đơn hàng
  cus_no INT NOT NULL, -- Mã khách hàng khóa ngoại tham chiếu bảng khách hàng

 -- Khóa chính
  CONSTRAINT Orders_PK PRIMARY KEY (order_no),

 -- Khóa ngoại
  CONSTRAINT Orders_Customers_FK FOREIGN KEY(cus_no) REFERENCES Customers(cus_no) ON DELETE CASCADE
); 

-- Bảng hóa đơn
CREATE TABLE Bills(
  bill_no INT AUTO_INCREMENT, -- Mã hóa đơn tự tăng
  bill_time DATETIME NOT NULL DEFAULT NOW(), -- Thời gian ra hóa đơn
  bill_total DECIMAL(15, 2) NOT NULL DEFAULT '0', -- Số tiền cho hóa đơn
  bill_status TINYINT(1) NOT NULL DEFAULT '0', -- Trạng thái hóa đơn
  mod_no INT NOT NULL, -- Mã quản trị viên khóa ngoại tham chiếu bảng quản trị viên 
  order_no INT NOT NULL, -- Mã giỏ hàng tham chiếu bảng giỏ hàng
  addr_no INT NOT NULL, -- Mã địa chỉ tham chiếu bảng địa chỉ

 -- Khóa chính
  CONSTRAINT Bills_PK PRIMARY KEY (bill_no),

 -- Khóa ngoại
  CONSTRAINT Bills_Moderators_FK FOREIGN KEY(mod_no) REFERENCES Moderators(mod_no) ON DELETE CASCADE,
  CONSTRAINT Bills_Orders_FK FOREIGN KEY(order_no) REFERENCES Orders(order_no) ON DELETE CASCADE,
  CONSTRAINT Bills_Addresses_FK FOREIGN KEY(addr_no) REFERENCES Addresses(addr_no) ON DELETE CASCADE
); 


-- Bảng chi tiết sản phẩm
CREATE TABLE Products_Details(
  pd_no INT AUTO_INCREMENT, -- Mã chi tiết sản phẩm tự tăng
  pd_ram VARCHAR(10) NOT NULL, -- RAM
  pd_storage VARCHAR(10) NOT NULL, -- Bộ nhớ
  pd_storageAvailable VARCHAR(10) NOT NULL, -- Bộ nhớ khả dụng
  pd_price DECIMAL(15, 2) NOT NULL, -- Giá
  pd_amount INT NOT NULL, -- Số lượng
  pd_sold INT NOT NULL, -- Số lượng đã bán
  prod_no INT NOT NULL, -- Mã sản phẩm khóa ngoại tham chiếu bảng sản phẩm

 -- Khóa chính
  CONSTRAINT Products_Details_PK PRIMARY KEY (pd_no),

 -- Khóa ngoại
  CONSTRAINT Products_Details_Products_FK FOREIGN KEY(prod_no) REFERENCES Products(prod_no) ON DELETE CASCADE
); 


-- Bảng chi tiết đơn hàng
CREATE TABLE Orders_Details(
  order_no INT NOT NULL, -- Mã giỏ hàng khóa ngoại tham chiếu bảng đơn hàng
  pd_no INT NOT NULL, -- Mã chi tiết sản phẩm khóa ngoại tham chiếu bảng chi tiết sản phẩm

  od_quantity INT NOT NULL, -- Số lượng sản phẩm trong giỏ
  od_price DECIMAL(15, 2) NOT NULL, -- Tổng giá trị giỏ hàng

    -- Khóa ngoại
  CONSTRAINT Orders_Details_Carts_FK FOREIGN KEY(order_no) REFERENCES Orders(order_no) ON DELETE CASCADE,
  CONSTRAINT Orders_Details_Products_Details_FK FOREIGN KEY(pd_no) REFERENCES Products_Details(pd_no) ON DELETE CASCADE,
    
 -- Khóa chính
  CONSTRAINT Orders_Details_PK PRIMARY KEY (order_no, pd_no)
); 


