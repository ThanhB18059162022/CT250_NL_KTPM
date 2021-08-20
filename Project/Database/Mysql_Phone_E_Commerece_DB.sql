CREATE OR REPLACE DATABASE Phone_E_Commerece_DB;

-- Tạo các bảng (13 bảng)

-- Bảng khách hàng

CREATE TABLE KHACH_HANG(
  KH_MA INT AUTO_INCREMENT, -- Mã khách hàng tự tăng
  KH_HOTEN NVARCHAR(70) NOT NULL, -- Họ tên khách hàng
  KH_CMND CHAR(12) NOT NULL UNIQUE, -- Chứng minh nhân dân
  KH_EMAIL VARCHAR(128) NOT NULL UNIQUE, -- Email của khách
  KH_GIOITINH BOOL NOT NULL DEFAULT '0', -- Giới tính 1 là nam 0 là nữ
 
 -- Khóa chính
  CONSTRAINT KHACH_HANG_PK PRIMARY KEY (KH_MA)
);

-- Bảng quản trị viên
CREATE TABLE QUAN_TRI_VIEN(
  QTV_MA INT AUTO_INCREMENT, -- Mã quản trị viên tự tăng
  QTV_HOTEN NVARCHAR(70) NOT NULL, -- Họ tên quản trị viên
  QTV_CMND CHAR(12) NOT NULL UNIQUE, -- Chứng minh nhân dân
  QTV_SDT VARCHAR(12) NOT NULL UNIQUE, -- Số điện thoại
  QTV_GIOITINH BOOL NOT NULL DEFAULT '0', -- Giới tính 1 là nam 0 là nữ
  QTV_DIACHI NVARCHAR(128), -- Địa chỉ
  QTV_VAITRO BOOL NOT NULL DEFAULT '0', -- Vai trò 0 là nhân viên 1 là quản lý
 -- Khóa chính
  CONSTRAINT QUAN_TRI_VIEN_PK PRIMARY KEY (QTV_MA)
);

-- Bảng tài khoản
CREATE TABLE TAI_KHOAN(
  TK_MA INT AUTO_INCREMENT, -- Mã tài khoản tự tăng
  TK_TAIKHOAN NVARCHAR(70) NOT NULL UNIQUE, -- Tài khoản
  TK_MATKHAU CHAR(12) NOT NULL, -- Mật khẩu
  QTV_MA INT NOT NULL, -- Mã quản trị viên khóa ngoại tham chiếu bảng quản trị viên
 
 -- Khóa chính
  CONSTRAINT QUAN_TRI_VIEN_PK PRIMARY KEY (TK_MA),
 
 -- Khóa ngoại
  CONSTRAINT TAI_KHOAN_QUAN_TRI_VIEN_FK FOREIGN KEY(QTV_MA) REFERENCES QUAN_TRI_VIEN(QTV_MA) ON DELETE CASCADE
);

-- Bảng địa chỉ
CREATE TABLE DIA_CHI(
  DC_MA INT AUTO_INCREMENT, -- Mã địa chỉ tự tăng
  DC_DIADIEM NVARCHAR(100) NOT NULL UNIQUE, -- Địa chỉ phải độc nhất
  SDT NVARCHAR(12) NOT NULL UNIQUE, -- Số điện thoại phải độc nhất
  KH_MA INT NOT NULL, -- Mã khách hàng khóa ngoại tham chiếu bảng khách hàng 
 
 -- Khóa chính
  CONSTRAINT DIA_CHI_PK PRIMARY KEY (DC_MA),

 -- Khóa ngoại
  CONSTRAINT DIA_CHI_KHACH_HANG_FK FOREIGN KEY(KH_MA) REFERENCES KHACH_HANG(KH_MA) ON DELETE CASCADE
); 


-- Bảng thương hiệu
CREATE TABLE THUONG_HIEU(
  TH_MA INT AUTO_INCREMENT, -- Mã thương hiệu tự tăng
  TH_TEN NVARCHAR(128) NOT NULL UNIQUE, -- Tên thương hiệu phải độc nhất

 -- Khóa chính
  CONSTRAINT THUONG_HIEU_PK PRIMARY KEY (TH_MA)
); 

