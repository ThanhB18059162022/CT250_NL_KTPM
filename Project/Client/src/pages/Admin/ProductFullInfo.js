import "../../components/Paritals/Admin/Admin.Style.scss"
import { ProductInfo, ProductDetail } from "../../components/Paritals/Admin"
import { AdminButton } from "../../components/Controls"
import { faPlus, faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { caller } from "../../api_services/servicesContainer"
import Notifications from "../../common/Notifications";

const ProductFullInfo = (props) => {
    const {newProductNo, productNo, setDisplayEditProduct, setNewProduct} = props
    const CusStyle = {
        margin: "1% 5px 5px 12%"
    };
    const [show, setShow] = useState(false)
    const [notify, setNotify] = useState()
    const notifySaveProduct = () =>{
        setNotify({
            type :"INFORMATION", //CONFIRMATION, INFORMATION
            title:"Thông báo",
            content:"Đã lưu sản phẩm",
            infoType:"SUCCESS"
        })
        setShow(true)
    }

    const notifyAddProductFail = () =>{
        setNotify({
            type :"INFORMATION", //CONFIRMATION, INFORMATION
            title:"Thông báo",
            content:"Lỗi thêm sản phẩm",
            infoType:"ERROR"
        })
        setShow(true)
    }
    const [productDetails, setProductDetails] = useState([])
    const [display, setDisplay] = useState(0)
    const [productFullInfo, setProductFullInfo] = useState()
    
    const displayAddDetail = () => {
        switch(display){
            case 1: return  <div className="AddProductDetail">
                                <ProductDetail setDisplay={setDisplay} productDetails={productDetails} setProductDetails={setProductDetails}/>
                            </div>
            default: return;
        }
    }

    useEffect(()=>{
        (async()=>{
            if(productNo)
            {
                let data = await caller.get("products/" + String(productNo))
                setProductFullInfo(data)
                setProductDetails(data.prod_details)
            }
        })()
    },[productNo])

    const [newProductFullInfo, setNewProductFullInfo] = useState(
        {
            prod_no: newProductNo,
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
            prod_feedbacks: [],
            prod_status: "",
            prod_imgs: [],
            prod_details: []
        }
    )

    const callSaveProductAPI = () => {
        if(newProductFullInfo.prod_no)
        {
            if(newProductFullInfo.prod_name && newProductFullInfo.prod_hardwareAndOS.os && newProductFullInfo.prod_hardwareAndOS.cpu && newProductFullInfo.prod_batteryAndCharger.battery)
            {
                setNewProduct({
                                prod_no: newProductFullInfo.prod_no,
                                prod_name: newProductFullInfo.prod_name,
                                prod_os: newProductFullInfo.prod_hardwareAndOS.os,
                                prod_cpu: newProductFullInfo.prod_hardwareAndOS.cpu,
                                prod_battery: newProductFullInfo.prod_batteryAndCharger.battery,
                                prod_detailsLength: newProductFullInfo.prod_details.length
                            })
                notifySaveProduct()
                setTimeout(() => {
                    setDisplayEditProduct(0)
                }, 3000);
            }
            else{
                notifyAddProductFail()
            }
        }
        else
        {
            console.log(productFullInfo)
            notifySaveProduct()
            setTimeout(() => {
                setDisplayEditProduct(0)
            }, 3000);
        }
    }

    return(
        <>
            <div className="ProductFullInfo">
                <div className="ProductFullInfoWrapper">
                    <button onClick={()=>setDisplayEditProduct(0)} className="CloseBtn"><FontAwesomeIcon icon={faWindowClose}/></button>
                    <AdminButton style={CusStyle} ClickEvent={callSaveProductAPI} IconName={faSave}/>
                    <ProductInfo productFullInfo={productFullInfo} setProductFullInfo={setProductFullInfo} newProductFullInfo={newProductFullInfo} setNewProductFullInfo={setNewProductFullInfo}/>
                    <div className="ProductFullInfoSplit">
                        <p className="Title Line"><span>Chi tiết sản phẩm</span></p>
                        <div className="Button">
                            <AdminButton IconName={faPlus} ClickEvent={()=>setDisplay(1)}/>
                        </div>
                    </div>
                    {productDetails?(
                        productDetails.map((detail,index)=><ProductDetail key={index} productDetail={detail} setProductDetails={setProductDetails}/>)
                        ):(
                            <></>
                        )}
                    {displayAddDetail()}
                </div>
            </div>
        <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default ProductFullInfo