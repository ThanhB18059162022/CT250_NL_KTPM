import "../../components/Paritals/Admin/Admin.Style.scss"
import { ProductInfo, ProductDetail } from "../../components/Paritals/Admin"
import { AdminButton } from "../../components/Controls"
import { faPlus, faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import Notifications from "../../common/Notifications";
import ApiCaller from "../../api_services/ApiCaller"

const ProductFullInfo = (props) => {
    const { productNo, setDisplayEditProduct } = props
    const CusStyle = {
        margin: "1% 5px 5px 12%"
    };
    //biến hiển thị thông báo
    const [show, setShow] = useState(false)
    const [notify, setNotify] = useState()
    //thông báo lưu sản phẩm thành công
    const notifySaveProduct = () => {
        setNotify({
            type: "INFORMATION", //CONFIRMATION, INFORMATION
            title: "Thông báo",
            content: "Đã lưu sản phẩm",
            infoType: "SUCCESS"
        })
        setShow(true)
    }
    //thông báo lưu sản phẩm thất bại
    const notifySaveProductFailed = () => {
        setNotify({
            type: "INFORMATION", //CONFIRMATION, INFORMATION
            title: "Thông báo",
            content: "Lỗi lưu sản phẩm",
            infoType: "ERROR"
        })
        setShow(true)
    }
    //mảng chi tiết sản phẩm
    const [productDetails, setProductDetails] = useState()
    //biến hiển thị thêm chi tiết sản phẩm
    const [display, setDisplay] = useState(0)
    //biến lưu thông tin sản phẩm
    const [productFullInfo, setProductFullInfo] = useState()
    //hiển thị thêm chi tiết mới
    const displayAddDetail = () => {
        switch (display) {
            case 1: return <div className="AddProductDetail">
                <ProductDetail setDisplay={setDisplay} productDetails={productDetails} setProductDetails={setProductDetails} />
            </div>
            default: return;
        }
    }
    //lấy thông tin sản phẩm từ server
    useEffect(() => {
        (async () => {
            if (productNo) {
                const caller = new ApiCaller()
                let data = await caller.get("products/" + String(productNo))
                setProductFullInfo(data)
                setProductDetails(data.prod_details)
            }
        })()
    }, [productNo])

    // useEffect(()=>{
    //     if( newProductFullInfo.prod_name )
    //         setNewProductFullInfo({...newProductFullInfo, prod_details: productDetails})
    //     else if( productNo )
    //         setProductFullInfo({...productFullInfo, prod_details: productDetails})
    // },[productDetails])

    //sản phẩm mới
    const [newProductFullInfo, setNewProductFullInfo] = useState(
        {
            prod_name: "",
            prod_manufacturer: {
                brand_name: "",
                releaseDate: "",
                madeIn: ""
            },
            prod_screen: {
                type: "",
                resolution: "",
                size: "",
                glass: ""
            },
            prod_camera: {
                rear: {
                    spec: "",
                    videoQuality: ""
                },
                font: ""
            },
            prod_hardwareAndOS: {
                os: "",
                cpu: "",
                cpuSpec: "",
                gpu: ""
            },
            prod_network: {
                telecom: "",
                SIM: "",
                Wifi: "",
                GPS: "",
                Bluetooth: "",
                connector: "",
                others: ""
            },
            prod_batteryAndCharger: {
                battery: "",
                batteryType: "",
                chargeType: ""
            },
            prod_utilities: [],
            prod_design: {
                structural: "",
                material: "",
                size: "",
                weight: ""
            },
            prod_status: "",
            // prod_imgs: [],
        }
    )
    //gọi api lưu sản phẩm
    const callSaveProductAPI = async() => {
        const caller = new ApiCaller()
        //lưu sản phẩm mới
        if ( newProductFullInfo && newProductFullInfo.prod_name ) {
            console.log(newProductFullInfo)
            await caller.post("products", newProductFullInfo)
            // notifySaveProduct()
            // setTimeout(() => {
            //     setDisplayEditProduct(0)
            // }, 3000);
            
        }
        //lưu thông tin sản phẩm chỉnh sửa
        else if (productFullInfo){
            console.log(productFullInfo)
            notifySaveProduct()
            setTimeout(() => {
                setDisplayEditProduct(0)
            }, 3000);
        }
        else notifySaveProductFailed()
    }

    return (
        <>
            <div className="ProductFullInfo">
                <div className="ProductFullInfoWrapper">
                    <div className="ProductFullInfoHeader">
                        <AdminButton style={CusStyle} ClickEvent={callSaveProductAPI} IconName={faSave} />

                        <p className="Title">Thông tin sản phẩm</p>
                        <button onClick={() => setDisplayEditProduct(0)} className="CloseBtn"><FontAwesomeIcon icon={faWindowClose} /></button>
                    </div>
                    <div className="ProductInfoContent">
                        <ProductInfo productFullInfo={productFullInfo} setProductFullInfo={setProductFullInfo} newProductFullInfo={newProductFullInfo} setNewProductFullInfo={setNewProductFullInfo} />
                        <div className="ProductFullInfoSplit">
                            <p className="Title Line"><span>Chi tiết sản phẩm</span></p>
                            <AdminButton IconName={faPlus} ClickEvent={() => setDisplay(1)} />
                        </div>
                        {productDetails ? (
                            productDetails.map((detail, index) => <ProductDetail key={index} index={index} productDetail={detail} setProductDetails={setProductDetails}  productDetails={productDetails}/>)
                        ) : (
                            <></>
                        )}
                        {displayAddDetail()}
                    </div>
                </div>
            </div>
            <Notifications {...notify} isShow={show} onHideRequest={setShow} />
        </>
    )
}

export default ProductFullInfo