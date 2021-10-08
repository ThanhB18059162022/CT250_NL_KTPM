USE Phone_E_Commerece_DB;

INSERT INTO Brands(brand_name) VALUES(N'SAMSUNG');
INSERT INTO Brands(brand_name) VALUES(N'iPhone');
INSERT INTO Brands(brand_name) VALUES(N'Oppo');
INSERT INTO Brands(brand_name) VALUES(N'Xiaomi');
INSERT INTO Brands(brand_name) VALUES(N'NOKIA');
INSERT INTO Brands(brand_name) VALUES(N'Vsmart');

-- Samsung Galaxy Z Fold3 | Z Flip3 5aG

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
        'Galaxy Z Fold3 | Z Flip3 5aG',
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

INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("12 GB", "256 GB", "223 GB", 41990000, 20, 5, 1);

INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
    'iPhone 12 Pro Ma`1x',
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("6 GB", "128 GB", "113 GB", 32990000, 30, 15, 2);

INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("6 GB", "256 GB", "241 GB", 37490000, 10, 15, 2);

INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
    brand_no) VALUES
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
  3
)

INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("8 GB", "128 GB", "110 GB", 9490000, 20, 9, 3);

