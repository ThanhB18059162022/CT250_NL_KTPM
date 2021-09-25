const Exchange = (() =>{
    const toMoney = (text) =>{
        const money = Number(text)
        return Intl.NumberFormat('vi-VN',{
            currency:'VND'
        }).format(money)
    }

    const toLocalDate = string =>{
        const date = new Date(string);
        return Intl.DateTimeFormat("vi-VN").format(date)
    }
    return {toMoney, toLocalDate}
})()

export default Exchange