-- Bảng sản phẩm
CREATE TABLE SAN_PHAM(
  SP_MA INT AUTO_INCREMENT, -- Mã sản phẩm tự tăng
  SP_Ten NVARCHAR(50) NOT NULL UNIQUE, -- Tên sản phẩm phải độc nhất
  SP_NSX DATETIME NOT NULL DEFAULT NOW(), -- Ngày sản xuất
  SP_NGAYDANG DATETIME NOT NULL DEFAULT NOW(), -- Ngày bán
  SP_MANHINH NVARCHAR(128) NOT NULL, -- Màn hình
  SP_CAMERA NVARCHAR(128) NOT NULL, -- Camera
  SP_KICHTHUOC NVARCHAR(128) NOT NULL, -- Kích thước
  SP_PINSAC NVARCHAR(128) NOT NULL, -- Pin và sạc
  SP_HDH NVARCHAR(128) NOT NULL, -- Hệ điều hành
  SP_PHANCUNG NVARCHAR(128) NOT NULL, -- Phần cứng
  TH_MA INT NOT NULL, -- Thương hiệu khóa ngoại tham chiếu bảng thương hiệu

 -- Khóa chính
  CONSTRAINT SAN_PHAM_PK PRIMARY KEY (SP_MA),

 -- Khóa ngoại
  CONSTRAINT SAN_PHAM_THUONG_HIEU_FK FOREIGN KEY(TH_MA) REFERENCES THUONG_HIEU(TH_MA) ON DELETE CASCADE
); 

-- Bảng hình ảnh
CREATE TABLE HINH_ANH(
  HA_MA INT AUTO_INCREMENT, -- Mã hình ảnh tự tăng
  HA_SRC VARCHAR(128) NOT NULL, -- Đường dẫn đến resource trên server
  SP_MA INT NOT NULL, -- Mã sản phẩm khóa ngoại tham chiếu bảng sản phẩm

 -- Khóa chính
  CONSTRAINT HINH_ANH_PK PRIMARY KEY (HA_MA),

 -- Khóa ngoại
  CONSTRAINT HINH_ANH_SAN_PHAM_FK FOREIGN KEY(SP_MA) REFERENCES SAN_PHAM(SP_MA) ON DELETE CASCADE
); 

-- Bảng đánh giá
CREATE TABLE DANH_GIA(
  DG_MA INT AUTO_INCREMENT, -- Mã đánh giá tự tăng
  DG_NOIDUNG NVARCHAR(128) NOT NULL, -- Nội dung đánh giá
  DG_THOIGIAN DATETIME NOT NULL DEFAULT NOW() , -- Thời gian đánh giá
  SP_MA INT NOT NULL, -- Mã sản phẩm khóa ngoại tham chiếu bảng sản phẩm
  KH_MA INT NOT NULL, -- Mã khách hàng khóa ngoại tham chiếu bảng khách hàng

 -- Khóa chính
  CONSTRAINT DANH_GIA_PK PRIMARY KEY (DG_MA),

 -- Khóa ngoại
  CONSTRAINT DANH_GIA_SAN_PHAM_FK FOREIGN KEY(SP_MA) REFERENCES SAN_PHAM(SP_MA) ON DELETE CASCADE,
  CONSTRAINT DANH_GIA_KHACH_HANG_FK FOREIGN KEY(KH_MA) REFERENCES KHACH_HANG(KH_MA) ON DELETE CASCADE
); 

-- Bảng phản hồi
CREATE TABLE PHAN_HOI(
  PH_MA INT AUTO_INCREMENT, -- Mã phản hồi tự tăng
  PH_NOIDUNG NVARCHAR(128) NOT NULL, -- Nội dung phản hồi
  PH_THOIGIAN DATETIME NOT NULL DEFAULT NOW() , -- Thời gian phản hồi
  QTV_MA INT NOT NULL, -- Mã quản trị viên khóa ngoại tham chiếu bảng quản trị viên
  DG_MA INT NOT NULL, -- Mã đánh giá khóa ngoại tham chiếu bảng đánh giá

 -- Khóa chính
  CONSTRAINT PHAN_HOI_PK PRIMARY KEY (PH_MA),

 -- Khóa ngoại
  CONSTRAINT PHAN_HOI_QUAN_TRI_VIEN_FK FOREIGN KEY(QTV_MA) REFERENCES QUAN_TRI_VIEN(QTV_MA) ON DELETE CASCADE,
  CONSTRAINT PHAN_HOI_DANH_GIA_FK FOREIGN KEY(DG_MA) REFERENCES DANH_GIA(DG_MA) ON DELETE CASCADE
); 

