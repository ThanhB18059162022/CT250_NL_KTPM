DROP DATABASE Phone_E_Commerce_DB;
CREATE DATABASE Phone_E_Commerce_DB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE Phone_E_Commerce_DB;

-- Tạo các bảng (13 bảng)

-- Bảng khách hàng

CREATE TABLE Customers(
  cus_no INT AUTO_INCREMENT, -- Mã khách hàng tự tăng
  cus_name VARCHAR(70) , -- Họ tên khách hàng
  cus_id CHAR(12) , -- Chứng minh nhân dân
  cus_email VARCHAR(128) , -- Email của khách
  cus_sex TINYINT(1) NOT NULL DEFAULT '0', -- Giới tính 1 là nam 0 là nữ
  cus_location VARCHAR(100) , -- Địa chỉ
  cus_phoneNumber VARCHAR(12) , -- Số điện thoại
 
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
  brand_no INT NOT NULL DEFAULT '1', -- Thương hiệu khóa ngoại tham chiếu bảng thương hiệu
  prod_color VARCHAR(10), -- Màu sắc NULL là ko có màu

 -- Khóa chính
  CONSTRAINT Products_PK PRIMARY KEY (prod_no),

 -- Khóa ngoại
  CONSTRAINT Products_Brands_FK FOREIGN KEY(brand_no) REFERENCES Brands(brand_no) ON DELETE CASCADE
); 

-- Bảng hình ảnh
CREATE TABLE Images(
  img_no INT AUTO_INCREMENT, -- Mã hình ảnh tự tăng
  img_src VARCHAR(128) NOT NULL DEFAULT "./images/products/prod_img.jpg", -- Đường dẫn đến resource trên server
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
  order_id VARCHAR(70),
  order_total DECIMAL(15, 2) NOT NULL DEFAULT '0', -- Tổng tiền của đơn hàng
  order_create DATETIME, -- Thời gian tạo đơn hàng
  order_pay DATETIME, -- Thời gian thanh toán đơn hàng
  order_payment VARCHAR(30), -- Phương thức thanh toán
  cus_no INT NOT NULL, -- Mã khách hàng khóa ngoại tham chiếu bảng khách hàng

 -- Khóa chính
  CONSTRAINT Orders_PK PRIMARY KEY (order_no),

 -- Khóa ngoại
  CONSTRAINT Orders_Customers_FK FOREIGN KEY(cus_no) REFERENCES Customers(cus_no) ON DELETE CASCADE
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
  pd_discount VARCHAR(1000), -- Giảm giá

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

    -- Khóa ngoại
  CONSTRAINT Orders_Details_Carts_FK FOREIGN KEY(order_no) REFERENCES Orders(order_no) ON DELETE CASCADE,
  CONSTRAINT Orders_Details_Products_Details_FK FOREIGN KEY(pd_no) REFERENCES Products_Details(pd_no) ON DELETE CASCADE,
    
 -- Khóa chính
  CONSTRAINT Orders_Details_PK PRIMARY KEY (order_no, pd_no)
); 

-- ---------------------------------------------------------------Data Insert-----------------------------------------------------------

INSERT INTO Brands(brand_name) VALUES(N'SAMSUNG');
INSERT INTO Brands(brand_name) VALUES(N'Apple');
INSERT INTO Brands(brand_name) VALUES(N'Oppo');
INSERT INTO Brands(brand_name) VALUES(N'Xiaomi');
INSERT INTO Brands(brand_name) VALUES(N'NOKIA');
INSERT INTO Brands(brand_name) VALUES(N'Vsmart');
INSERT INTO Brands(brand_name) VALUES(N'Vivo');
INSERT INTO Brands(brand_name) VALUES(N'Realme');

-- Samsung Galaxy Z Fold3 | Z Flip3 5G

INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
    (
        'Galaxy Z Fold3 | Z Flip3 5G',
        '{"brand_name":"Samsung","releaseDate":"2021-8-1","madeIn":"Trung Quốc"}',
        '{"type":"Dynamic AMOLED 2X","resolution":"Full HD+ (1768 x 2208 Pixels)","size":"Chính 7.6\' & Phụ 6.2\' - Tần số quét 120 Hz","glass":"Kính cường lực Corning Gorilla Glass Victus"}',
        '{"rear":{"spec":"3 camera 12 MP","videoQuality":"4K 2160p@60fps, FullHD 1080p@240fps, FullHD 1080p@60fps, HD 720p@960fps"},"font":"10 MP & 4 MP 8 MP"}',
        '{"os":"Android 11","cpu":"Snapdragon 888 8 nhân","cpuSpec":"1 nhân 2.84 GHz, 3 nhân 2.42 GHz & 4 nhân 1.8 GHz","gpu":"Adreno 660"}',
        '{"telecom":"5G","SIM":"2 Nano Sim","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS, BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LEv, 5.2","connector":"Type-C","others":"NFC, OTG"}',
        '{"battery":"4400 mAh","batteryType":"Li-ion","chargeType":"25W"}',
        '[{"Bảo mật":"Mở khoá vân tay cạnh viền"},{"Tính năng đặc biệt":"Samsung Pay Âm thanh AKG"},{"Kháng nước, bụi":"IPX8"}]',
        '{"structural":"Nguyên khối","material":"Khung nhôm & Mặt lưng kính cường lực","size":"Dài 158.2 mm - Ngang 128.1 mm - Dày 6.4 mm","weight":"271 g"}',
        1 -- Nhãn hiệu Samsung
    );

INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no, pd_discount)
VALUES("12 GB", "256 GB", "223 GB", 41990000, 20, 5, 1, '{"start":"2020-01-01","end":"2020-12-31","percent":10}');

INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("12 GB", "512 GB", "480 GB", 44990000, 20, 5, 1);    


