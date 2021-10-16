const TransactionValidator = (()=>{
    // internal
    const isEmpty = (text) =>{
        return text.trim().length===0
    }

    //external
    const checkingCCID = (ccid) =>{
        if(ccid.trim().length!==9 || isNaN(Number(ccid))){
            return {
                result: false,
                resson:'Số CMND/CCCD không hợp lệ! Yêu cầu có 9 ký tự số'
            }
        }
        return {result:true}
    }

    const checkingEmail = (email) =>{
        if(isEmpty(email) || !email.match(/@/) || !email.match(/(?=^[^@])/) || !email.match(/[^@]+$/) || !email.includes('.') ||  email.includes(' ')){
            return{
                result:false,
                resson:'Email không hợp lệ!'
            }
        }
        return { result:true }
    }

    const checkingName = (name) =>{
        if(isEmpty(name) || name.trim().length<4 || !name.includes(' ')){
            return{
                result:false,
                resson:'Tên không hợp lệ!'
            }
        }
        return {result:true}
    }

    const checkingGender = (gender) =>{
        if(gender===-1){
            return{
                result:false,
                resson:'Bạn chưa chọn giới tính'
            }
        }
        return {result:true}
    }

    const checkingAddress = (address) =>{
        if(isEmpty(address)){
            return{
                result:false,
                resson:'Địa chỉ không hợp lệ!'
            }
        }
        return {result:true}
    }

    const checkingPhone = (phone) =>{
        if(isEmpty(phone) || isNaN(Number(phone)) || phone.trim().length>12 || phone.trim().length<=9){
            return{
                result:false,
                resson:'Số điện thoại không hợp lệ!'
            }
        }
        return {result:true}
    }
    
    const checkingUsername = (text) =>{
        if(isEmpty(text)){
            return{
                result:false,
                message:'Bạn chưa nhập tài khoản!'
            }
        }
        return {result:true}
    }

    const checkingPassword = (text) =>{
        if(isEmpty(text)){
            return{
                result:false,
                message:'Bạn chưa nhập mật khẩu!'
            }
        }
        return {result:true}
    }

    return{
        checkingCCID, checkingEmail,
        checkingName, checkingGender,
        checkingPhone, checkingAddress,
        checkingUsername, checkingPassword
    }
})()

export default TransactionValidator