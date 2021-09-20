const Exchange = (() =>{
    const toMoney = (text) =>{
        const money = Number(text)
        return Intl.NumberFormat('vi-VN',{
            currency:'VND'
        }).format(money)
    }
    return {toMoney}
})()

export default Exchange