-- iPhone 12 Pro Max
INSERT INTO Products(
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no
)
VALUES
(
    'iPhone 12 Pro Max',
    '{"brand_name":"Apple","releaseDate":"2020-10","madeIn":"Trung Quốc"}',
    '{"type":"OLED","resolution":"1284 x 2778 Pixels","size":"6.7\' - Tần số quét 60 Hz","glass":"Kính cường lực Ceramic Shield"}',
    '{"rear":{"spec":"3 camera 12 MP","videoQuality":"4K 2160p@30fps, 4K 2160p@60fps, FullHD 1080p@30fps, HD 720p@30fps, FullHD 1080p@60fps, 4K 2160p@24fps"},"font":"12 MP"}',
    '{"os":"iOS 14","cpu":"Apple A14 Bionic 6 nhân","cpuSpec":"2 nhân 3.1 GHz & 4 nhân 1.8 GHz","gpu":"Apple GPU 4 nhân"}',
    '{"telecom":"Hỗ trợ 5G","SIM":"1 Nano SIM & 1 eSIM","Wifi":"Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi hotspot, Dual-band (2.4 GHz/5 GHz)","GPS":"BDS ,GLONASS, A-GPS","Bluetooth":"A2DP, 5.0","connector":"Lightning","others":"Lightning"}',
    '{"battery":"3687 mAh","batteryType":"Li-ion","chargeType":"20W"}',
    '[{"Bảo mật":"Mở khoá khuôn mặt Face ID"},{"Kháng nước, bụi":"IP68"},{"Ghi âm":"Có (microphone chuyên dụng chống ồn)"},{"Xem phim":"H.264(MPEG4-AVC)"},{"Nghe nhạc":"Lossless, AAC, MP3, FLAC"}]',
    '{"structural":"Nguyên khối","material":"Khung thép không gỉ & Mặt lưng kính cường lực","size":"Dài 160.8 mm - Ngang 78.1 mm - Dày 7.4 mm","weight":"228 g"}',
    2 -- Nhãn hiệu Apple
); 
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("6 GB", "128 GB", "113 GB", 32990000, 30, 15, 2);

INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("6 GB", "256 GB", "241 GB", 37490000, 10, 15, 2);

INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("6 GB", "512 GB", "113 GB", 42490000, 10, 7, 2);


-- OPPO Reno6 Z 5G
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES
(
  'OPPO Reno6 Z 5G',
  '{"brand_name":"Oppo","releaseDate":"2021-7","madeIn":"Trung Quốc"}',
  '{"type":"AMOLED","resolution":"Full HD+ (1080 x 2400 Pixels)","size":"6.43\' - Tần số quét 60 Hz","glass":"Kính cường lực Corning Gorilla Glass 5"}',
  '{"rear":{"spec":"Chính 64 MP & Phụ 8 MP, 2 MP","videoQuality":"4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@30fps"},"font":"32 MP"}',
  '{"os":"Android 11","cpu":"MediaTek Dimensity 800U 5G 8 nhân","cpuSpec":"2 nhân 2.4 GHz & 6 nhân 2 GHz","gpu":"Mali-G57 MC3"}',      
  '{"telecom":"Hỗ trợ 5G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS ,BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LE, v5.1","connector":"Type-C","others":"OTG"}',
  '{"battery":"4310 mAh","batteryType":"Li-Po","chargeType":"30W"}',
  '[{"Bảo mật nâng cao":"Mở khoá khuôn mặt, Mở khoá vân tay dưới màn hình"},{"Tính năng đặt biệt":"Chạm 2 lần sáng màn hình, Ứng dụng kép (Nhân bản ứng dụng)"},{"Kháng nước, bụi":"Không có"},{"Ghi âm":"Có"},{"Raido":"Có"},{"Xem phim":"3GP, AVI, MP4, WMV"},{"Nghe nhạc":"AAC, AMR, MP3, WAV, WMA"}]',
  '{"structural":"Nguyên khối","material":"Khung hợp kim & Mặt lưng thuỷ tinh hữu cơ","size":"Dài 160.2 mm - Ngang 73.38 mm - Dày 7.97 mm","weight":"Nặng 173 g"}',
  3 -- Nhãn hiệu Oppo
);

INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("8 GB", "128 GB", "110 GB", 9490000, 20, 9, 3);


-- Xiaomi POCO X3 Pro NFC 8GB-256GB
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES
(
    'Xiaomi POCO X3 Pro NFC 8GB-256GB',
    '{"brand_name":"Xiaomi","releaseDate":"2021-4","madeIn":"Trung Quốc"}',
    '{"type":"IPS LCD","resolution":"Full HD+ (1080 x 2400 Pixels)","size":"6.67\'","glass":"Kính cường lực Corning Gorilla Glass 6"}',
    '{"rear":{"spec":"Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP","videoQuality":"4K 2160p@30fps, FullHD 1080p@30fps, FullHD 1080p@60fps"},"font":"20 MP"}',
    '{"os":"Android 11","cpu":"Snapdragon 860 8 nhân","cpuSpec":"1 nhân 2.96 GHz, 3 nhân 2.42 GHz & 4 nhân 1.8 GHz","gpu":"Adreno 640"}',
    '{"telecom":"Hỗ trợ 4G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS ,BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LE, v5.0","connector":"Type-C","others":"NFC, OTG"}',     
    '{"battery":"5160 mAh","batteryType":"Li-Po","chargeType":"33W"}',
    '[{"Bảo mật nâng cao":"Mở khoá vân tay"},{"Tính năng đặt biệt":"Chạm 2 lần sáng màn hình, Ứng dụng kép (Nhân bản ứng dụng)"},{"Kháng nước, bụi":"Không có"},{"Ghi âm":"Có"},{"Raido":"Có"},{"Xem phim":"Có"},{"Nghe nhạc":"Có"}]',
    '{"structural":"Nguyên khối","material":"Đang cập nhật","size":"Dài 165.3 mm - Ngang 76.8 mm - Dày 9.4 mm","weight":"Nặn ng 215 g"}',
    4 -- Nhãn hiệu Xiaomi
);

INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("8 GB", "256 GB", "...", 6990000, 5, 3, 4);


