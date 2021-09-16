import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import Helper from "../../../helpers"
import Notifications from "../../../common/Notifications"
import "./CartDetail.Style.scss"
import PayPalPayment from "../../../api_services/paypal_payment_service/PayPalPayment"
const CartDetail = () => {
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)

    const [display, setDisplay] =useState(false)

    useEffect(() => {
        const myList = []
        for (let i = 0; i < 10; i++) {
            myList.push({
                id: i,
                src: i % 2 === 0 ? '/image/iphone.jpeg' : '/image/samsung.jpeg',
                name: i % 2 === 0 ? 'iPhone 13 ProMax XXXX XXXX' : 'Samsung Galaxy Fold',
                storage: i % 2 === 0 ? '64' : '128',
                price: i % 2 === 0 ? "800000" : (i % 3 === 0) ? "1200000" : (i % 5 === 0) ? "20000000" : "30000000",
                amount: 1
            })
        }
        setList(myList)

    }, [])

    const onValueChange = (id, value) => {
        const newList = list.map(item => {
            if (item.id === id)
                item.amount = value
            return item
        })

        setList(newList);
    }

    useEffect(() => {
        let count = 0;
        list.forEach(element => count += Number(element.price) * Number(element.amount));
        setTotal(count)
    }, [list])

    return (
        <div className="CartDetail">
            <h3>Giỏ hàng của bạn</h3>
            <div className="detail-wrapper">
                <div className="cart-list">
                    <ul>
                        {list.map((item, index) => <CartItem key={index} info={item} changeValue={onValueChange} />)}
                    </ul>
                </div>
                <div className="cart-transaction">
                    <div className="wrapper">
                        <p>Tạm tính:</p>
                        <p className="total-price">{total}</p>
                        <button onClick={()=>setDisplay(true)}>Thanh toán</button>
                    </div>
                </div>
            </div>
            <CartTransaction display={display} setDisplay={setDisplay}/>
            <PayPalPayment/>
        </div>
    )
}

export default CartDetail;

