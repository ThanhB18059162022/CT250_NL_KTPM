-- MariaDB dump 10.19  Distrib 10.4.19-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: phone_e_commerece_db
-- ------------------------------------------------------
-- Server version	10.4.19-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `acc_no` int(11) NOT NULL AUTO_INCREMENT,
  `acc_username` varchar(70) NOT NULL,
  `acc_password` char(64) NOT NULL,
  `mod_no` int(11) NOT NULL,
  PRIMARY KEY (`acc_no`),
  UNIQUE KEY `acc_username` (`acc_username`),
  KEY `Accounts_Moderators_FK` (`mod_no`),
  CONSTRAINT `Accounts_Moderators_FK` FOREIGN KEY (`mod_no`) REFERENCES `moderators` (`mod_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `addr_no` int(11) NOT NULL AUTO_INCREMENT,
  `addr_location` varchar(100) DEFAULT NULL,
  `addr_phoneNumber` varchar(12) DEFAULT NULL,
  `cus_no` int(11) NOT NULL,
  PRIMARY KEY (`addr_no`),
  KEY `Addresses_Customers_FK` (`cus_no`),
  CONSTRAINT `Addresses_Customers_FK` FOREIGN KEY (`cus_no`) REFERENCES `customers` (`cus_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bills` (
  `bill_no` int(11) NOT NULL AUTO_INCREMENT,
  `bill_time` datetime NOT NULL DEFAULT current_timestamp(),
  `bill_total` decimal(15,2) NOT NULL DEFAULT 0.00,
  `bill_status` tinyint(1) NOT NULL DEFAULT 0,
  `mod_no` int(11) NOT NULL,
  `order_no` int(11) NOT NULL,
  `addr_no` int(11) NOT NULL,
  PRIMARY KEY (`bill_no`),
  KEY `Bills_Moderators_FK` (`mod_no`),
  KEY `Bills_Orders_FK` (`order_no`),
  KEY `Bills_Addresses_FK` (`addr_no`),
  CONSTRAINT `Bills_Addresses_FK` FOREIGN KEY (`addr_no`) REFERENCES `addresses` (`addr_no`) ON DELETE CASCADE,
  CONSTRAINT `Bills_Moderators_FK` FOREIGN KEY (`mod_no`) REFERENCES `moderators` (`mod_no`) ON DELETE CASCADE,
  CONSTRAINT `Bills_Orders_FK` FOREIGN KEY (`order_no`) REFERENCES `orders` (`order_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `brand_no` int(11) NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(128) NOT NULL,
  PRIMARY KEY (`brand_no`),
  UNIQUE KEY `brand_name` (`brand_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (2,'iPhone'),(5,'NOKIA'),(3,'Oppo'),(8,'Realme'),(1,'SAMSUNG'),(7,'Vivo'),(6,'Vsmart'),(4,'Xiaomi');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `cus_no` int(11) NOT NULL AUTO_INCREMENT,
  `cus_name` varchar(70) DEFAULT NULL,
  `cus_id` char(12) DEFAULT NULL,
  `cus_email` varchar(128) DEFAULT NULL,
  `cus_sex` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`cus_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedbacks` (
  `fb_no` int(11) NOT NULL AUTO_INCREMENT,
  `fb_content` varchar(500) NOT NULL,
  `fb_time` datetime NOT NULL DEFAULT current_timestamp(),
  `prod_no` int(11) NOT NULL,
  `cus_no` int(11) NOT NULL,
  PRIMARY KEY (`fb_no`),
  KEY `Feedbacks_Products_FK` (`prod_no`),
  KEY `Feedbacks_Customers_FK` (`cus_no`),
  CONSTRAINT `Feedbacks_Customers_FK` FOREIGN KEY (`cus_no`) REFERENCES `customers` (`cus_no`) ON DELETE CASCADE,
  CONSTRAINT `Feedbacks_Products_FK` FOREIGN KEY (`prod_no`) REFERENCES `products` (`prod_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `img_no` int(11) NOT NULL AUTO_INCREMENT,
  `img_src` varchar(128) NOT NULL,
  `prod_no` int(11) NOT NULL,
  PRIMARY KEY (`img_no`),
  KEY `Images_Products_FK` (`prod_no`),
  CONSTRAINT `Images_Products_FK` FOREIGN KEY (`prod_no`) REFERENCES `products` (`prod_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moderators`
--

DROP TABLE IF EXISTS `moderators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moderators` (
  `mod_no` int(11) NOT NULL AUTO_INCREMENT,
  `mod_name` varchar(70) NOT NULL,
  `mod_id` char(12) NOT NULL,
  `mod_phoneNumber` varchar(12) NOT NULL,
  `mod_sex` tinyint(1) NOT NULL DEFAULT 0,
  `mod_address` varchar(128) NOT NULL,
  `mod_role` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`mod_no`),
  UNIQUE KEY `mod_id` (`mod_id`),
  UNIQUE KEY `mod_phoneNumber` (`mod_phoneNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moderators`
--

LOCK TABLES `moderators` WRITE;
/*!40000 ALTER TABLE `moderators` DISABLE KEYS */;
/*!40000 ALTER TABLE `moderators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `order_no` int(11) NOT NULL AUTO_INCREMENT,
  `order_time` datetime NOT NULL DEFAULT current_timestamp(),
  `cus_no` int(11) NOT NULL,
  PRIMARY KEY (`order_no`),
  KEY `Orders_Customers_FK` (`cus_no`),
  CONSTRAINT `Orders_Customers_FK` FOREIGN KEY (`cus_no`) REFERENCES `customers` (`cus_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_details`
--

DROP TABLE IF EXISTS `orders_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_details` (
  `order_no` int(11) NOT NULL,
  `pd_no` int(11) NOT NULL,
  `od_quantity` int(11) NOT NULL,
  `od_price` decimal(15,2) NOT NULL,
  PRIMARY KEY (`order_no`,`pd_no`),
  KEY `Orders_Details_Products_Details_FK` (`pd_no`),
  CONSTRAINT `Orders_Details_Carts_FK` FOREIGN KEY (`order_no`) REFERENCES `orders` (`order_no`) ON DELETE CASCADE,
  CONSTRAINT `Orders_Details_Products_Details_FK` FOREIGN KEY (`pd_no`) REFERENCES `products_details` (`pd_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_details`
--

LOCK TABLES `orders_details` WRITE;
/*!40000 ALTER TABLE `orders_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `prod_no` int(11) NOT NULL AUTO_INCREMENT,
  `prod_name` varchar(50) NOT NULL,
  `prod_manufacturer` varchar(1000) NOT NULL,
  `prod_screen` varchar(1000) NOT NULL,
  `prod_camera` varchar(1000) NOT NULL,
  `prod_hardwareAndOS` varchar(1000) NOT NULL,
  `prod_network` varchar(1000) NOT NULL,
  `prod_batteryAndCharger` varchar(1000) NOT NULL,
  `prod_utilities` varchar(1000) NOT NULL,
  `prod_design` varchar(1000) NOT NULL,
  `prod_status` tinyint(1) NOT NULL DEFAULT 0,
  `brand_no` int(11) NOT NULL,
  PRIMARY KEY (`prod_no`),
  UNIQUE KEY `prod_name` (`prod_name`),
  KEY `Products_Brands_FK` (`brand_no`),
  CONSTRAINT `Products_Brands_FK` FOREIGN KEY (`brand_no`) REFERENCES `brands` (`brand_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Galaxy Z Fold3 | Z Flip3 5G','{\"brand_name\":\"Samsung\",\"releaseDate\":\"2021-8-1\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"Dynamic AMOLED 2X\",\"resolution\":\"Full HD+ (1768 x 2208 Pixels)\",\"size\":\"Chính 7.6\' & Phụ 6.2\' - Tần số quét 120 Hz\",\"glass\":\"Kính cường lực Corning Gorilla Glass Victus\"}','{\"rear\":{\"spec\":\"3 camera 12 MP\",\"videoQuality\":\"4K 2160p@60fps, FullHD 1080p@240fps, FullHD 1080p@60fps, HD 720p@960fps\"},\"font\":\"10 MP & 4 MP 8 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"Snapdragon 888 8 nhân\",\"cpuSpec\":\"1 nhân 2.84 GHz, 3 nhân 2.42 GHz & 4 nhân 1.8 GHz\",\"gpu\":\"Adreno 660\"}','{\"telecom\":\"5G\",\"SIM\":\"2 Nano Sim\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS, BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LEv, 5.2\",\"connector\":\"Type-C\",\"others\":\"NFC, OTG\"}','{\"battery\":\"4400 mAh\",\"batteryType\":\"Li-ion\",\"chargeType\":\"25W\"}','[{\"Bảo mật\":\"Mở khoá vân tay cạnh viền\"},{\"Tính năng đặc biệt\":\"Samsung Pay Âm thanh AKG\"},{\"Kháng nước, bụi\":\"IPX8\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung nhôm & Mặt lưng kính cường lực\",\"size\":\"Dài 158.2 mm - Ngang 128.1 mm - Dày 6.4 mm\",\"weight\":\"271 g\"}',0,1),(2,'iPhone 12 Pro Ma`1x','{\"brand_name\":\"Apple\",\"releaseDate\":\"2020-10\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"OLED\",\"resolution\":\"1284 x 2778 Pixels\",\"size\":\"6.7\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực Ceramic Shield\"}','{\"rear\":{\"spec\":\"3 camera 12 MP\",\"videoQuality\":\"4K 2160p@30fps, 4K 2160p@60fps, FullHD 1080p@30fps, HD 720p@30fps, FullHD 1080p@60fps, 4K 2160p@24fps\"},\"font\":\"12 MP\"}','{\"os\":\"iOS 14\",\"cpu\":\"Apple A14 Bionic 6 nhân\",\"cpuSpec\":\"2 nhân 3.1 GHz & 4 nhân 1.8 GHz\",\"gpu\":\"Apple GPU 4 nhân\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"1 Nano SIM & 1 eSIM\",\"Wifi\":\"Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi hotspot, Dual-band (2.4 GHz/5 GHz)\",\"GPS\":\"BDS ,GLONASS, A-GPS\",\"Bluetooth\":\"A2DP, 5.0\",\"connector\":\"Lightning\",\"others\":\"Lightning\"}','{\"battery\":\"3687 mAh\",\"batteryType\":\"Li-ion\",\"chargeType\":\"20W\"}','[{\"Bảo mật\":\"Mở khoá khuôn mặt Face ID\"},{\"Kháng nước, bụi\":\"IP68\"},{\"Ghi âm\":\"Có (microphone chuyên dụng chống ồn)\"},{\"Xem phim\":\"H.264(MPEG4-AVC)\"},{\"Nghe nhạc\":\"Lossless, AAC, MP3, FLAC\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung thép không gỉ & Mặt lưng kính cường lực\",\"size\":\"Dài 160.8 mm - Ngang 78.1 mm - Dày 7.4 mm\",\"weight\":\"228 g\"}',0,2),(3,'OPPO Reno6 Z 5G','{\"brand_name\":\"Oppo\",\"releaseDate\":\"2021-7\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"AMOLED\",\"resolution\":\"Full HD+ (1080 x 2400 Pixels)\",\"size\":\"6.43\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực Corning Gorilla Glass 5\"}','{\"rear\":{\"spec\":\"Chính 64 MP & Phụ 8 MP, 2 MP\",\"videoQuality\":\"4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@30fps\"},\"font\":\"32 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Dimensity 800U 5G 8 nhân\",\"cpuSpec\":\"2 nhân 2.4 GHz & 6 nhân 2 GHz\",\"gpu\":\"Mali-G57 MC3\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS ,BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LE, v5.1\",\"connector\":\"Type-C\",\"others\":\"OTG\"}','{\"battery\":\"4310 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"30W\"}','[{\"Bảo mật nâng cao\":\"Mở khoá khuôn mặt, Mở khoá vân tay dưới màn hình\"},{\"Tính năng đặt biệt\":\"Chạm 2 lần sáng màn hình, Ứng dụng kép (Nhân bản ứng dụng)\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Ghi âm\":\"Có\"},{\"Raido\":\"Có\"},{\"Xem phim\":\"3GP, AVI, MP4, WMV\"},{\"Nghe nhạc\":\"AAC, AMR, MP3, WAV, WMA\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung hợp kim & Mặt lưng thuỷ tinh hữu cơ\",\"size\":\"Dài 160.2 mm - Ngang 73.38 mm - Dày 7.97 mm\",\"weight\":\"Nặng 173 g\"}',0,3),(4,'Xiaomi POCO X3 Pro NFC 8GB-256GB','{\"brand_name\":\"Xiaomi\",\"releaseDate\":\"2021-4\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"Full HD+ (1080 x 2400 Pixels)\",\"size\":\"6.67\'\",\"glass\":\"Kính cường lực Corning Gorilla Glass 6\"}','{\"rear\":{\"spec\":\"Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP\",\"videoQuality\":\"4K 2160p@30fps, FullHD 1080p@30fps, FullHD 1080p@60fps\"},\"font\":\"20 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"Snapdragon 860 8 nhân\",\"cpuSpec\":\"1 nhân 2.96 GHz, 3 nhân 2.42 GHz & 4 nhân 1.8 GHz\",\"gpu\":\"Adreno 640\"}','{\"telecom\":\"Hỗ trợ 4G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS ,BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LE, v5.0\",\"connector\":\"Type-C\",\"others\":\"NFC, OTG\"}','{\"battery\":\"5160 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"33W\"}','[{\"Bảo mật nâng cao\":\"Mở khoá vân tay\"},{\"Tính năng đặt biệt\":\"Chạm 2 lần sáng màn hình, Ứng dụng kép (Nhân bản ứng dụng)\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Ghi âm\":\"Có\"},{\"Raido\":\"Có\"},{\"Xem phim\":\"Có\"},{\"Nghe nhạc\":\"Có\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Đang cập nhật\",\"size\":\"Dài 165.3 mm - Ngang 76.8 mm - Dày 9.4 mm\",\"weight\":\"Nặn ng 215 g\"}',0,4),(5,'Nokia C30 3GB-32GB','{\"brand_name\":\"Nokia\",\"releaseDate\":\"2021-8\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"HD+ (720 x 1600 Pixels)\",\"size\":\"6.82\' - Tần số quét 60 Hz\",\"glass\":\"Mặt kính cong 2.5D\"}','{\"rear\":{\"spec\":\"Chính 13 MP & Phụ 2 MP\",\"videoQuality\":\"FullHD 1080p@30fpsHD, 720p@30fps\"},\"font\":\"5 MP\"}','{\"os\":\"Android 11 (Go Edition)\",\"cpu\":\"Spreadtrum SC9863A 8 nhân\",\"cpuSpec\":\"4 nhân 1.6 GHz & 4 nhân 1.2 GHz\",\"gpu\":\"IMG PowerVR GE8322\"}','{\"telecom\":\"Hỗ trợ 4G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Wi-Fi 802.11 a/b/g/n, Wi-Fi hotspot\",\"GPS\":\"A-GPS\",\"Bluetooth\":\"A2DP, v4.2\",\"connector\":\"Micro USB\",\"others\":\"Jack 3.5mm\"}','{\"battery\":\"6000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"10W\"}','[{\"Bảo mật nâng cao\":\"Mở khoá khuôn mặt, Mở khóa bằng vân tay\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Ghi âm\":\"Có\"},{\"Raido\":\"Có\"},{\"Xem phim\":\"MP4\"},{\"Nghe nhạc\":\"MP3, WAV\"}]','{\"structural\":\"Pin liền\",\"material\":\"Khung & Mặt lưng nhựa Polycarbonate\",\"size\":\"Dài 177.7 mm - Ngang 79.1 mm - Dày 9.9 mm\",\"weight\":\"Nặng 237 g\"}',0,5),(6,'Xiaomi Redmi 10','{\"brand_name\":\"Xiaomi\",\"releaseDate\":\"2021-8\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"Full HD+ (1080 x 2400 Pixels)\",\"size\":\"6.5\' - Tần số quét 90 Hz\",\"glass\":\"Kính cường lực Corning Gorilla Glass 3\"}','{\"rear\":{\"spec\":\"Chính 50 MP & Phụ 8 MP, 2 MP, 2 MP\",\"videoQuality\":\"FullHD 1080p@30fps, HD 720p@30fps\"},\"font\":\"8 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Helio G88 8 nhân\",\"cpuSpec\":\"2 nhân 2.0 GHz & 6 nhân 1.8 GHz\",\"gpu\":\"Mali-G52 MC2\"}','{\"telecom\":\"Hỗ trợ 4G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS, BDS, GLONASS\",\"Bluetooth\":\"v5.1\",\"connector\":\"Type-C\",\"others\":\"Hồng ngoại, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"20W\"}','[{\"Bảo mật nâng cao\":\"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền\"},{\"Tính năng đặc biệt\":\"Loa kép\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Xem phim\":\"AVI, MP4\"},{\"Nghe nhạc\":\"FLAC, Midi, MP3, OGG\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung & Mặt lưng nhựa\",\"size\":\"Dài 161 mm - Ngang 75.53 mm - Dày 8.92 mm\",\"weight\":\"Nặng 181 g\"}',0,4),(7,'Samsung Galaxy Note 20 Ultra','{\"brand_name\":\"Samsung\",\"releaseDate\":\"2020-8\",\"madeIn\":\"Việt Nam\"}','{\"type\":\"Dynamic AMOLED 2X\",\"resolution\":\"2K+ (1440 x 3088 Pixels)\",\"size\":\"6.9\' - Tần số quét 120 Hz\",\"glass\":\"Kính cường lực Corning Gorilla Glass Victus\"}','{\"rear\":{\"spec\":\"Chính 108 MP & Phụ 12 MP, 12 MP, cảm biến Laser AF\",\"videoQuality\":\"8K 4320p@24fps\"},\"font\":\"10 MP\"}','{\"os\":\"Android 10\",\"cpu\":\"Exynos 990 8 nhân\",\"cpuSpec\":\"2 nhân 2.73 GHz, 2 nhân 2.5 GHz & 4 nhân 2.0 Ghz\",\"gpu\":\"Mali-G77 MP11\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"2 Nano SIM hoặc 1 Nano SIM + 1 eSIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS, BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LEv, 5.2\",\"connector\":\"2 đầu Type-C\",\"others\":\"NFC, OTG\"}','{\"battery\":\"4500 mAh\",\"batteryType\":\"Li-ion\",\"chargeType\":\"25W\"}','[{\"Bảo mật\":\"Mở khoá khuôn mặt, Mở khoá vân tay dưới màn hình\"},{\"Tính năng đặc biệt\":\"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio\"},{\"Kháng nước, bụi\":\"IP68\"},{\"Ghi âm\":\"Có (microphone chuyên dụng chống ồn)\"},{\"Xem phim\":\"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid\"},{\"Nghe nhạc\":\"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung nhôm & Mặt lưng kính cường lực\",\"size\":\"Dài 164.8 mm - Ngang 77.2 mm - Dày 8.1 mm\",\"weight\":\"208 g\"}',0,1),(8,'Vsmart Aris','{\"brand_name\":\"Vsmart\",\"releaseDate\":\"2018-1\",\"madeIn\":\"Việt Nam\"}','{\"type\":\"AMOLED\",\"resolution\":\"Full HD+ (1080 x 2340 Pixels)\",\"size\":\"6.39\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực Corning Gorilla Glass 5\"}','{\"rear\":{\"spec\":\"Chính 64 MP & Phụ 8 MP, 8 MP, 2 MP\",\"videoQuality\":\"4K 2160p@30fps, HD 720p@240fps\"},\"font\":\"20 MP\"}','{\"os\":\"Android 10\",\"cpu\":\"Snapdragon 730 8 nhân\",\"cpuSpec\":\"2 nhân 2.2 GHz & 6 nhân 1.8 GHz\",\"gpu\":\"Adreno 618\"}','{\"telecom\":\"Hỗ trợ 4G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac\",\"GPS\":\"A-GPS\",\"Bluetooth\":\"v5.0\",\"connector\":\"Type-C\",\"others\":\"OTG\"}','{\"battery\":\"4000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"18W\"}','[{\"Bảo mật\":\"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền\"},{\"Tính năng đặc biệt\":\"Chặn cuộc gọi, Chặn tin nhắn, Trợ lý ảo Google Assistant, Ghi âm cuộc gọi, Ứng dụng kép (Nhân bản ứng dụng), Tối ưu game (Chế độ trò chơi), Ứng dụng kép, Không gian thứ hai (Không gian riêng tư)\"},{\"Kháng nước, bụi\":\"IP52\"},{\"Ghi âm\":\"Có\"},{\"Xem phim\":\"AVI, MP4\"},{\"Nghe nhạc\":\"AAC, AMR, FLAC, MP3, Midi, WAV\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung kim loại & Mặt lưng kính\",\"size\":\"Dài 156.2 mm - Ngang 75.04 mm - Dày 8.55 mm \",\"weight\":\"178 g\"}',0,6),(9,'Samsung Galaxy A22 5G','{\"brand_name\":\"Samsung\",\"releaseDate\":\"2021-6\",\"madeIn\":\"Việt Nam\"}','{\"type\":\"TFT LCD\",\"resolution\":\"Full HD+ (1080 x 2400 Pixels)\",\"size\":\"6.6\' - Tần số quét 90 Hz\",\"glass\":\"Kính cường lực Corning Gorilla 4\"}','{\"rear\":{\"spec\":\"Chính 48 MP & Phụ 5 MP, 2 MP\",\"videoQuality\":\"FullHD 1080p@30fps\"},\"font\":\"8 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Dimensity 700 5G 8 nhân\",\"cpuSpec\":\"2 nhân 2.2 GHz & 6 nhân 2.0 GHz\",\"gpu\":\"Mali-G57 MC2\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS, BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LEv, 5.2\",\"connector\":\"2 đầu Type-C\",\"others\":\"NFC, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"15W\"}','[{\"Bảo mật\":\"Mở khoá vân tay cạnh\"},{\"Tính năng đặc biệt\":\"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio\"},{\"Kháng nước, bụi\":\"IP68\"},{\"Ghi âm\":\"Có (microphone chuyên dụng chống ồn)\"},{\"Xem phim\":\"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid\"},{\"Nghe nhạc\":\"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung nhôm & Mặt lưng kính cường lực\",\"size\":\"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm \",\"weight\":\"203 g\"}',0,1),(10,'iPhone XR','{\"brand_name\":\"Apple\",\"releaseDate\":\"2018-9\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"828 x 1792 Pixels\",\"size\":\"6.1\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực Oleophobic (ion cường lực)\"}','{\"rear\":{\"spec\":\"12 MP\",\"videoQuality\":\"4K 2160p@30fps, 4K 2160p@60fps, FullHD 1080p@30fps, HD 720p@30fps, FullHD 1080p@60fps, 4K 2160p@24fps\"},\"font\":\"7 MP\"}','{\"os\":\"iOS 14\",\"cpu\":\"Apple A12 Bionic 6 nhân\",\"cpuSpec\":\"2 nhân 2.5 GHz & 4 nhân 1.6 GHz\",\"gpu\":\"Apple GPU 4 nhân\"}','{\"telecom\":\"Hỗ trợ 4G\",\"SIM\":\"1 Nano SIM & 1 eSIM\",\"Wifi\":\"Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi hotspot, Dual-band (2.4 GHz/5 GHz)\",\"GPS\":\"BDS ,GLONASS, A-GPS\",\"Bluetooth\":\"A2DP, 5.0\",\"connector\":\"Lightning\",\"others\":\"Lightning, NFC\"}','{\"battery\":\"2942 mAh\",\"batteryType\":\"Li-ion\",\"chargeType\":\"15W\"}','[{\"Bảo mật\":\"Mở khoá khuôn mặt Face ID\"},{\"Tính năng đặc biệt\":\"Apple Pay\"},{\"Kháng nước, bụi\":\"IP67\"},{\"Ghi âm\":\"Có (microphone chuyên dụng chống ồn)\"},{\"Xem phim\":\"H.264(MPEG4-AVC)\"},{\"Nghe nhạc\":\"Lossless, AAC, MP3, FLAC\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung nhôm & Mặt lưng kính cường lực\",\"size\":\"Dài 150.9 mm - Ngang 75.7 mm - Dày 8.3 mm\",\"weight\":\"194 g\"}',0,2),(11,'Vivo Y21','{\"brand_name\":\"Vivo\",\"releaseDate\":\"2021-8\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"HD+ (720 x 1600 Pixels)\",\"size\":\"6.51\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực\"}','{\"rear\":{\"spec\":\"Chính 13 MP & Phụ 2 MP\",\"videoQuality\":\"FullHD 1080p@30fps, HD 720p@30fps\"},\"font\":\"8 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Helio P35 8 nhân\",\"cpuSpec\":\"4 nhân 2.3 GHz & 4 nhân 1.8 GHz\",\"gpu\":\"IMG PowerVR GE8320\"}','{\"telecom\":\"Hỗ trợ 4G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi hotspot, Dual-band (2.4 GHz/5 GHz)\",\"GPS\":\"BDS ,GLONASS, A-GPS\",\"Bluetooth\":\"A2DP, 5.0\",\"connector\":\"Lightning\",\"others\":\"Lightning, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"18W\"}','[{\"Bảo mật\":\"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Ghi âm\":\"Có\"},{\"Xem phim\":\"3GP\"},{\"Nghe nhạc\":\"MP3\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung & Mặt lưng nhựa Polycarbonate\",\"size\":\"Dài 164.26 mm - Ngang 76.08 mm - Dày 8 mm\",\"weight\":\"182 g\"}',0,7),(12,'Samsung Galaxy A52s 5G','{\"brand_name\":\"Samsung\",\"releaseDate\":\"2021-6\",\"madeIn\":\"Việt Nam\"}','{\"type\":\"TFT LCD\",\"resolution\":\"Full HD+ (1080 x 2400 Pixels)\",\"size\":\"6.6\' - Tần số quét 90 Hz\",\"glass\":\"Kính cường lực Corning Gorilla 4\"}','{\"rear\":{\"spec\":\"Chính 48 MP & Phụ 5 MP, 2 MP\",\"videoQuality\":\"FullHD 1080p@30fps\"},\"font\":\"8 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Dimensity 700 5G 8 nhân\",\"cpuSpec\":\"2 nhân 2.2 GHz & 6 nhân 2.0 GHz\",\"gpu\":\"Mali-G57 MC2\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS, BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LEv, 5.2\",\"connector\":\"2 đầu Type-C\",\"others\":\"NFC, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"15W\"}','[{\"Bảo mật\":\"Mở khoá vân tay cạnh\"},{\"Tính năng đặc biệt\":\"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio\"},{\"Kháng nước, bụi\":\"IP68\"},{\"Ghi âm\":\"Có (microphone chuyên dụng chống ồn)\"},{\"Xem phim\":\"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid\"},{\"Nghe nhạc\":\"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung nhôm & Mặt lưng kính cường lực\",\"size\":\"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm \",\"weight\":\"203 g\"}',0,1),(13,'Realme C21y','{\"brand_name\":\"Realme\",\"releaseDate\":\"2021-6\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"HD+ (720 x 1600 Pixels)\",\"size\":\"6.5\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực\"}','{\"rear\":{\"spec\":\"Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP\",\"videoQuality\":\" 4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@240fps\"},\"font\":\"32 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"Snapdragon 778G 5G 8 nhân\",\"cpuSpec\":\"1 nhân 2.4 GHz, 3 nhân 2.2 GHz & 4 nhân 1.9 GHz\",\"gpu\":\"Mali-G57 MC2\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS, BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LEv, 5.2\",\"connector\":\"2 đầu Type-C\",\"others\":\"NFC, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"15W\"}','[{\"Bảo mật\":\"Mở khoá vân tay cạnh\"},{\"Tính năng đặc biệt\":\"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio\"},{\"Kháng nước, bụi\":\"IP68\"},{\"Ghi âm\":\"Có (microphone chuyên dụng chống ồn)\"},{\"Xem phim\":\"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid\"},{\"Nghe nhạc\":\"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung nhôm & Mặt lưng kính cường lực\",\"size\":\"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm \",\"weight\":\"203 g\"}',0,8),(14,'OPPO A54','{\"brand_name\":\"Oppo\",\"releaseDate\":\"2021-7\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"AMOLED\",\"resolution\":\"Full HD+ (1080 x 2400 Pixels)\",\"size\":\"6.43\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực Corning Gorilla Glass 5\"}','{\"rear\":{\"spec\":\"Chính 64 MP & Phụ 8 MP, 2 MP\",\"videoQuality\":\"4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@30fps\"},\"font\":\"32 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Dimensity 800U 5G 8 nhân\",\"cpuSpec\":\"2 nhân 2.4 GHz & 6 nhân 2 GHz\",\"gpu\":\"Mali-G57 MC3\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS ,BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LE, v5.1\",\"connector\":\"Type-C\",\"others\":\"OTG\"}','{\"battery\":\"4310 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"30W\"}','[{\"Bảo mật nâng cao\":\"Mở khoá khuôn mặt, Mở khoá vân tay dưới màn hình\"},{\"Tính năng đặt biệt\":\"Chạm 2 lần sáng màn hình, Ứng dụng kép (Nhân bản ứng dụng)\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Ghi âm\":\"Có\"},{\"Raido\":\"Có\"},{\"Xem phim\":\"3GP, AVI, MP4, WMV\"},{\"Nghe nhạc\":\"AAC, AMR, MP3, WAV, WMA\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung hợp kim & Mặt lưng thuỷ tinh hữu cơ\",\"size\":\"Dài 160.2 mm - Ngang 73.38 mm - Dày 7.97 mm\",\"weight\":\"Nặng 173 g\"}',0,3),(15,'Samsung Galaxy S20 FE','{\"brand_name\":\"Samsung\",\"releaseDate\":\"2021-6\",\"madeIn\":\"Việt Nam\"}','{\"type\":\"TFT LCD\",\"resolution\":\"Full HD+ (1080 x 2400 Pixels)\",\"size\":\"6.6\' - Tần số quét 90 Hz\",\"glass\":\"Kính cường lực Corning Gorilla 4\"}','{\"rear\":{\"spec\":\"Chính 48 MP & Phụ 5 MP, 2 MP\",\"videoQuality\":\"FullHD 1080p@30fps\"},\"font\":\"8 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Dimensity 700 5G 8 nhân\",\"cpuSpec\":\"2 nhân 2.2 GHz & 6 nhân 2.0 GHz\",\"gpu\":\"Mali-G57 MC2\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS, BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LEv, 5.2\",\"connector\":\"2 đầu Type-C\",\"others\":\"NFC, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"15W\"}','[{\"Bảo mật\":\"Mở khoá vân tay cạnh\"},{\"Tính năng đặc biệt\":\"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio\"},{\"Kháng nước, bụi\":\"IP68\"},{\"Ghi âm\":\"Có (microphone chuyên dụng chống ồn)\"},{\"Xem phim\":\"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid\"},{\"Nghe nhạc\":\"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung nhôm & Mặt lưng kính cường lực\",\"size\":\"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm \",\"weight\":\"203 g\"}',0,1),(16,'Xiaomi Redmi Note 10S','{\"brand_name\":\"Xiaomi\",\"releaseDate\":\"2021-8\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"Full HD+ (1080 x 2400 Pixels)\",\"size\":\"6.5\' - Tần số quét 90 Hz\",\"glass\":\"Kính cường lực Corning Gorilla Glass 3\"}','{\"rear\":{\"spec\":\"Chính 50 MP & Phụ 8 MP, 2 MP, 2 MP\",\"videoQuality\":\"FullHD 1080p@30fps, HD 720p@30fps\"},\"font\":\"8 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Helio G88 8 nhân\",\"cpuSpec\":\"2 nhân 2.0 GHz & 6 nhân 1.8 GHz\",\"gpu\":\"Mali-G52 MC2\"}','{\"telecom\":\"Hỗ trợ 4G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS, BDS, GLONASS\",\"Bluetooth\":\"v5.1\",\"connector\":\"Type-C\",\"others\":\"Hồng ngoại, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"20W\"}','[{\"Bảo mật nâng cao\":\"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền\"},{\"Tính năng đặc biệt\":\"Loa kép\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Xem phim\":\"AVI, MP4\"},{\"Nghe nhạc\":\"FLAC, Midi, MP3, OGG\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung & Mặt lưng nhựa\",\"size\":\"Dài 161 mm - Ngang 75.53 mm - Dày 8.92 mm\",\"weight\":\"Nặng 181 g\"}',0,4),(17,'Vivo Y12s','{\"brand_name\":\"Vivo\",\"releaseDate\":\"2021-8\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"HD+ (720 x 1600 Pixels)\",\"size\":\"6.51\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực\"}','{\"rear\":{\"spec\":\"Chính 13 MP & Phụ 2 MP\",\"videoQuality\":\"FullHD 1080p@30fps, HD 720p@30fps\"},\"font\":\"8 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Helio P35 8 nhân\",\"cpuSpec\":\"4 nhân 2.3 GHz & 4 nhân 1.8 GHz\",\"gpu\":\"IMG PowerVR GE8320\"}','{\"telecom\":\"Hỗ trợ 4G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi hotspot, Dual-band (2.4 GHz/5 GHz)\",\"GPS\":\"BDS ,GLONASS, A-GPS\",\"Bluetooth\":\"A2DP, 5.0\",\"connector\":\"Lightning\",\"others\":\"Lightning, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"18W\"}','[{\"Bảo mật\":\"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Ghi âm\":\"Có\"},{\"Xem phim\":\"3GP\"},{\"Nghe nhạc\":\"MP3\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung & Mặt lưng nhựa Polycarbonate\",\"size\":\"Dài 164.26 mm - Ngang 76.08 mm - Dày 8 mm\",\"weight\":\"182 g\"}',0,7),(18,'Realme C20','{\"brand_name\":\"Realme\",\"releaseDate\":\"2021-6\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"HD+ (720 x 1600 Pixels)\",\"size\":\"6.5\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực\"}','{\"rear\":{\"spec\":\"Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP\",\"videoQuality\":\" 4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@240fps\"},\"font\":\"32 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"Snapdragon 778G 5G 8 nhân\",\"cpuSpec\":\"1 nhân 2.4 GHz, 3 nhân 2.2 GHz & 4 nhân 1.9 GHz\",\"gpu\":\"Mali-G57 MC2\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS, BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LEv, 5.2\",\"connector\":\"2 đầu Type-C\",\"others\":\"NFC, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"15W\"}','[{\"Bảo mật\":\"Mở khoá vân tay cạnh\"},{\"Tính năng đặc biệt\":\"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio\"},{\"Kháng nước, bụi\":\"IP68\"},{\"Ghi âm\":\"Có (microphone chuyên dụng chống ồn)\"},{\"Xem phim\":\"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid\"},{\"Nghe nhạc\":\"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung nhôm & Mặt lưng kính cường lực\",\"size\":\"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm \",\"weight\":\"203 g\"}',0,8),(19,'Vivo V21 5G','{\"brand_name\":\"Vivo\",\"releaseDate\":\"2021-8\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"HD+ (720 x 1600 Pixels)\",\"size\":\"6.51\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực\"}','{\"rear\":{\"spec\":\"Chính 13 MP & Phụ 2 MP\",\"videoQuality\":\"FullHD 1080p@30fps, HD 720p@30fps\"},\"font\":\"8 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Helio P35 8 nhân\",\"cpuSpec\":\"4 nhân 2.3 GHz & 4 nhân 1.8 GHz\",\"gpu\":\"IMG PowerVR GE8320\"}','{\"telecom\":\"Hỗ trợ 4G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Wi-Fi 802.11 a/b/g/n/ac/ax, Wi-Fi hotspot, Dual-band (2.4 GHz/5 GHz)\",\"GPS\":\"BDS ,GLONASS, A-GPS\",\"Bluetooth\":\"A2DP, 5.0\",\"connector\":\"Lightning\",\"others\":\"Lightning, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"18W\"}','[{\"Bảo mật\":\"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Ghi âm\":\"Có\"},{\"Xem phim\":\"3GP\"},{\"Nghe nhạc\":\"MP3\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung & Mặt lưng nhựa Polycarbonate\",\"size\":\"Dài 164.26 mm - Ngang 76.08 mm - Dày 8 mm\",\"weight\":\"182 g\"}',0,7),(20,'Xiaomi Redmi 9C','{\"brand_name\":\"Xiaomi\",\"releaseDate\":\"2021-8\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"Full HD+ (1080 x 2400 Pixels)\",\"size\":\"6.5\' - Tần số quét 90 Hz\",\"glass\":\"Kính cường lực Corning Gorilla Glass 3\"}','{\"rear\":{\"spec\":\"Chính 50 MP & Phụ 8 MP, 2 MP, 2 MP\",\"videoQuality\":\"FullHD 1080p@30fps, HD 720p@30fps\"},\"font\":\"8 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Helio G88 8 nhân\",\"cpuSpec\":\"2 nhân 2.0 GHz & 6 nhân 1.8 GHz\",\"gpu\":\"Mali-G52 MC2\"}','{\"telecom\":\"Hỗ trợ 4G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS, BDS, GLONASS\",\"Bluetooth\":\"v5.1\",\"connector\":\"Type-C\",\"others\":\"Hồng ngoại, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"20W\"}','[{\"Bảo mật nâng cao\":\"Mở khoá khuôn mặt, Mở khoá vân tay cạnh viền\"},{\"Tính năng đặc biệt\":\"Loa kép\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Xem phim\":\"AVI, MP4\"},{\"Nghe nhạc\":\"FLAC, Midi, MP3, OGG\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung & Mặt lưng nhựa\",\"size\":\"Dài 161 mm - Ngang 75.53 mm - Dày 8.92 mm\",\"weight\":\"Nặng 181 g\"}',0,4),(21,'Realme 8','{\"brand_name\":\"Realme\",\"releaseDate\":\"2021-6\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"HD+ (720 x 1600 Pixels)\",\"size\":\"6.5\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực\"}','{\"rear\":{\"spec\":\"Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP\",\"videoQuality\":\" 4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@240fps\"},\"font\":\"32 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"Snapdragon 778G 5G 8 nhân\",\"cpuSpec\":\"1 nhân 2.4 GHz, 3 nhân 2.2 GHz & 4 nhân 1.9 GHz\",\"gpu\":\"Mali-G57 MC2\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS, BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LEv, 5.2\",\"connector\":\"2 đầu Type-C\",\"others\":\"NFC, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"15W\"}','[{\"Bảo mật\":\"Mở khoá vân tay cạnh\"},{\"Tính năng đặc biệt\":\"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio\"},{\"Kháng nước, bụi\":\"IP68\"},{\"Ghi âm\":\"Có (microphone chuyên dụng chống ồn)\"},{\"Xem phim\":\"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid\"},{\"Nghe nhạc\":\"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung nhôm & Mặt lưng kính cường lực\",\"size\":\"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm \",\"weight\":\"203 g\"}',0,8),(22,'OPPO A74','{\"brand_name\":\"Oppo\",\"releaseDate\":\"2021-7\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"AMOLED\",\"resolution\":\"Full HD+ (1080 x 2400 Pixels)\",\"size\":\"6.43\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực Corning Gorilla Glass 5\"}','{\"rear\":{\"spec\":\"Chính 64 MP & Phụ 8 MP, 2 MP\",\"videoQuality\":\"4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@30fps\"},\"font\":\"32 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Dimensity 800U 5G 8 nhân\",\"cpuSpec\":\"2 nhân 2.4 GHz & 6 nhân 2 GHz\",\"gpu\":\"Mali-G57 MC3\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS ,BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LE, v5.1\",\"connector\":\"Type-C\",\"others\":\"OTG\"}','{\"battery\":\"4310 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"30W\"}','[{\"Bảo mật nâng cao\":\"Mở khoá khuôn mặt, Mở khoá vân tay dưới màn hình\"},{\"Tính năng đặt biệt\":\"Chạm 2 lần sáng màn hình, Ứng dụng kép (Nhân bản ứng dụng)\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Ghi âm\":\"Có\"},{\"Raido\":\"Có\"},{\"Xem phim\":\"3GP, AVI, MP4, WMV\"},{\"Nghe nhạc\":\"AAC, AMR, MP3, WAV, WMA\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung hợp kim & Mặt lưng thuỷ tinh hữu cơ\",\"size\":\"Dài 160.2 mm - Ngang 73.38 mm - Dày 7.97 mm\",\"weight\":\"Nặng 173 g\"}',0,3),(23,'Nokia 5.4','{\"brand_name\":\"Nokia\",\"releaseDate\":\"2021-8\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"IPS LCD\",\"resolution\":\"HD+ (720 x 1600 Pixels)\",\"size\":\"6.82\' - Tần số quét 60 Hz\",\"glass\":\"Mặt kính cong 2.5D\"}','{\"rear\":{\"spec\":\"Chính 13 MP & Phụ 2 MP\",\"videoQuality\":\"FullHD 1080p@30fpsHD, 720p@30fps\"},\"font\":\"5 MP\"}','{\"os\":\"Android 11 (Go Edition)\",\"cpu\":\"Spreadtrum SC9863A 8 nhân\",\"cpuSpec\":\"4 nhân 1.6 GHz & 4 nhân 1.2 GHz\",\"gpu\":\"IMG PowerVR GE8322\"}','{\"telecom\":\"Hỗ trợ 4G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Wi-Fi 802.11 a/b/g/n, Wi-Fi hotspot\",\"GPS\":\"A-GPS\",\"Bluetooth\":\"A2DP, v4.2\",\"connector\":\"Micro USB\",\"others\":\"Jack 3.5mm\"}','{\"battery\":\"6000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"10W\"}','[{\"Bảo mật nâng cao\":\"Mở khoá khuôn mặt, Mở khóa bằng vân tay\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Ghi âm\":\"Có\"},{\"Raido\":\"Có\"},{\"Xem phim\":\"MP4\"},{\"Nghe nhạc\":\"MP3, WAV\"}]','{\"structural\":\"Pin liền\",\"material\":\"Khung & Mặt lưng nhựa Polycarbonate\",\"size\":\"Dài 177.7 mm - Ngang 79.1 mm - Dày 9.9 mm\",\"weight\":\"Nặng 237 g\"}',0,5),(24,'Samsung Galaxy S20 Ultra','{\"brand_name\":\"Samsung\",\"releaseDate\":\"2021-6\",\"madeIn\":\"Việt Nam\"}','{\"type\":\"TFT LCD\",\"resolution\":\"Full HD+ (1080 x 2400 Pixels)\",\"size\":\"6.6\' - Tần số quét 90 Hz\",\"glass\":\"Kính cường lực Corning Gorilla 4\"}','{\"rear\":{\"spec\":\"Chính 48 MP & Phụ 5 MP, 2 MP\",\"videoQuality\":\"FullHD 1080p@30fps\"},\"font\":\"8 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Dimensity 700 5G 8 nhân\",\"cpuSpec\":\"2 nhân 2.2 GHz & 6 nhân 2.0 GHz\",\"gpu\":\"Mali-G57 MC2\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS, BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LEv, 5.2\",\"connector\":\"2 đầu Type-C\",\"others\":\"NFC, OTG\"}','{\"battery\":\"5000 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"15W\"}','[{\"Bảo mật\":\"Mở khoá vân tay cạnh\"},{\"Tính năng đặc biệt\":\"Chặn cuộc gọi, Chặn tin nhắn ,Màn hình luôn hiển thị AOD, Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC) ,Samsung Pay,Trợ lý ảo Samsung Bixby, Âm thanh AKG, Âm thanh Dolby Audio\"},{\"Kháng nước, bụi\":\"IP68\"},{\"Ghi âm\":\"Có (microphone chuyên dụng chống ồn)\"},{\"Xem phim\":\"3GP, AVI, DivX, H.263, H.264(MPEG4-AVC), H.265, MP4, Xvid\"},{\"Nghe nhạc\":\"AAC++, AMR, FLAC, MP3, Midi, WAV, eAAC+\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung nhôm & Mặt lưng kính cường lực\",\"size\":\"Dài 167.2 mm - Ngang 76.4 mm - Dày 9 mm \",\"weight\":\"203 g\"}',0,1),(25,'OPPO Find X3 Pro','{\"brand_name\":\"Oppo\",\"releaseDate\":\"2021-7\",\"madeIn\":\"Trung Quốc\"}','{\"type\":\"AMOLED\",\"resolution\":\"Full HD+ (1080 x 2400 Pixels)\",\"size\":\"6.43\' - Tần số quét 60 Hz\",\"glass\":\"Kính cường lực Corning Gorilla Glass 5\"}','{\"rear\":{\"spec\":\"Chính 64 MP & Phụ 8 MP, 2 MP\",\"videoQuality\":\"4K 2160p@30fps, FullHD 1080p@30fps, HD 720p@30fps\"},\"font\":\"32 MP\"}','{\"os\":\"Android 11\",\"cpu\":\"MediaTek Dimensity 800U 5G 8 nhân\",\"cpuSpec\":\"2 nhân 2.4 GHz & 6 nhân 2 GHz\",\"gpu\":\"Mali-G57 MC3\"}','{\"telecom\":\"Hỗ trợ 5G\",\"SIM\":\"2 Nano SIM\",\"Wifi\":\"Dual-band (2.4 GHz/5 GHz), Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi Direct, Wi-Fi hotspot\",\"GPS\":\"A-GPS ,BDS, GALILEO, GLONASS\",\"Bluetooth\":\"A2DP, LE, v5.1\",\"connector\":\"Type-C\",\"others\":\"OTG\"}','{\"battery\":\"4310 mAh\",\"batteryType\":\"Li-Po\",\"chargeType\":\"30W\"}','[{\"Bảo mật nâng cao\":\"Mở khoá khuôn mặt, Mở khoá vân tay dưới màn hình\"},{\"Tính năng đặt biệt\":\"Chạm 2 lần sáng màn hình, Ứng dụng kép (Nhân bản ứng dụng)\"},{\"Kháng nước, bụi\":\"Không có\"},{\"Ghi âm\":\"Có\"},{\"Raido\":\"Có\"},{\"Xem phim\":\"3GP, AVI, MP4, WMV\"},{\"Nghe nhạc\":\"AAC, AMR, MP3, WAV, WMA\"}]','{\"structural\":\"Nguyên khối\",\"material\":\"Khung hợp kim & Mặt lưng thuỷ tinh hữu cơ\",\"size\":\"Dài 160.2 mm - Ngang 73.38 mm - Dày 7.97 mm\",\"weight\":\"Nặng 173 g\"}',0,3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_details`
--

DROP TABLE IF EXISTS `products_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_details` (
  `pd_no` int(11) NOT NULL AUTO_INCREMENT,
  `pd_ram` varchar(10) NOT NULL,
  `pd_storage` varchar(10) NOT NULL,
  `pd_storageAvailable` varchar(10) NOT NULL,
  `pd_price` decimal(15,2) NOT NULL,
  `pd_amount` int(11) NOT NULL,
  `pd_sold` int(11) NOT NULL,
  `prod_no` int(11) NOT NULL,
  PRIMARY KEY (`pd_no`),
  KEY `Products_Details_Products_FK` (`prod_no`),
  CONSTRAINT `Products_Details_Products_FK` FOREIGN KEY (`prod_no`) REFERENCES `products` (`prod_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_details`
--

LOCK TABLES `products_details` WRITE;
/*!40000 ALTER TABLE `products_details` DISABLE KEYS */;
INSERT INTO `products_details` VALUES (1,'12 GB','256 GB','223 GB',41990000.00,20,5,1),(2,'12 GB','512 GB','480 GB',44990000.00,20,5,1),(3,'6 GB','128 GB','113 GB',32990000.00,30,15,2),(4,'6 GB','256 GB','241 GB',37490000.00,10,15,2),(5,'6 GB','512 GB','113 GB',42490000.00,10,7,2),(6,'8 GB','128 GB','110 GB',9490000.00,20,9,3),(7,'8 GB','256 GB','...',6990000.00,5,3,4),(8,'3 GB','32 GB','25 GB',2790000.00,5,3,5),(9,'4 GB','64 GB','50 GB',3990000.00,15,7,6),(10,'4 GB','128 GB','100 GB',4290000.00,15,7,6),(11,'6 GB','128 GB','100 GB',4690000.00,15,7,6),(12,'12 GB','256 GB','223 GB',18999000.00,20,7,7),(13,'8 GB','128 GB','119 GB',5190000.00,10,7,8),(14,'6 GB','128 GB','119 GB',5399000.00,10,7,9),(15,'6 GB','64 GB','57 GB',12990000.00,20,7,10),(16,'6 GB','128 GB','121 GB',14990000.00,20,7,10),(17,'6 GB','256 GB','246 GB',16990000.00,20,7,10),(18,'4 GB','64 GB','52 GB',4290000.00,25,15,11),(19,'8 GB','128 GB','115 GB',10290000.00,25,15,12),(20,'8 GB','256 GB','223 GB',11090000.00,25,15,12),(21,'3 GB','32 GB','16 GB',3490000.00,25,15,13),(22,'4 GB','32 GB','16 GB',3990000.00,25,15,13),(23,'4 GB','64 GB','52 GB',4690000.00,25,15,14),(24,'8 GB','256 GB','223 GB',12990000.00,25,15,15),(25,'8 GB','128 GB','113 GB',5990000.00,15,7,16),(26,'3 GB','34 GB','20 GB',3290000.00,25,15,17),(27,'2 GB','32 GB','16 GB',3490000.00,25,15,18),(28,'8 GB','128 GB','120 GB',9190000.00,25,15,19),(29,'3 GB','64 GB','55 GB',2990000.00,15,7,20),(30,'8 GB','128 GB','120 GB',6990000.00,25,15,21),(31,'8 GB','128 GB','120 GB',6690000.00,25,15,22),(32,'4 GB','128 GB','119 GB',3290000.00,5,3,23),(33,'12 GB','128 GB','119 GB',16999000.00,25,15,24),(34,'12 GB','256 GB','245 GB',21990000.00,25,15,25);
/*!40000 ALTER TABLE `products_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `replies` (
  `rep_no` int(11) NOT NULL AUTO_INCREMENT,
  `rep_content` varchar(500) NOT NULL,
  `rep_time` datetime NOT NULL DEFAULT current_timestamp(),
  `mod_no` int(11) NOT NULL,
  `fb_no` int(11) NOT NULL,
  PRIMARY KEY (`rep_no`),
  KEY `Replies_Moderators_FK` (`mod_no`),
  KEY `Replies_Feedbacks_FK` (`fb_no`),
  CONSTRAINT `Replies_Feedbacks_FK` FOREIGN KEY (`fb_no`) REFERENCES `feedbacks` (`fb_no`) ON DELETE CASCADE,
  CONSTRAINT `Replies_Moderators_FK` FOREIGN KEY (`mod_no`) REFERENCES `moderators` (`mod_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replies`
--

LOCK TABLES `replies` WRITE;
/*!40000 ALTER TABLE `replies` DISABLE KEYS */;
/*!40000 ALTER TABLE `replies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-08 18:11:55