-- Nokia C30 3GB-32GB
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES
(
    'Nokia C30 3GB-32GB',
    '{"brand_name":"Nokia","releaseDate":"2021-8","madeIn":"Trung Quốc"}',
    '{"type":"IPS LCD","resolution":"HD+ (720 x 1600 Pixels)","size":"6.82\' - Tần số quét 60 Hz","glass":"Mặt kính cong 2.5D"}',
    '{"rear":{"spec":"Chính 13 MP & Phụ 2 MP","videoQuality":"FullHD 1080p@30fpsHD, 720p@30fps"},"font":"5 MP"}',
    '{"os":"Android 11 (Go Edition)","cpu":"Spreadtrum SC9863A 8 nhân","cpuSpec":"4 nhân 1.6 GHz & 4 nhân 1.2 GHz","gpu":"IMG PowerVR GE8322"}',
    '{"telecom":"Hỗ trợ 4G","SIM":"2 Nano SIM","Wifi":"Wi-Fi 802.11 a/b/g/n, Wi-Fi hotspot","GPS":"A-GPS","Bluetooth":"A2DP, v4.2","connector":"Micro USB","others":"Jack 3.5mm"}',
    '{"battery":"6000 mAh","batteryType":"Li-Po","chargeType":"10W"}',
    '[{"Bảo mật nâng cao":"Mở khoá khuôn mặt, Mở khóa bằng vân tay"},{"Kháng nước, bụi":"Không có"},{"Ghi âm":"Có"},{"Raido":"Có"},{"Xem phim":"MP4"},{"Nghe nhạc":"MP3, WAV"}]',
    '{"structural":"Pin liền","material":"Khung & Mặt lưng nhựa Polycarbonate","size":"Dài 177.7 mm - Ngang 79.1 mm - Dày 9.9 mm","weight":"Nặng 237 g"}',
    5 -- Nhãn hiệu Nokia
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("3 GB", "32 GB", "25 GB", 2790000, 5, 3, 5);


-- Xiaomi Redmi 10
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES
(
  'Xiaomi Redmi 10',
  '{"brand_name":"Xiaomi","releaseDate":"2021-8","madeIn":"Trung Quốc"}',
  '{"type":"IPS LCD","resolution":"Full HD+ (1080 x 2400 Pixels)","size":"6.5\' - Tần số quét 90 Hz","glass":"Kính cường lực Corning Gorilla Glass 3"}',
  '{"rear":{"spec":"Chính 50 MP & Phụ 8 MP, 2 MP, 2 MP","videoQuality":"FullHD 1080p@30fps, HD 720p@30fps"},"font":"8 MP"}',
  '{"os":"Android 11","cpu":"MediaTek Helio G88 8 nhân","cpuSpec":"2 nhân 2.0 GHz & 6 nhân 1.8 GHz","gpu":"Mali-G52 MC2"}',
  '{"telecom":"Hỗ trợ 4G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS, BDS, GLONASS","Bluetooth":"v5.1","connector":"Type-C","others":"Hồng ngoại, OTG"}',
  '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"20W"}',
  '[{"Bảo mật nâng cao":"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền"},{"Tính năng đặc biệt":"Loa kép"},{"Kháng nước, bụi":"Không có"},{"Xem phim":"AVI, MP4"},{"Nghe nhạc":"FLAC, Midi, MP3, OGG"}]',
  '{"structural":"Nguyên khối","material":"Khung & Mặt lưng nhựa","size":"Dài 161 mm - Ngang 75.53 mm - Dày 8.92 mm","weight":"Nặng 181 g"}',
  4
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("4 GB", "64 GB", "50 GB", 3990000, 15, 7, 6);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("4 GB", "128 GB", "100 GB", 4290000, 15, 7, 6);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("6 GB", "128 GB", "100 GB", 4690000, 15, 7, 6);



-- Samsung Galaxy Note 20 Ultra
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
    (  
    'Samsung Galaxy Note 20 Ultra',
    '{"brand_name":"Samsung","releaseDate":"2020-8","madeIn":"Việt Nam"}',
    '{"type":"Dynamic AMOLED 2X","resolution":"2K+ (1440 x 3088 Pixels)","size":"6.9\' - Tần số quét 120 Hz","glass":"Kính cường lực Corning Gorilla Glass Victus"}',
    '{"rear":{"spec":"Chính 108 MP & Phụ 12 MP, 12 MP, cảm biến Laser AF","videoQuality":"8K 4320p@24fps"},"font":"10 MP"}',  
    '{"os":"Android 10","cpu":"Exynos 990 8 nhân","cpuSpec":"2 nhân 2.73 GHz, 2 nhân 2.5 GHz & 4 nhân 2.0 Ghz","gpu":"Mali-G77 MP11"}',
    '{"telecom":"Hỗ trợ 5G","SIM":"2 Nano SIM hoặc 1 Nano SIM + 1 eSIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS, BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LEv, 5.2","connector":"2 đầu Type-C","others":"NFC, OTG"}',
    '{"battery":"4500 mAh","batteryType":"Li-ion","chargeType":"25W"}',
    '[{"Bảo mật":"Mở khoá khuôn mặt, Mở khoá vân tay dưới màn hình"},{"Tính năng đặc biệt":"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio"},{"Kháng nước, bụi":"IP68"},{"Ghi âm":"Có (microphone chuyên dụng chống ồn)"},{"Xem phim":"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid"},{"Nghe nhạc":"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+"}]',    
    '{"structural":"Nguyên khối","material":"Khung nhôm & Mặt lưng kính cường lực","size":"Dài 164.8 mm - Ngang 77.2 mm - Dày 8.1 mm","weight":"208 g"}',
    1
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("12 GB", "256 GB", "223 GB", 18999000, 20, 7, 7);


-- Vsmart Aris
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
    (  
    'Vsmart Aris',
    '{"brand_name":"Vsmart","releaseDate":"2018-1","madeIn":"Việt Nam"}',
    '{"type":"AMOLED","resolution":"Full HD+ (1080 x 2340 Pixels)","size":"6.39\' - Tần số quét 60 Hz","glass":"Kính cường lực Corning Gorilla Glass 5"}',
    '{"rear":{"spec":"Chính 64 MP & Phụ 8 MP, 8 MP, 2 MP","videoQuality":"4K 2160p@30fps, HD 720p@240fps"},"font":"20 MP"}',  '{"os":"Android 10","cpu":"Snapdragon 730 8 nhân","cpuSpec":"2 nhân 2.2 GHz & 6 nhân 1.8 GHz","gpu":"Adreno 618"}',
    '{"telecom":"Hỗ trợ 4G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac","GPS":"A-GPS","Bluetooth":"v5.0","connector":"Type-C","others":"OTG"}',  '{"battery":"4000 mAh","batteryType":"Li-Po","chargeType":"18W"}',
    '[{"Bảo mật":"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền"},{"Tính năng đặc biệt":"Chặn cuộc gọi, Chặn tin nhắn, Trợ lý ảo Google Assistant, Ghi âm cuộc gọi, Ứng dụng kép (Nhân bản ứng dụng), Tối ưu game (Chế độ trò chơi), Ứng dụng kép, Không gian thứ hai (Không gian riêng tư)"},{"Kháng nước, bụi":"IP52"},{"Ghi âm":"Có"},{"Xem phim":"AVI, MP4"},{"Nghe nhạc":"AAC, AMR, FLAC, MP3, Midi, WAV"}]',
    '{"structural":"Nguyên khối","material":"Khung kim loại & Mặt lưng kính","size":"Dài 156.2 mm - Ngang 75.04 mm - Dày 8.55 mm ","weight":"178 g"}',
    6
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("8 GB", "128 GB", "119 GB", 5190000, 10, 7, 8);


-- Samsung Galaxy A22 5G
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
(  
    'Samsung Galaxy A22 5G',
    '{"brand_name":"Samsung","releaseDate":"2021-6","madeIn":"Việt Nam"}',
    '{"type":"TFT LCD","resolution":"Full HD+ (1080 x 2400 Pixels)","size":"6.6\' - Tần số quét 90 Hz","glass":"Kính cường lực Corning Gorilla 4"}',
    '{"rear":{"spec":"Chính 48 MP & Phụ 5 MP, 2 MP","videoQuality":"FullHD 1080p@30fps"},"font":"8 MP"}',
    '{"os":"Android 11","cpu":"MediaTek Dimensity 700 5G 8 nhân","cpuSpec":"2 nhân 2.2 GHz & 6 nhân 2.0 GHz","gpu":"Mali-G57 MC2"}',
    '{"telecom":"Hỗ trợ 5G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS, BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LEv, 5.2","connector":"2 đầu Type-C","others":"NFC, OTG"}',
    '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"15W"}',
    '[{"Bảo mật":"Mở khoá vân tay cạnh"},{"Tính năng đặc biệt":"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio"},{"Kháng nước, bụi":"IP68"},{"Ghi âm":"Có (microphone chuyên dụng chống ồn)"},{"Xem phim":"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid"},{"Nghe nhạc":"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+"}]',
    '{"structural":"Nguyên khối","material":"Khung nhôm & Mặt lưng kính cường lực","size":"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm ","weight":"203 g"}',
    1
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("6 GB", "128 GB", "119 GB", 5399000, 10, 7, 9);


-- iPhone XR
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
(  
    'iPhone XR',
    '{"brand_name":"Apple","releaseDate":"2018-9","madeIn":"Trung Quốc"}',
    '{"type":"IPS LCD","resolution":"828 x 1792 Pixels","size":"6.1\' - Tần số quét 60 Hz","glass":"Kính cường lực Oleophobic (ion cường lực)"}',
    '{"rear":{"spec":"12 MP","videoQuality":"4K 2160p@30fps, 4K 2160p@60fps, FullHD 1080p@30fps, HD 720p@30fps, FullHD 1080p@60fps, 4K 2160p@24fps"},"font":"7 MP"}',
    '{"os":"iOS 14","cpu":"Apple A12 Bionic 6 nhân","cpuSpec":"2 nhân 2.5 GHz & 4 nhân 1.6 GHz","gpu":"Apple GPU 4 nhân"}',   
    '{"telecom":"Hỗ trợ 4G","SIM":"1 Nano SIM & 1 eSIM","Wifi":"Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi hotspot, Dual-band (2.4 GHz/5 GHz)","GPS":"BDS ,GLONASS, A-GPS","Bluetooth":"A2DP, 5.0","connector":"Lightning","others":"Lightning, NFC"}',
    '{"battery":"2942 mAh","batteryType":"Li-ion","chargeType":"15W"}',
    '[{"Bảo mật":"Mở khoá khuôn mặt Face ID"},{"Tính năng đặc biệt":"Apple Pay"},{"Kháng nước, bụi":"IP67"},{"Ghi âm":"Có (microphone chuyên dụng chống ồn)"},{"Xem phim":"H.264(MPEG4-AVC)"},{"Nghe nhạc":"Lossless, AAC, MP3, FLAC"}]',
    '{"structural":"Nguyên khối","material":"Khung nhôm & Mặt lưng kính cường lực","size":"Dài 150.9 mm - Ngang 75.7 mm - Dày 8.3 mm","weight":"194 g"}',
    2
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("6 GB", "64 GB", "57 GB", 12990000, 20, 7, 10);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("6 GB", "128 GB", "121 GB", 14990000, 20, 7, 10);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("6 GB", "256 GB", "246 GB", 16990000, 20, 7, 10);



-- Vivo Y21
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
(  
  'Vivo Y21',
  '{"brand_name":"Vivo","releaseDate":"2021-8","madeIn":"Trung Quốc"}',  
  '{"type":"IPS LCD","resolution":"HD+ (720 x 1600 Pixels)","size":"6.51\' - Tần số quét 60 Hz","glass":"Kính cường lực"}',
  '{"rear":{"spec":"Chính 13 MP & Phụ 2 MP","videoQuality":"FullHD 1080p@30fps, HD 720p@30fps"},"font":"8 MP"}',
  '{"os":"Android 11","cpu":"MediaTek Helio P35 8 nhân","cpuSpec":"4 nhân 2.3 GHz & 4 nhân 1.8 GHz","gpu":"IMG PowerVR GE8320"}',
  '{"telecom":"Hỗ trợ 4G","SIM":"2 Nano SIM","Wifi":"Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi hotspot, Dual-band (2.4 GHz/5 GHz)","GPS":"BDS ,GLONASS, A-GPS","Bluetooth":"A2DP, 5.0","connector":"Lightning","others":"Lightning, OTG"}',
  '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"18W"}',
  '[{"Bảo mật":"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền"},{"Kháng nước, bụi":"Không có"},{"Ghi âm":"Có"},{"Xem phim":"3GP"},{"Nghe nhạc":"MP3"}]',
  '{"structural":"Nguyên khối","material":"Khung & Mặt lưng nhựa Polycarbonate","size":"Dài 164.26 mm - Ngang 76.08 mm - Dày 8 mm","weight":"182 g"}',
  7
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("4 GB", "64 GB", "52 GB", 4290000, 25, 15, 11);


-- Samsung Galaxy A52s 5G
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
(  
    'Samsung Galaxy A52s 5G',
    '{"brand_name":"Samsung","releaseDate":"2021-6","madeIn":"Việt Nam"}',
    '{"type":"TFT LCD","resolution":"Full HD+ (1080 x 2400 Pixels)","size":"6.6\' - Tần số quét 90 Hz","glass":"Kính cường lực Corning Gorilla 4"}',
    '{"rear":{"spec":"Chính 48 MP & Phụ 5 MP, 2 MP","videoQuality":"FullHD 1080p@30fps"},"font":"8 MP"}',
    '{"os":"Android 11","cpu":"MediaTek Dimensity 700 5G 8 nhân","cpuSpec":"2 nhân 2.2 GHz & 6 nhân 2.0 GHz","gpu":"Mali-G57 MC2"}',
    '{"telecom":"Hỗ trợ 5G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS, BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LEv, 5.2","connector":"2 đầu Type-C","others":"NFC, OTG"}',
    '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"15W"}',
    '[{"Bảo mật":"Mở khoá vân tay cạnh"},{"Tính năng đặc biệt":"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio"},{"Kháng nước, bụi":"IP68"},{"Ghi âm":"Có (microphone chuyên dụng chống ồn)"},{"Xem phim":"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid"},{"Nghe nhạc":"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+"}]',
    '{"structural":"Nguyên khối","material":"Khung nhôm & Mặt lưng kính cường lực","size":"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm ","weight":"203 g"}',
    1
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("8 GB", "128 GB", "115 GB", 10290000, 25, 15, 12);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("8 GB", "256 GB", "223 GB", 11090000, 25, 15, 12);


-- Realme C21y
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
( 
  'Realme C21y',
  '{"brand_name":"Realme","releaseDate":"2021-6","madeIn":"Trung Quốc"}',  
  '{"type":"IPS LCD","resolution":"HD+ (720 x 1600 Pixels)","size":"6.5\' - Tần số quét 60 Hz","glass":"Kính cường lực"}',  
  '{"rear":{"spec":"Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP","videoQuality":" 4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@240fps"},"font":"32 MP"}',  '{"os":"Android 11","cpu":"Snapdragon 778G 5G 8 nhân","cpuSpec":"1 nhân 2.4 GHz, 3 nhân 2.2 GHz & 4 nhân 1.9 GHz","gpu":"Mali-G57 MC2"}',
  '{"telecom":"Hỗ trợ 5G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS, BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LEv, 5.2","connector":"2 đầu Type-C","others":"NFC, OTG"}',
  '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"15W"}',
  '[{"Bảo mật":"Mở khoá vân tay cạnh"},{"Tính năng đặc biệt":"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio"},{"Kháng nước, bụi":"IP68"},{"Ghi âm":"Có (microphone chuyên dụng chống ồn)"},{"Xem phim":"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid"},{"Nghe nhạc":"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+"}]',
  '{"structural":"Nguyên khối","material":"Khung nhôm & Mặt lưng kính cường lực","size":"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm ","weight":"203 g"}',
  8
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("3 GB", "32 GB", "16 GB", 3490000, 25, 15, 13);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("4 GB", "32 GB", "16 GB", 3990000, 25, 15, 13);




-- OPPO A54
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
( 
    'OPPO A54',  '{"brand_name":"Oppo","releaseDate":"2021-7","madeIn":"Trung Quốc"}',
    '{"type":"AMOLED","resolution":"Full HD+ (1080 x 2400 Pixels)","size":"6.43\' - Tần số quét 60 Hz","glass":"Kính cường lực Corning Gorilla Glass 5"}',
    '{"rear":{"spec":"Chính 64 MP & Phụ 8 MP, 2 MP","videoQuality":"4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@30fps"},"font":"32 MP"}',
    '{"os":"Android 11","cpu":"MediaTek Dimensity 800U 5G 8 nhân","cpuSpec":"2 nhân 2.4 GHz & 6 nhân 2 GHz","gpu":"Mali-G57 MC3"}',
    '{"telecom":"Hỗ trợ 5G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS ,BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LE, v5.1","connector":"Type-C","others":"OTG"}',
    '{"battery":"4310 mAh","batteryType":"Li-Po","chargeType":"30W"}',
    '[{"Bảo mật nâng cao":"Mở khoá khuôn mặt, Mở khoá vân tay dưới màn hình"},{"Tính năng đặt biệt":"Chạm 2 lần sáng màn hình, Ứng dụng kép (Nhân bản ứng dụng)"},{"Kháng nước, bụi":"Không có"},{"Ghi âm":"Có"},{"Raido":"Có"},{"Xem phim":"3GP, AVI, MP4, WMV"},{"Nghe nhạc":"AAC, AMR, MP3, WAV, WMA"}]',
    '{"structural":"Nguyên khối","material":"Khung hợp kim & Mặt lưng thuỷ tinh hữu cơ","size":"Dài 160.2 mm - Ngang 73.38 mm - Dày 7.97 mm","weight":"Nặng 173 g"}',
    3
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("4 GB", "64 GB", "52 GB", 4690000, 25, 15, 14);


-- Samsung Galaxy S20 FE
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
(  
    'Samsung Galaxy S20 FE',
    '{"brand_name":"Samsung","releaseDate":"2021-6","madeIn":"Việt Nam"}',
    '{"type":"TFT LCD","resolution":"Full HD+ (1080 x 2400 Pixels)","size":"6.6\' - Tần số quét 90 Hz","glass":"Kính cường lực Corning Gorilla 4"}',
    '{"rear":{"spec":"Chính 48 MP & Phụ 5 MP, 2 MP","videoQuality":"FullHD 1080p@30fps"},"font":"8 MP"}',
    '{"os":"Android 11","cpu":"MediaTek Dimensity 700 5G 8 nhân","cpuSpec":"2 nhân 2.2 GHz & 6 nhân 2.0 GHz","gpu":"Mali-G57 MC2"}',
    '{"telecom":"Hỗ trợ 5G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS, BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LEv, 5.2","connector":"2 đầu Type-C","others":"NFC, OTG"}',
    '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"15W"}',
    '[{"Bảo mật":"Mở khoá vân tay cạnh"},{"Tính năng đặc biệt":"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio"},{"Kháng nước, bụi":"IP68"},{"Ghi âm":"Có (microphone chuyên dụng chống ồn)"},{"Xem phim":"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid"},{"Nghe nhạc":"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+"}]',
    '{"structural":"Nguyên khối","material":"Khung nhôm & Mặt lưng kính cường lực","size":"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm ","weight":"203 g"}',
    1
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("8 GB", "256 GB", "223 GB", 12990000, 25, 15, 15);


-- Xiaomi Redmi Note 10S
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES
(
  'Xiaomi Redmi Note 10S',
  '{"brand_name":"Xiaomi","releaseDate":"2021-8","madeIn":"Trung Quốc"}',
  '{"type":"IPS LCD","resolution":"Full HD+ (1080 x 2400 Pixels)","size":"6.5\' - Tần số quét 90 Hz","glass":"Kính cường lực Corning Gorilla Glass 3"}',
  '{"rear":{"spec":"Chính 50 MP & Phụ 8 MP, 2 MP, 2 MP","videoQuality":"FullHD 1080p@30fps, HD 720p@30fps"},"font":"8 MP"}',
  '{"os":"Android 11","cpu":"MediaTek Helio G88 8 nhân","cpuSpec":"2 nhân 2.0 GHz & 6 nhân 1.8 GHz","gpu":"Mali-G52 MC2"}',
  '{"telecom":"Hỗ trợ 4G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS, BDS, GLONASS","Bluetooth":"v5.1","connector":"Type-C","others":"Hồng ngoại, OTG"}',
  '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"20W"}',
  '[{"Bảo mật nâng cao":"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền"},{"Tính năng đặc biệt":"Loa kép"},{"Kháng nước, bụi":"Không có"},{"Xem phim":"AVI, MP4"},{"Nghe nhạc":"FLAC, Midi, MP3, OGG"}]',
  '{"structural":"Nguyên khối","material":"Khung & Mặt lưng nhựa","size":"Dài 161 mm - Ngang 75.53 mm - Dày 8.92 mm","weight":"Nặng 181 g"}',
  4
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("8 GB", "128 GB", "113 GB", 5990000, 15, 7, 16);


-- Vivo Y12s
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
(  
  'Vivo Y12s',
  '{"brand_name":"Vivo","releaseDate":"2021-8","madeIn":"Trung Quốc"}',  
  '{"type":"IPS LCD","resolution":"HD+ (720 x 1600 Pixels)","size":"6.51\' - Tần số quét 60 Hz","glass":"Kính cường lực"}',
  '{"rear":{"spec":"Chính 13 MP & Phụ 2 MP","videoQuality":"FullHD 1080p@30fps, HD 720p@30fps"},"font":"8 MP"}',
  '{"os":"Android 11","cpu":"MediaTek Helio P35 8 nhân","cpuSpec":"4 nhân 2.3 GHz & 4 nhân 1.8 GHz","gpu":"IMG PowerVR GE8320"}',
  '{"telecom":"Hỗ trợ 4G","SIM":"2 Nano SIM","Wifi":"Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi hotspot, Dual-band (2.4 GHz/5 GHz)","GPS":"BDS ,GLONASS, A-GPS","Bluetooth":"A2DP, 5.0","connector":"Lightning","others":"Lightning, OTG"}',
  '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"18W"}',
  '[{"Bảo mật":"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền"},{"Kháng nước, bụi":"Không có"},{"Ghi âm":"Có"},{"Xem phim":"3GP"},{"Nghe nhạc":"MP3"}]',
  '{"structural":"Nguyên khối","material":"Khung & Mặt lưng nhựa Polycarbonate","size":"Dài 164.26 mm - Ngang 76.08 mm - Dày 8 mm","weight":"182 g"}',
  7
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("3 GB", "34 GB", "20 GB", 3290000, 25, 15, 17);


-- Realme C20
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
( 
  'Realme C20',
  '{"brand_name":"Realme","releaseDate":"2021-6","madeIn":"Trung Quốc"}',  
  '{"type":"IPS LCD","resolution":"HD+ (720 x 1600 Pixels)","size":"6.5\' - Tần số quét 60 Hz","glass":"Kính cường lực"}',  
  '{"rear":{"spec":"Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP","videoQuality":" 4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@240fps"},"font":"32 MP"}',  '{"os":"Android 11","cpu":"Snapdragon 778G 5G 8 nhân","cpuSpec":"1 nhân 2.4 GHz, 3 nhân 2.2 GHz & 4 nhân 1.9 GHz","gpu":"Mali-G57 MC2"}',
  '{"telecom":"Hỗ trợ 5G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS, BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LEv, 5.2","connector":"2 đầu Type-C","others":"NFC, OTG"}',
  '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"15W"}',
  '[{"Bảo mật":"Mở khoá vân tay cạnh"},{"Tính năng đặc biệt":"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio"},{"Kháng nước, bụi":"IP68"},{"Ghi âm":"Có (microphone chuyên dụng chống ồn)"},{"Xem phim":"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid"},{"Nghe nhạc":"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+"}]',
  '{"structural":"Nguyên khối","material":"Khung nhôm & Mặt lưng kính cường lực","size":"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm ","weight":"203 g"}',
  8
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("2 GB", "32 GB", "16 GB", 3490000, 25, 15, 18);


-- Vivo V21 5G
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
(  
  'Vivo V21 5G',
  '{"brand_name":"Vivo","releaseDate":"2021-8","madeIn":"Trung Quốc"}',  
  '{"type":"IPS LCD","resolution":"HD+ (720 x 1600 Pixels)","size":"6.51\' - Tần số quét 60 Hz","glass":"Kính cường lực"}',
  '{"rear":{"spec":"Chính 13 MP & Phụ 2 MP","videoQuality":"FullHD 1080p@30fps, HD 720p@30fps"},"font":"8 MP"}',
  '{"os":"Android 11","cpu":"MediaTek Helio P35 8 nhân","cpuSpec":"4 nhân 2.3 GHz & 4 nhân 1.8 GHz","gpu":"IMG PowerVR GE8320"}',
  '{"telecom":"Hỗ trợ 4G","SIM":"2 Nano SIM","Wifi":"Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi hotspot, Dual-band (2.4 GHz/5 GHz)","GPS":"BDS ,GLONASS, A-GPS","Bluetooth":"A2DP, 5.0","connector":"Lightning","others":"Lightning, OTG"}',
  '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"18W"}',
  '[{"Bảo mật":"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền"},{"Kháng nước, bụi":"Không có"},{"Ghi âm":"Có"},{"Xem phim":"3GP"},{"Nghe nhạc":"MP3"}]',
  '{"structural":"Nguyên khối","material":"Khung & Mặt lưng nhựa Polycarbonate","size":"Dài 164.26 mm - Ngang 76.08 mm - Dày 8 mm","weight":"182 g"}',
  7
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("8 GB", "128 GB", "120 GB", 9190000, 25, 15, 19);


-- Xiaomi Redmi 9C 
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES
(
  'Xiaomi Redmi 9C',
  '{"brand_name":"Xiaomi","releaseDate":"2021-8","madeIn":"Trung Quốc"}',
  '{"type":"IPS LCD","resolution":"Full HD+ (1080 x 2400 Pixels)","size":"6.5\' - Tần số quét 90 Hz","glass":"Kính cường lực Corning Gorilla Glass 3"}',
  '{"rear":{"spec":"Chính 50 MP & Phụ 8 MP, 2 MP, 2 MP","videoQuality":"FullHD 1080p@30fps, HD 720p@30fps"},"font":"8 MP"}',
  '{"os":"Android 11","cpu":"MediaTek Helio G88 8 nhân","cpuSpec":"2 nhân 2.0 GHz & 6 nhân 1.8 GHz","gpu":"Mali-G52 MC2"}',
  '{"telecom":"Hỗ trợ 4G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS, BDS, GLONASS","Bluetooth":"v5.1","connector":"Type-C","others":"Hồng ngoại, OTG"}',
  '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"20W"}',
  '[{"Bảo mật nâng cao":"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền"},{"Tính năng đặc biệt":"Loa kép"},{"Kháng nước, bụi":"Không có"},{"Xem phim":"AVI, MP4"},{"Nghe nhạc":"FLAC, Midi, MP3, OGG"}]',
  '{"structural":"Nguyên khối","material":"Khung & Mặt lưng nhựa","size":"Dài 161 mm - Ngang 75.53 mm - Dày 8.92 mm","weight":"Nặng 181 g"}',
  4
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("3 GB", "64 GB", "55 GB", 2990000, 15, 7, 20);



-- Realme 8
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
( 
  'Realme 8',
  '{"brand_name":"Realme","releaseDate":"2021-6","madeIn":"Trung Quốc"}',  
  '{"type":"IPS LCD","resolution":"HD+ (720 x 1600 Pixels)","size":"6.5\' - Tần số quét 60 Hz","glass":"Kính cường lực"}',  
  '{"rear":{"spec":"Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP","videoQuality":" 4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@240fps"},"font":"32 MP"}',  '{"os":"Android 11","cpu":"Snapdragon 778G 5G 8 nhân","cpuSpec":"1 nhân 2.4 GHz, 3 nhân 2.2 GHz & 4 nhân 1.9 GHz","gpu":"Mali-G57 MC2"}',
  '{"telecom":"Hỗ trợ 5G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS, BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LEv, 5.2","connector":"2 đầu Type-C","others":"NFC, OTG"}',
  '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"15W"}',
  '[{"Bảo mật":"Mở khoá vân tay cạnh"},{"Tính năng đặc biệt":"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio"},{"Kháng nước, bụi":"IP68"},{"Ghi âm":"Có (microphone chuyên dụng chống ồn)"},{"Xem phim":"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid"},{"Nghe nhạc":"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+"}]',
  '{"structural":"Nguyên khối","material":"Khung nhôm & Mặt lưng kính cường lực","size":"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm ","weight":"203 g"}',
  8
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("8 GB", "128 GB", "120 GB", 6990000, 25, 15, 21);


-- OPPO A74
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
( 
    'OPPO A74',  '{"brand_name":"Oppo","releaseDate":"2021-7","madeIn":"Trung Quốc"}',
    '{"type":"AMOLED","resolution":"Full HD+ (1080 x 2400 Pixels)","size":"6.43\' - Tần số quét 60 Hz","glass":"Kính cường lực Corning Gorilla Glass 5"}',
    '{"rear":{"spec":"Chính 64 MP & Phụ 8 MP, 2 MP","videoQuality":"4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@30fps"},"font":"32 MP"}',
    '{"os":"Android 11","cpu":"MediaTek Dimensity 800U 5G 8 nhân","cpuSpec":"2 nhân 2.4 GHz & 6 nhân 2 GHz","gpu":"Mali-G57 MC3"}',
    '{"telecom":"Hỗ trợ 5G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS ,BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LE, v5.1","connector":"Type-C","others":"OTG"}',
    '{"battery":"4310 mAh","batteryType":"Li-Po","chargeType":"30W"}',
    '[{"Bảo mật nâng cao":"Mở khoá khuôn mặt, Mở khoá vân tay dưới màn hình"},{"Tính năng đặt biệt":"Chạm 2 lần sáng màn hình, Ứng dụng kép (Nhân bản ứng dụng)"},{"Kháng nước, bụi":"Không có"},{"Ghi âm":"Có"},{"Raido":"Có"},{"Xem phim":"3GP, AVI, MP4, WMV"},{"Nghe nhạc":"AAC, AMR, MP3, WAV, WMA"}]',
    '{"structural":"Nguyên khối","material":"Khung hợp kim & Mặt lưng thuỷ tinh hữu cơ","size":"Dài 160.2 mm - Ngang 73.38 mm - Dày 7.97 mm","weight":"Nặng 173 g"}',
    3
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("8 GB", "128 GB", "120 GB", 6690000, 25, 15, 22);



-- Nokia 5.4
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES
(
    'Nokia 5.4',
    '{"brand_name":"Nokia","releaseDate":"2021-8","madeIn":"Trung Quốc"}',
    '{"type":"IPS LCD","resolution":"HD+ (720 x 1600 Pixels)","size":"6.82\' - Tần số quét 60 Hz","glass":"Mặt kính cong 2.5D"}',
    '{"rear":{"spec":"Chính 13 MP & Phụ 2 MP","videoQuality":"FullHD 1080p@30fpsHD, 720p@30fps"},"font":"5 MP"}',
    '{"os":"Android 11 (Go Edition)","cpu":"Spreadtrum SC9863A 8 nhân","cpuSpec":"4 nhân 1.6 GHz & 4 nhân 1.2 GHz","gpu":"IMG PowerVR GE8322"}',
    '{"telecom":"Hỗ trợ 4G","SIM":"2 Nano SIM","Wifi":"Wi-Fi 802.11 a/b/g/n, Wi-Fi hotspot","GPS":"A-GPS","Bluetooth":"A2DP, v4.2","connector":"Micro USB","others":"Jack 3.5mm"}',
    '{"battery":"6000 mAh","batteryType":"Li-Po","chargeType":"10W"}',
    '[{"Bảo mật nâng cao":"Mở khoá khuôn mặt, Mở khóa bằng vân tay"},{"Kháng nước, bụi":"Không có"},{"Ghi âm":"Có"},{"Raido":"Có"},{"Xem phim":"MP4"},{"Nghe nhạc":"MP3, WAV"}]',
    '{"structural":"Pin liền","material":"Khung & Mặt lưng nhựa Polycarbonate","size":"Dài 177.7 mm - Ngang 79.1 mm - Dày 9.9 mm","weight":"Nặng 237 g"}',
    5 -- Nhãn hiệu Nokia
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("4 GB", "128 GB", "119 GB", 3290000, 5, 3, 23);



-- Samsung Galaxy S20 Ultra
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
(  
    'Samsung Galaxy S20 Ultra',
    '{"brand_name":"Samsung","releaseDate":"2021-6","madeIn":"Việt Nam"}',
    '{"type":"TFT LCD","resolution":"Full HD+ (1080 x 2400 Pixels)","size":"6.6\' - Tần số quét 90 Hz","glass":"Kính cường lực Corning Gorilla 4"}',
    '{"rear":{"spec":"Chính 48 MP & Phụ 5 MP, 2 MP","videoQuality":"FullHD 1080p@30fps"},"font":"8 MP"}',
    '{"os":"Android 11","cpu":"MediaTek Dimensity 700 5G 8 nhân","cpuSpec":"2 nhân 2.2 GHz & 6 nhân 2.0 GHz","gpu":"Mali-G57 MC2"}',
    '{"telecom":"Hỗ trợ 5G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS, BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LEv, 5.2","connector":"2 đầu Type-C","others":"NFC, OTG"}',
    '{"battery":"5000 mAh","batteryType":"Li-Po","chargeType":"15W"}',
    '[{"Bảo mật":"Mở khoá vân tay cạnh"},{"Tính năng đặc biệt":"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio"},{"Kháng nước, bụi":"IP68"},{"Ghi âm":"Có (microphone chuyên dụng chống ồn)"},{"Xem phim":"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid"},{"Nghe nhạc":"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+"}]',
    '{"structural":"Nguyên khối","material":"Khung nhôm & Mặt lưng kính cường lực","size":"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm ","weight":"203 g"}',
    1
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("12 GB", "128 GB", "119 GB", 16999000, 25, 15, 24);



-- OPPO Find X3 Pro
INSERT INTO Products( 
    prod_name,
    prod_manufacturer,
    prod_screen,
    prod_camera,
    prod_hardwareAndOS,
    prod_network,
    prod_batteryAndCharger,
    prod_utilities,
    prod_design,
    brand_no) 
VALUES    
( 
    'OPPO Find X3 Pro',  '{"brand_name":"Oppo","releaseDate":"2021-7","madeIn":"Trung Quốc"}',
    '{"type":"AMOLED","resolution":"Full HD+ (1080 x 2400 Pixels)","size":"6.43\' - Tần số quét 60 Hz","glass":"Kính cường lực Corning Gorilla Glass 5"}',
    '{"rear":{"spec":"Chính 64 MP & Phụ 8 MP, 2 MP","videoQuality":"4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@30fps"},"font":"32 MP"}',
    '{"os":"Android 11","cpu":"MediaTek Dimensity 800U 5G 8 nhân","cpuSpec":"2 nhân 2.4 GHz & 6 nhân 2 GHz","gpu":"Mali-G57 MC3"}',
    '{"telecom":"Hỗ trợ 5G","SIM":"2 Nano SIM","Wifi":"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot","GPS":"A-GPS ,BDS, GALILEO, GLONASS","Bluetooth":"A2DP, LE, v5.1","connector":"Type-C","others":"OTG"}',
    '{"battery":"4310 mAh","batteryType":"Li-Po","chargeType":"30W"}',
    '[{"Bảo mật nâng cao":"Mở khoá khuôn mặt, Mở khoá vân tay dưới màn hình"},{"Tính năng đặt biệt":"Chạm 2 lần sáng màn hình, Ứng dụng kép (Nhân bản ứng dụng)"},{"Kháng nước, bụi":"Không có"},{"Ghi âm":"Có"},{"Raido":"Có"},{"Xem phim":"3GP, AVI, MP4, WMV"},{"Nghe nhạc":"AAC, AMR, MP3, WAV, WMA"}]',
    '{"structural":"Nguyên khối","material":"Khung hợp kim & Mặt lưng thuỷ tinh hữu cơ","size":"Dài 160.2 mm - Ngang 73.38 mm - Dày 7.97 mm","weight":"Nặng 173 g"}',
    3
);
INSERT INTO Products_Details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("12 GB", "256 GB", "245 GB", 21990000, 25, 15, 25);


-- ------------------------------ Quản trị viên -----------------------------------------------------

INSERT INTO Moderators (mod_name, mod_id, mod_phoneNumber, mod_sex, mod_address, mod_role, mod_username, mod_password) 
VALUES ('Administrator', '000000000', '0000000000', '1', N'3/2 Ninh Kiều Cẩn Thơ', '1', "admin", "0c1857fc020582a078352b546cb5b504a0c85cf61340470cd98b8dabff9d578e");
-- pwd: 123456

INSERT INTO Moderators (mod_name, mod_id, mod_phoneNumber, mod_sex, mod_address, mod_role, mod_username, mod_password) 
VALUES ('Staff-lee', '111111111', '1111111111', '0', N'3/2 Ninh Kiều Cẩn Thơ', '0', "staff", "8992768ee63aab3f8b6255e200121bc44712c42bc67662f48482178da09834b8");
-- pwd: 123456


-- ------------------------------ Orders -----------------------------------------------------



INSERT INTO Customers( cus_name, cus_id, cus_email, cus_sex, cus_location, cus_phoneNumber)
VALUES ('Alexander', '555555555', 'alex@gmail.com', true, '3/2 Ninh Kiều Cần Thơ', '0000000000');
INSERT INTO Orders(order_id, order_total, order_create, order_pay, order_payment, cus_no)
VALUES ('d46eaa2e47852617027cae62a93292213ae79b3c18d55332d8babf29f4ffd9f6', 74980000, '2021-10-15 07:05:15', '2021-10-15 09:01:00', 'default', 1);
INSERT INTO Orders_Details(order_no, pd_no, od_quantity) VALUES(1, 1, 1);
INSERT INTO Orders_Details(order_no, pd_no, od_quantity) VALUES(1, 2, 1);

INSERT INTO Customers( cus_name, cus_id, cus_email, cus_sex, cus_location, cus_phoneNumber)
VALUES ('Alexander', '555555555', 'alex@gmail.com', true, '3/2 Ninh Kiều Cần Thơ', '0000000000');
INSERT INTO Orders(order_id, order_total, order_create, order_pay, order_payment, cus_no)
VALUES ('ceaa5c583d66d3e0b95d91c7a8663ec4c78088913a2e1ebb4176efe4da3db8d0', 74980000, '2021-10-15 09:05:15', '2021-10-15 10:10:25', 'default', 1);
INSERT INTO Orders_Details(order_no, pd_no, od_quantity) VALUES(2, 1, 1);
INSERT INTO Orders_Details(order_no, pd_no, od_quantity) VALUES(2, 2, 1);



-- ------------------------------ Feedback -----------------------------------------------------



INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Xài được", 1, 1);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Máy hơi nóng", 2, 2);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Điện thoại chạy chia màng hình hơi giật", 1, 2);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Fan táo", 2, 1);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Xài được", 1, 1);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Máy hơi nóng", 2, 2);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Điện thoại chạy chia màng hình hơi giật", 1, 2);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Fan táo", 2, 1);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Xài được", 1, 1);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Máy hơi nóng", 2, 2);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Điện thoại chạy chia màng hình hơi giật", 1, 2);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Fan táo", 2, 1);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Xài được", 1, 1);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Máy hơi nóng", 2, 2);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Điện thoại chạy chia màng hình hơi giật", 1, 2);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Fan táo", 2, 1);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Xài được", 1, 1);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Máy hơi nóng", 2, 2);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Điện thoại chạy chia màng hình hơi giật", 1, 2);
INSERT INTO Feedbacks(fb_content, prod_no, cus_no) VALUES("Fan táo", 2, 1);

INSERT INTO Images(prod_no) VALUES(1);
INSERT INTO Images(prod_no) VALUES(2);
INSERT INTO Images(prod_no) VALUES(3);
INSERT INTO Images(prod_no) VALUES(4);
INSERT INTO Images(prod_no) VALUES(5);
INSERT INTO Images(prod_no) VALUES(6);
INSERT INTO Images(prod_no) VALUES(7);

INSERT INTO Replies (rep_content, mod_no, fb_no) VALUES('Cảm ơn anh đã ủng hộ', 1, 1);
INSERT INTO Replies (rep_content, mod_no, fb_no) VALUES('Cảm ơn anh đã ủng hộ', 1, 2);
INSERT INTO Replies (rep_content, mod_no, fb_no) VALUES('Cảm ơn anh đã ủng hộ', 1, 3);
INSERT INTO Replies (rep_content, mod_no, fb_no) VALUES('Cảm ơn anh đã ủng hộ', 1, 4);
INSERT INTO Replies (rep_content, mod_no, fb_no) VALUES('Cảm ơn anh đã ủng hộ', 1, 19);
