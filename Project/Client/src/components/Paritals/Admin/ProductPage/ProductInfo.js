import "../Admin.Style.scss"

const ProductInfo = (props) => {
    const { productFullInfo, setProductFullInfo, newProductFullInfo, setNewProductFullInfo, prod_imgs, setProd_imgs} = props

    const uploadImage = async (e) => {
        const files = e.target.files;
        // Đọc thông tin tập tin đã được đăng tải
        let imgs = []
        for (let i = 0; i < files.length; i++) {
            let img = await getBase64(files[i])
            imgs.push(img)
        }

        // if( newProductFullInfo )
            setProd_imgs([...imgs])
            // else setProductFullInfo({ ...productFullInfo, prod_imgs: [...productFullInfo.prod_imgs, ...imgs] })
    }
        
    const getBase64 = (file) => {
        return new Promise(resolve => {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = resolve
        })
            .then(resolve => {
                return resolve.srcElement.result
            })
    }

    return (
        <>
            {productFullInfo ? (
                <>
                    {/* hiển thị/chỉnh sửa thông tin sản phẩm */}
                    <div className="ProductInfo">
                        <form className="AddProductForm">
                            <li>
                                <p>Tên sản phẩm:</p>
                                <input name="txtPropName" type="text" value={productFullInfo.prod_name} onChange={e => setProductFullInfo({ ...productFullInfo, prod_name: e.target.value })} /> <br />
                            </li>
                            <li>
                                <p>Nhãn hiệu:</p>
                                <input name="txtMFBrandName" type="text" value={productFullInfo.prod_manufacturer.brand_name} onChange={e => setProductFullInfo({ ...productFullInfo, prod_manufacturer: { ...productFullInfo.prod_manufacturer, brand_name: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Ngày ra mắt:</p>
                                <input name="txtMFReleaseDate" type="text" value={productFullInfo.prod_manufacturer.releaseDate} onChange={e => setProductFullInfo({ ...productFullInfo, prod_manufacturer: { ...productFullInfo.prod_manufacturer, releaseDate: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Xuất xứ:</p>
                                <input name="txtPropMadeIn" type="text" value={productFullInfo.prod_manufacturer.madeIn} onChange={e => setProductFullInfo({ ...productFullInfo, prod_manufacturer: { ...productFullInfo.prod_manufacturer, madeIn: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Công nghệ màn hình:</p>
                                <input name="txtScreenType" type="text" value={productFullInfo.prod_screen.type} onChange={e => setProductFullInfo({ ...productFullInfo, prod_screen: { ...productFullInfo.prod_screen, type: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Độ phân giải:</p>
                                <input name="txtScreenResolution" type="text" value={productFullInfo.prod_screen.resolution} onChange={e => setProductFullInfo({ ...productFullInfo, prod_screen: { ...productFullInfo.prod_screen, resolution: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Màn hình rộng:</p>
                                <input name="txtScreenSize" type="text" value={productFullInfo.prod_screen.size} onChange={e => setProductFullInfo({ ...productFullInfo, prod_screen: { ...productFullInfo.prod_screen, size: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Mặt kính cảm ứng:</p>
                                <input name="txtScreen" type="text" value={productFullInfo.prod_screen.type} onChange={e => setProductFullInfo({ ...productFullInfo, prod_screen: { ...productFullInfo.prod_screen, glass: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Camera sau:</p>
                                <input name="txtCameraRear" type="text" value={productFullInfo.prod_camera.rear.spec} onChange={e => setProductFullInfo({ ...productFullInfo, prod_camera: { ...productFullInfo.prod_camera.rear, spec: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Quay phim:</p>
                                <input name="txtCameraVideoQuality" type="text" value={productFullInfo.prod_camera.rear.videoQuality} onChange={e => setProductFullInfo({ ...productFullInfo, prod_camera: { ...productFullInfo.prod_camera.rear, videoQuality: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Camera trước:</p>
                                <input name="txtCameraFont" type="text" value={productFullInfo.prod_camera.font} onChange={e => setProductFullInfo({ ...productFullInfo, prod_camera: { ...productFullInfo.prod_camera, font: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Hệ điều hành:</p>
                                <input name="txtOS" type="text" value={productFullInfo.prod_hardwareAndOS.os} onChange={e => setProductFullInfo({ ...productFullInfo, prod_hardwareAndOS: { ...productFullInfo.prod_hardwareAndOS, os: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Chip xử lý (CPU):</p>
                                <input name="txtCPU" type="text" value={productFullInfo.prod_hardwareAndOS.cpu} onChange={e => setProductFullInfo({ ...productFullInfo, prod_hardwareAndOS: { ...productFullInfo.prod_hardwareAndOS, cpu: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Tốc độ CPU:</p>
                                <input name="txtCPUSpec" type="text" value={productFullInfo.prod_hardwareAndOS.cpuSpec} onChange={e => setProductFullInfo({ ...productFullInfo, prod_hardwareAndOS: { ...productFullInfo.prod_hardwareAndOS, cpuSpec: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Chip đồ họa (GPU):</p>
                                <input name="txtGPU" type="text" value={productFullInfo.prod_hardwareAndOS.gpu} onChange={e => setProductFullInfo({ ...productFullInfo, prod_hardwareAndOS: { ...productFullInfo.prod_hardwareAndOS, gpu: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Mạng di động:</p>
                                <input name="txtTelecom" type="text" value={productFullInfo.prod_network.telecom} onChange={e => setProductFullInfo({ ...productFullInfo, prod_network: { ...productFullInfo.prod_network, telecom: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Sim:</p>
                                <input name="txtSim" type="text" value={productFullInfo.prod_network.SIM} onChange={e => setProductFullInfo({ ...productFullInfo, prod_network: { ...productFullInfo.prod_network, SIM: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Wifi:</p>
                                <input name="txtWifi" type="text" value={productFullInfo.prod_network.Wifi} onChange={e => setProductFullInfo({ ...productFullInfo, prod_network: { ...productFullInfo.prod_network, Wifi: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>GPS:</p>
                                <input name="txtGPS" type="text" value={productFullInfo.prod_network.GPS} onChange={e => setProductFullInfo({ ...productFullInfo, prod_network: { ...productFullInfo.prod_network, GPS: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Bluetooth:</p>
                                <input name="txtBluetooth" type="text" value={productFullInfo.prod_network.Bluetooth} onChange={e => setProductFullInfo({ ...productFullInfo, prod_network: { ...productFullInfo.prod_network, Bluetooth: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Cổng kết nối/sạc:</p>
                                <input name="txtConnector" type="text" value={productFullInfo.prod_network.connector} onChange={e => setProductFullInfo({ ...productFullInfo, prod_network: { ...productFullInfo.prod_network, connector: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Kết nối khác:</p>
                                <input name="txtOthers" type="text" value={productFullInfo.prod_network.others} onChange={e => setProductFullInfo({ ...productFullInfo, prod_network: { ...productFullInfo.prod_network, others: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Dung lượng pin:</p>
                                <input name="txtBattery" type="text" value={productFullInfo.prod_batteryAndCharger.battery} onChange={e => setProductFullInfo({ ...productFullInfo, prod_batteryAndCharger: { ...productFullInfo.prod_batteryAndCharger, battery: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Loại pin:</p>
                                <input name="txtBatteryType" type="text" value={productFullInfo.prod_batteryAndCharger.batteryType} onChange={e => setProductFullInfo({ ...productFullInfo, prod_batteryAndCharger: { ...productFullInfo.prod_batteryAndCharger, batteryType: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Công suất sạc tối đa:</p>
                                <input name="txtChargeType" type="text" value={productFullInfo.prod_batteryAndCharger.chargeType} onChange={e => setProductFullInfo({ ...productFullInfo, prod_batteryAndCharger: { ...productFullInfo.prod_batteryAndCharger, chargeType: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>
                                    Tiện ích:
                                    <input type="button" onClick={
                                                                    ()=>{
                                                                        let name=window.prompt("Tên tiện ích")
                                                                        let value=window.prompt("Mô tả tiện ích")
                                                                        if(name && value) setProductFullInfo({...productFullInfo, prod_utilities: [...productFullInfo.prod_utilities, {[name]:value} ]})
                                                                    }
                                                                } value="+" style={{padding: 0, width: 20+'px'}}/>
                                    <input type="button" onClick={()=>setProductFullInfo({...productFullInfo, prod_utilities: [productFullInfo.prod_utilities.pop()]})} value="-" style={{padding: 0, width: 20+'px'}}/>
                                </p>
                                <div>
                                    {productFullInfo.prod_utilities.map((item, index)=> <div key={index}><p>{Object.keys(item)[0]}:</p> <input type="text" value={Object.values(item)[0]} readOnly/></div>)}
                                </div>
                            </li>
                            <li>
                                <p>Thiết kế:</p>
                                <input name="txtStructural" type="text" value={productFullInfo.prod_design.structural} onChange={e => setProductFullInfo({ ...productFullInfo, prod_design: { ...productFullInfo.prod_design, structural: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Chất liệu:</p>
                                <input name="txtMaterial" type="text" value={productFullInfo.prod_design.material} onChange={e => setProductFullInfo({ ...productFullInfo, prod_design: { ...productFullInfo.prod_design, material: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Kích thước:</p>
                                <input name="txtSizeAndWeight" type="text" value={productFullInfo.prod_design.size} onChange={e => setProductFullInfo({ ...productFullInfo, prod_design: { ...productFullInfo.prod_design, size: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Khối lượng:</p>
                                <input name="txtSizeAndWeight" type="text" value={productFullInfo.prod_design.weight} onChange={e => setProductFullInfo({ ...productFullInfo, prod_design: { ...productFullInfo.prod_design, weight: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Hình ảnh:</p>
                                <input type="file" onChange={uploadImage} accept='image/*' id="imageUpload" multiple />
                            </li>
                            <li className="ImageContainer">
                                {showProductImage(productFullInfo)}
                                {prod_imgs?(showProductImage(prod_imgs)):(<></>)}
                            </li>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    {/* tạo mới thông tin sản phẩm */}
                    <div className="ProductInfo">
                        <form className="AddProductForm">
                            <li>
                                <p>Tên sản phẩm:</p>
                                <input name="txtPropName" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_name: e.target.value })} /> <br />
                            </li>
                            <li>
                                <p>Nhãn hiệu:</p>
                                <input name="txtMFBrandName" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_manufacturer: { ...newProductFullInfo.prod_manufacturer, brand_name: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Ngày ra mắt:</p>
                                <input name="txtMFReleaseDate" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_manufacturer: { ...newProductFullInfo.prod_manufacturer, releaseDate: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Xuất xứ:</p>
                                <input name="txtPropMadeIn" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_manufacturer: { ...newProductFullInfo.prod_manufacturer, madeIn: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Công nghệ màn hình:</p>
                                <input name="txtScreenType" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_screen: { ...newProductFullInfo.prod_screen, type: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Độ phân giải:</p>
                                <input name="txtScreenResolution" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_screen: { ...newProductFullInfo.prod_screen, resolution: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Màn hình rộng:</p>
                                <input name="txtScreenSize" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_screen: { ...newProductFullInfo.prod_screen, size: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Mặt kính cảm ứng:</p>
                                <input name="txtScreenGlass" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_screen: { ...newProductFullInfo.prod_screen, glass: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Camera sau:</p>
                                <input name="txtCameraRearSpec" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_camera: { ...newProductFullInfo.prod_camera, rear: {...newProductFullInfo.prod_camera.rear, spec: e.target.value} } })} /> <br />
                            </li>
                            <li>
                                <p>Quay phim:</p>
                                <input name="txtCameraRearVideoQuality" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_camera: { ...newProductFullInfo.prod_camera, rear: {...newProductFullInfo.prod_camera.rear, videoQuality: e.target.value} } })} /> <br />
                            </li>
                            <li>
                                <p>Camera trước:</p>
                                <input name="txtCameraFont" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_camera: { ...newProductFullInfo.prod_camera, font: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Hệ điều hành:</p>
                                <input name="txtOS" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_hardwareAndOS: { ...newProductFullInfo.prod_hardwareAndOS, os: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Chip xử lý (CPU):</p>
                                <input name="txtCPU" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_hardwareAndOS: { ...newProductFullInfo.prod_hardwareAndOS, cpu: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Tốc độ CPU:</p>
                                <input name="txtCPUSpec" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_hardwareAndOS: { ...newProductFullInfo.prod_hardwareAndOS, cpuSpec: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Chip đồ họa (GPU):</p>
                                <input name="txtGPU" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_hardwareAndOS: { ...newProductFullInfo.prod_hardwareAndOS, gpu: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Mạng di động:</p>
                                <input name="txtTelecom" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_network: { ...newProductFullInfo.prod_network, telecom: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Sim:</p>
                                <input name="txtSim" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_network: { ...newProductFullInfo.prod_network, SIM: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Wifi:</p>
                                <input name="txtWifi" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_network: { ...newProductFullInfo.prod_network, Wifi: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>GPS:</p>
                                <input name="txtGPS" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_network: { ...newProductFullInfo.prod_network, GPS: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Bluetooth:</p>
                                <input name="txtBluetooth" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_network: { ...newProductFullInfo.prod_network, Bluetooth: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Cổng kết nối/sạc:</p>
                                <input name="txtConnector" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_network: { ...newProductFullInfo.prod_network, connector: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Kết nối khác:</p>
                                <input name="txtOthers" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_network: { ...newProductFullInfo.prod_network, others: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Dung lượng pin:</p>
                                <input name="txtBattery" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_batteryAndCharger: { ...newProductFullInfo.prod_batteryAndCharger, battery: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Loại pin:</p>
                                <input name="txtBatteryType" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_batteryAndCharger: { ...newProductFullInfo.prod_batteryAndCharger, batteryType: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Công suất sạc tối đa:</p>
                                <input name="txtChargeType" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_batteryAndCharger: { ...newProductFullInfo.prod_batteryAndCharger, chargeType: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>
                                    Tiện ích:
                                    <input type="button" onClick={
                                                                    ()=>{
                                                                        let name=window.prompt("Tên tiện ích")
                                                                        let value=window.prompt("Mô tả tiện ích")
                                                                        if(name && value) setNewProductFullInfo({...newProductFullInfo, prod_utilities: [...newProductFullInfo.prod_utilities, {[name]: value} ]})
                                                                    }
                                                                } value="+" style={{padding: 0, width: 20+'px'}}/>
                                    <input type="button" onClick={()=>setNewProductFullInfo({...newProductFullInfo, prod_utilities: [newProductFullInfo.prod_utilities.pop()]})} value="-" style={{padding: 0, width: 20+'px'}}/>
                                </p>
                                <div>
                                    {newProductFullInfo.prod_utilities ? ( newProductFullInfo.prod_utilities.map((item, index)=> <div key={index}><p>{Object.keys(item)[0]}:</p> <input type="text" value={Object.values(item)[0]} readOnly/></div>) ):(<></>) }
                                </div>
                            </li>
                            <li>
                                <p>Thiết kế:</p>
                                <input name="txtStructural" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_design: { ...newProductFullInfo.prod_design, structural: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Chất liệu:</p>
                                <input name="txtMaterial" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_design: { ...newProductFullInfo.prod_design, material: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Kích thước</p>
                                <input name="txtSizeAndWeight" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_design: { ...newProductFullInfo.prod_design, size: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Khối lượng:</p>
                                <input name="txtSizeAndWeight" type="text" onChange={e => setNewProductFullInfo({ ...newProductFullInfo, prod_design: { ...newProductFullInfo.prod_design, weight: e.target.value } })} /> <br />
                            </li>
                            <li>
                                <p>Hình ảnh:</p>
                                <input type="file" onChange={uploadImage} accept='image/*' id="imageUpload" multiple />
                            </li>
                            <li className="ImageContainer">
                                {prod_imgs?(showProductImage(prod_imgs)):(<></>)}
                            </li>
                        </form>
                    </div>
                </>
            )}
        </>
    )
}

//hiển thị ảnh sản phẩm
const showProductImage = (props) => {
    return (
        <>
            {props.prod_imgs ? (
                props.prod_imgs.map((item, index) => <div key={index}><img alt="test" src={item} className="ProductImg" onClick={() => alert("xoa anh " + index)}></img></div>)
            ) : (
                props.map((item, index) => <div key={index}><img alt="test" src={item} className="ProductImg" onClick={() => alert("xoa anh " + index)}></img></div>) 
            )}
        </>
    )
}

export default ProductInfo