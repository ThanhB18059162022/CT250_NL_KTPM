import "../../components/Paritals/Admin/Admin.Style.scss";
import { ProductInfo, ProductDetail } from "../../components/Paritals/Admin";
import { AdminButton } from "../../components/Controls";
import { faPlus, faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Notifications from "../../common/Notifications";
import ApiCaller from "../../api_services/ApiCaller";

const ProductFullInfo = (props) => {
    const { productNo, setDisplayEditProduct, setModifyList } = props;
    const CusStyle = {
        margin: "1% 5px 5px 12%",
    };
    //biến hiển thị thông báo
    const [show, setShow] = useState(false);
    const [notify, setNotify] = useState();
    //thông báo lưu sản phẩm thành công
    const notifySaveProduct = () => {
        setNotify({
            type: "INFORMATION", //CONFIRMATION, INFORMATION
            title: "Thông báo",
            content: "Đã lưu sản phẩm",
            infoType: "SUCCESS",
        });
        setShow(true);
    };
    //thông báo lưu sản phẩm thất bại
    const notifySaveProductFailed = () => {
        setNotify({
            type: "INFORMATION", //CONFIRMATION, INFORMATION
            title: "Thông báo",
            content: "Vui lòng điền đủ thông tin bắt buộc!",
            infoType: "ERROR",
        });
        setShow(true);
    };
    //mảng chi tiết sản phẩm
    const [productDetails, setProductDetails] = useState([]);
    //biến hiển thị thêm chi tiết sản phẩm
    const [display, setDisplay] = useState(0);
    //biến lưu thông tin sản phẩm
    const [productFullInfo, setProductFullInfo] = useState();
    //hiển thị thêm chi tiết mới
    const displayAddDetail = () => {
        switch (display) {
            case 1:
                return (
                    <div className='AddProductDetail'>
                        <ProductDetail
                            setDisplay={setDisplay}
                            productDetails={productDetails}
                            setProductDetails={setProductDetails}
                        />
                    </div>
                );
            default:
                return;
        }
    };
    //lấy thông tin sản phẩm từ server
    useEffect(() => {
        (async () => {
            if (productNo) {
                const caller = new ApiCaller();
                let data = await caller.get("products/" + String(productNo));
                setProductFullInfo(data);
                setProductDetails(data.prod_details);
            }
        })();
    }, [productNo]);

    //sản phẩm mới
    const [newProductFullInfo, setNewProductFullInfo] = useState({
        prod_name: "",
        prod_manufacturer: {
            brand_name: "",
            releaseDate: "",
            madeIn: "",
        },
        prod_screen: {
            type: "",
            resolution: "",
            size: "",
            glass: "",
        },
        prod_camera: {
            rear: {
                spec: "",
                videoQuality: "",
            },
            font: "",
        },
        prod_hardwareAndOS: {
            os: "",
            cpu: "",
            cpuSpec: "",
            gpu: "",
        },
        prod_network: {
            telecom: "",
            SIM: "",
            Wifi: "",
            GPS: "",
            Bluetooth: "",
            connector: "",
            others: "",
        },
        prod_batteryAndCharger: {
            battery: "",
            batteryType: "",
            chargeType: "",
        },
        prod_utilities: [],
        prod_design: {
            structural: "",
            material: "",
            size: "",
            weight: "",
        },
        prod_status: "",
    });
    //mảng hình ảnh sản phẩm
    const [prod_imgs, setProd_imgs] = useState([]);
    //gọi api lưu thông tin sản phẩm
    const callSaveProductAPI = async () => {
        const caller = new ApiCaller();
        //lưu sản phẩm mới
        if (newProductFullInfo && productChecking(newProductFullInfo) && prod_imgs.length>0 && productDetails.length>0) {
            const newProdInfo = await caller.post("products", newProductFullInfo);
            await caller.post("products/" + newProdInfo.prod_no + "/images", prod_imgs);
            await caller.post("products/" + newProdInfo.prod_no + "/details", productDetails);
            setModifyList(1);
            notifySaveProduct();
            setTimeout(() => {
                setDisplayEditProduct(0);
            }, 2000);
        }
        //cập nhật thông tin sản phẩm
        else if (productFullInfo && productChecking(productFullInfo)) {
            let prodInfoTmp = {
                prod_name: productFullInfo.prod_name,
                prod_manufacturer: productFullInfo.prod_manufacturer,
                prod_screen: productFullInfo.prod_screen,
                prod_camera: productFullInfo.prod_camera,
                prod_hardwareAndOS: productFullInfo.prod_hardwareAndOS,
                prod_network: productFullInfo.prod_network,
                prod_batteryAndCharger: productFullInfo.prod_batteryAndCharger,
                prod_utilities: productFullInfo.prod_utilities,
                prod_design: productFullInfo.prod_design,
                prod_status: productFullInfo.prod_status,
            };
            let newProdDetails = [];
            productDetails.map((item, index) => (!item.pd_no ? newProdDetails.push(item) : <></>));
            await caller.put("products/" + productNo, prodInfoTmp);

            // Nếu có hình
            if (prod_imgs.length > 0)
                await caller.post("products/" + productNo + "/images", prod_imgs);

            // Nếu có chi tiết
            if (newProdDetails.length > 0)
                await caller.post("products/" + productNo + "/details", newProdDetails);

            setModifyList(1);
            notifySaveProduct();
            setTimeout(() => {
                setDisplayEditProduct(0);
            }, 2000);
        } else notifySaveProductFailed();
    };

    // kiểm tra thông tin sản phẩm mới hợp lệ
    const productChecking = (newProductFullInfo) => {
        if( 
            newProductFullInfo.prod_name.length>0 && 
            newProductFullInfo.prod_manufacturer.brand_name.length>0 &&
            newProductFullInfo.prod_manufacturer.madeIn.length>0 &&
            newProductFullInfo.prod_manufacturer.releaseDate.length>0 &&
            newProductFullInfo.prod_screen.glass.length>0 &&
            newProductFullInfo.prod_screen.resolution.length>0 &&
            newProductFullInfo.prod_screen.size.length>0 &&
            newProductFullInfo.prod_screen.type.length>0 &&
            newProductFullInfo.prod_camera.font.length>0 &&
            newProductFullInfo.prod_camera.rear.spec.length>0 &&
            newProductFullInfo.prod_camera.rear.videoQuality.length>0 &&
            newProductFullInfo.prod_hardwareAndOS.cpu.length>0 &&
            newProductFullInfo.prod_hardwareAndOS.cpuSpec.length>0 &&
            newProductFullInfo.prod_hardwareAndOS.gpu.length>0 &&
            newProductFullInfo.prod_hardwareAndOS.os.length>0 &&
            newProductFullInfo.prod_network.Bluetooth.length>0 &&
            newProductFullInfo.prod_network.GPS.length>0 &&
            newProductFullInfo.prod_network.SIM.length>0 &&
            newProductFullInfo.prod_network.Wifi.length>0 &&
            newProductFullInfo.prod_network.connector.length>0 &&
            newProductFullInfo.prod_network.others.length>0 &&
            newProductFullInfo.prod_network.telecom.length>0 &&
            newProductFullInfo.prod_batteryAndCharger.battery.length>0 &&
            newProductFullInfo.prod_batteryAndCharger.batteryType.length>0 &&
            newProductFullInfo.prod_batteryAndCharger.chargeType.length>0 &&
            newProductFullInfo.prod_design.material.length>0 &&
            newProductFullInfo.prod_design.size.length>0 &&
            newProductFullInfo.prod_design.structural.length>0 &&
            newProductFullInfo.prod_design.weight.length>0 
        )
        return true
    }

    return (
        <>
            <div className='ProductFullInfo'>
                <div className='ProductFullInfoWrapper'>
                    <div className='ProductFullInfoHeader'>
                        <AdminButton
                            style={CusStyle}
                            ClickEvent={callSaveProductAPI}
                            IconName={faSave}
                        />

                        <p className='Title'>Thông tin sản phẩm</p>
                        <button onClick={() => setDisplayEditProduct(0)} className='CloseBtn'>
                            <FontAwesomeIcon icon={faWindowClose} />
                        </button>
                    </div>
                    <div className='ProductInfoContent'>
                        <ProductInfo
                            productFullInfo={productFullInfo}
                            setProductFullInfo={setProductFullInfo}
                            newProductFullInfo={newProductFullInfo}
                            setNewProductFullInfo={setNewProductFullInfo}
                            prod_imgs={prod_imgs}
                            setProd_imgs={setProd_imgs}
                        />
                        <div className='ProductFullInfoSplit'>
                            <p className='Title Line'>
                                <span>Chi tiết sản phẩm</span>
                                <p>(*)</p>
                            </p>
                            <AdminButton IconName={faPlus} ClickEvent={() => setDisplay(1)} />
                        </div>
                        {productDetails &&
                            productDetails.map((detail, index) => (
                                <ProductDetail
                                    key={index}
                                    index={index}
                                    productDetail={detail}
                                    setProductDetails={setProductDetails}
                                    productDetails={productDetails}
                                />
                            ))}
                        {displayAddDetail()}
                    </div>
                </div>
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    );
};

export default ProductFullInfo;
