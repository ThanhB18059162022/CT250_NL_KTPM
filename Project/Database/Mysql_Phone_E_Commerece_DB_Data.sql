USE Phone_E_Commerece_DB;

INSERT INTO Brands(brand_name) VALUES(N'SAMSUNG');
INSERT INTO Brands(brand_name) VALUES(N'iPhone');
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

INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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

INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("4 GB", "64 GB", "50 GB", 3990000, 15, 7, 6);
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("4 GB", "128 GB", "100 GB", 4290000, 15, 7, 6);
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("6 GB", "64 GB", "57 GB", 12990000, 20, 7, 10);
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("6 GB", "128 GB", "121 GB", 14990000, 20, 7, 10);
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("8 GB", "128 GB", "115 GB", 10290000, 25, 15, 12);
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("3 GB", "32 GB", "16 GB", 3490000, 25, 15, 13);
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
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
INSERT INTO products_details(pd_ram, pd_storage, pd_storageAvailable, pd_price, pd_amount, pd_sold, prod_no)
VALUES("12 GB", "256 GB", "245 GB", 21990000, 25, 15, 25);


-- ------------------------------ Quản trị viên -----------------------------------------------------

INSERT INTO Moderators (mod_name, mod_id, mod_phoneNumber, mod_sex, mod_address, mod_role, mod_username, mod_password) 
VALUES ('Administrator', '000000000', '0000000000', '1', N'3/2 Ninh Kiều Cẩn Thơ', '1', "admin", "123456");

INSERT INTO Moderators (mod_name, mod_id, mod_phoneNumber, mod_sex, mod_address, mod_role, mod_username, mod_password) 
VALUES ('Staff-lee', '111111111', '1111111111', '0', N'3/2 Ninh Kiều Cẩn Thơ', '0', "staff", "123456");
