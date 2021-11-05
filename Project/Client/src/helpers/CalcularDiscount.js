const CalcularDiscount = ( total, percent )=>{
    total =  Number(total)
    percent = Number(percent)
    return Math.floor(total - total/100*percent)
}
export default CalcularDiscount