function CartTransaction(props) {
    const {display, setDisplay} =props

    const [step,setStep] =useState(0)

    const [location, setLocation] = useState(false)

    const [customerinfo, setCustomerInfo] = useState({
        ccid:'',
        email:'',
        name:'',
        gender:-1,
        address:'',
        phone:'',
        transactionway:-1
    })

    const [show,setShow] =useState(false)

    const [notify, setNotify] = useState({
        content:"",
        title:"",
        type:"INFORMATION",
        infoType:"INFO",
    })

    const setAddress = (value)=>{
        setCustomerInfo({...customerinfo,address:value})
    }

    const previousStep = ()=>{
        if(step!==0){
            setStep(step+1)
        }
    }

    const nextStep = ()=>{
        if(step!==-2){
            if(step===0){
                if(validateStep1())
                    setStep(step-1)
            }
            if(step===-1){
                if(validateStep2())
                    setStep(step-1)
            }
        }
        else{
            if(customerinfo.transactionway===-1){
                setNotify({
                    ...notify,
                    content:'Vui lòng chọn hình thức thanh toán!',
                    infoType:'INFO'
                })
                setShow(true)
            }
            else{
                alert("Thanh tóan")
                console.log(customerinfo)
            }
        }
    }

    const validateStep1 = ()=>{
        const validateCCID = Helper.TransactionValidator.checkingCCID(customerinfo.ccid)
        if(!validate(validateCCID)) return false

        const validateEmail = Helper.TransactionValidator.checkingEmail(customerinfo.email)
        if(!validate(validateEmail)) return false

        return true
    }

    const validateStep2 = ()=>{
        const validateName = Helper.TransactionValidator.checkingName(customerinfo.name);
        if(!validate(validateName)) return false

        const validateGender = Helper.TransactionValidator.checkingGender(customerinfo.gender)
        if(!validate(validateGender)) return false

        const validateAddress = Helper.TransactionValidator.checkingAddress(customerinfo.address)
        if(!validate(validateAddress)) return false

        const validatePhone = Helper.TransactionValidator.checkingPhone(customerinfo.phone)
        if(!validate(validatePhone)) return false
        return true
    }

    const validate = (result) => {
        if(!result.result){
            setNotify({
                ...notify,
                title:"Cảnh báo",
                infoType:"WARN",
                content: result.resson
            })
            setShow(true)
            return false
        }
        return true
    }

    return (
        <>
        <div className={`carttransaction ${display?"show":""}`}>
            <div className="transaction-wrapper">
                <div className="transaction-info">
                    <h3>Thông tin đơn hàng của bạn</h3>
                    <div className="wrapper">
                        <p><span>Tổng giá trị đơn hàng: </span></p>
                        <p><span>Thời gian thực hiện: </span></p>
                        <p><span>Số lượng sản phẩm: </span></p>
                        <p><span>Số lượng chi tiết: </span></p>
                    </div>
                </div>
                <div className="transaction-input">
                    <h3>Thông tin thanh toán</h3>
                    <div className="transaction-slider">
                        <div className="slider-element" style={{left:`${100*step}%`}}>
                            <p><input value={customerinfo.ccid} onChange={e=>setCustomerInfo({...customerinfo,ccid:e.target.value})} type="text" placeholder="CMND/CCCD (bắt buộc)" /></p>
                            <p><input value={customerinfo.email} onChange={e=>setCustomerInfo({...customerinfo,email:e.target.value})} type="email" placeholder="Email (bắt buộc)" /></p>
                        </div>
                        <div className="slider-element" style={{left:`${100*(step)}%`}}>
                            <p><input type="text" placeholder="Họ tên (bắt buộc)" value={customerinfo.name} onChange={e=>setCustomerInfo({...customerinfo,name:e.target.value})} /></p>
                            <p>
                                <select value={customerinfo.gender} onChange={e=>setCustomerInfo({...customerinfo,gender:e.target.value})}>
                                    <option value="-1" disabled>Giới tính</option>
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                </select>
                            </p>
                            <p><input type="text" onKeyDown={e=>e.preventDefault()} onClick={()=>setLocation(true)} style={{cursor:"pointer"}} placeholder="Địa chỉ nhận hàng (bắt buộc)" value={customerinfo.address} readOnly={true} /></p>
                            <p><input type="phone" placeholder="Số điện thoại nhận hàng (bắt buộc)" value={customerinfo.phone} onChange={e=>setCustomerInfo({...customerinfo,phone:e.target.value})} /></p>
                        </div>
                        <div className="slider-element" style={{left:`${100*(step)}%`}}>
                            <p><input onClick={()=>setCustomerInfo({...customerinfo,transactionway:1})} name="transaction-way" type="radio"/><span><img alt="zalopay" src="/icon/zalopayicon.png"/></span><span>Zalo pay</span></p>
                            <p><input onClick={()=>setCustomerInfo({...customerinfo,transactionway:2})} name="transaction-way" type="radio"/><span><img alt="paypal" src="/icon/paypalicon.png"/></span><span>Paypal</span></p>
                            <p><input onClick={()=>setCustomerInfo({...customerinfo,transactionway:3})} name="transaction-way" type="radio"/><span><img alt="cod" src="/icon/codicon.png"/></span><span>Thanh toán khi nhận hàng</span></p>
                        </div>
                    </div>
                    <div className="transaction-control">
                        <button onClick={()=>{setDisplay(!display); setStep(0)}} >Hủy</button>
                        <button onClick={previousStep}>Trở lại</button>
                        <button onClick={nextStep}>Tiếp tục</button>
                    </div>
                </div>
            </div>
            <SetLocation display={location} setDisplay={setLocation} setAddress={setAddress} />
        </div>
        <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

function SetLocation(props){
    const {display, setDisplay, setAddress}  = props

    const [location, setLocation] = useState({
        provinces:[],
        districts:[],
        communes: []
    })

    const [chooseLocation, setChooseLocation] = useState({
        province:-1,
        district:-1,
        commune:-1,
        detail:''
    })

    const submitAddress = () => {
       if(chooseLocation.province===-1 || chooseLocation.district ===-1 || 
        chooseLocation.commune===-1 || chooseLocation.detail.trim().length===0){ 
           alert('Chưa nhập đủ thông tin')
            return false;
        }
        const locationString =  Helper.Location.getLocationString(chooseLocation.province,  chooseLocation.district, chooseLocation.commune)
        setAddress(`${chooseLocation.detail}, ${locationString}`)
        setDisplay(false)
    }

    useEffect(()=>{
        (async()=>{
            let _province = await Helper.Location.getProvince()
            setLocation(l=>({...l,provinces:_province}))
        })()
    },[])

    useEffect(()=>{
        (async()=>{
            let _districts = await Helper.Location.getDistricts(chooseLocation.province)
            setLocation(l=>({...l,districts:_districts}))
            setChooseLocation(c=>({...c,district:-1, commune:-1}))
        })()
    },[chooseLocation.province])

    useEffect(()=>{
        (async()=>{
            let _commune = await Helper.Location.getCommunes(chooseLocation.district)
            setLocation(l=>({...l,communes:_commune}))
            setChooseLocation(c=>({...c, commune:-1}))
        })()
    },[chooseLocation.district])

    return(
        <div className={`carttransaction ${display?"show":""}`}>
            <div className="address-wrapper">
                <h3>Thông tin địa chỉ giao hàng</h3>
                <div className="location-group">
                    <select value={chooseLocation.province} onChange={e=>setChooseLocation({...chooseLocation,province:e.target.value})}>
                        <option value="-1" >Chọn tỉnh/ thành phố</option>
                        {location.provinces.map((item,index)=><option key={index} value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="location-group">
                    <select value={chooseLocation.district} onChange={e=>setChooseLocation({...chooseLocation,district:e.target.value})}>
                        <option value="-1" >Chọn huyện/ quận</option>
                        {location.districts.map((item,index)=><option key={index} value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="location-group">
                    <select value={chooseLocation.commune} onChange={e=>setChooseLocation({...chooseLocation,commune:e.target.value})}>
                        <option value="-1" >Chọn xã phường</option>
                        {location.communes.map((item,index)=><option key={index} value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="location-group">
                    <input value={chooseLocation.detail} placeholder="Số nhà/ Tên đường" onChange={e=>setChooseLocation({...chooseLocation,detail:e.target.value})} />
                </div>
                <div className="location-group">
                    <button onClick={()=>setDisplay(false)}>Hủy</button>
                    <button onClick={submitAddress}>Xong</button>
                </div>
            </div>
        </div>
    )
}

function CartItem(props) {
    const { info, changeValue } = props

    const onValueChange = (e) => changeValue(info.id, e.target.value)

    return (
        <li>
            <span className="img"><img src={info.src} alt={info.name} /></span>
            <span className="name">{info.name}</span>
            <span className="storage element" ><span>{info.storage} Gb</span></span>
            <span className="price element" >{info.price} đ</span>
            <span className="amount element" ><input onKeyDown={(evt) => evt.preventDefault()} type="number" min="1" onChange={onValueChange} value={info.amount} /></span>
            <span><FontAwesomeIcon icon={faTimes} /></span>
        </li>
    )
}