-- Bảng giỏ hàng
CREATE TABLE GIO_HANG(
  GH_MA INT AUTO_INCREMENT, -- Mã giỏ hàng tự tăng
  GH_THOIGIAN DATETIME NOT NULL DEFAULT NOW(), -- Ngày thanh toán
  KH_MA INT NOT NULL, -- Mã khách hàng khóa ngoại tham chiếu bảng khách hàng

 -- Khóa chính
  CONSTRAINT GIO_HANG_PK PRIMARY KEY (GH_MA),

 -- Khóa ngoại
  CONSTRAINT GIO_HANG_KHACH_HANG_FK FOREIGN KEY(KH_MA) REFERENCES KHACH_HANG(KH_MA) ON DELETE CASCADE
); 

-- Bảng hóa đơn
CREATE TABLE HOA_DON(
  HD_MA INT AUTO_INCREMENT, -- Mã hóa đơn tự tăng
  HD_THOIGIAN DATETIME NOT NULL DEFAULT NOW(), -- Thời gian ra hóa đơn
  HD_SOTIEN DECIMAL(15, 2) NOT NULL DEFAULT '0', -- Số tiền cho hóa đơn
  QTV_MA INT NOT NULL, -- Mã quản trị viên khóa ngoại tham chiếu bảng quản trị viên 
  GH_MA INT NOT NULL, -- Mã giỏ hàng tham chiếu bảng giỏ hàng
  DC_MA INT NOT NULL, -- Mã địa chỉ tham chiếu bảng địa chỉ

 -- Khóa chính
  CONSTRAINT HOA_DON_PK PRIMARY KEY (HD_MA),

 -- Khóa ngoại
  CONSTRAINT HOA_DON_QUAN_TRI_VIEN_FK FOREIGN KEY(QTV_MA) REFERENCES QUAN_TRI_VIEN(QTV_MA) ON DELETE CASCADE,
  CONSTRAINT HOA_DON_GIO_HANG_FK FOREIGN KEY(GH_MA) REFERENCES GIO_HANG(GH_MA) ON DELETE CASCADE,
  CONSTRAINT HOA_DON_DIA_CHI_FK FOREIGN KEY(DC_MA) REFERENCES DIA_CHI(DC_MA) ON DELETE CASCADE
); 


-- Bảng chi tiết sản phẩm
CREATE TABLE CHI_TIET_SAN_PHAM(
  CTSP_MA INT AUTO_INCREMENT, -- Mã chi tiết sản phẩm tự tăng
  CTSP_BONHO VARCHAR(10) NOT NULL, -- BỘ NHỚ
  CTSP_GIA DECIMAL(15, 2) NOT NULL, -- Giá
  CTSP_SOLUONG INT NOT NULL, -- Số lượng
  CTSP_DABAN INT NOT NULL, -- Số lượng đã bán
  SP_MA INT NOT NULL, -- Mã sản phẩm khóa ngoại tham chiếu bảng sản phẩm

 -- Khóa chính
  CONSTRAINT CHI_TIET_SAN_PHAM_PK PRIMARY KEY (CTSP_MA),

 -- Khóa ngoại
  CONSTRAINT CHI_TIET_SAN_PHAM_SAN_PHAM_FK FOREIGN KEY(SP_MA) REFERENCES SAN_PHAM(SP_MA) ON DELETE CASCADE
); 


-- Bảng chi tiết giỏ hàng
CREATE TABLE CHI_TIET_GIO_HANG(
  GH_MA INT NOT NULL, -- Mã giỏ hàng khóa ngoại tham chiếu bảng giỏ hàng
  CTSP_MA INT NOT NULL, -- Mã chi tiết sản phẩm khóa ngoại tham chiếu bảng chi tiết sản phẩm

  CTGH_SOLUONG INT NOT NULL, -- Số lượng sản phẩm trong giỏ
  CTGH_GIATIEN DECIMAL(15, 2) NOT NULL, -- Tổng giá trị giỏ hàng

 -- Khóa chính
  CONSTRAINT CHI_TIET_GIO_HANG_PK PRIMARY KEY (GH_MA, CTSP_MA)
); 


