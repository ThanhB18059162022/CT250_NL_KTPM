import ApiCaller from "../ApiCaller"

const OrderServices = (()=>{
    const geteway = ['zalo','stripe','paypal']
    const caller = new ApiCaller()
    const getOrder = async(type,id) =>{
        if(!geteway.includes(type) || isNaN(id)) return null

        let data = await caller.get(`${type}/getsaveorder/${id}`)
        return data
    }
    return{
        getOrder
    }
})()

export default OrderServices