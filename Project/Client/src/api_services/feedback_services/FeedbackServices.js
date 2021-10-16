import ApiCaller from "../ApiCaller";

const FeedbackServices =(()=>{
    const caller = new ApiCaller()

    const getFeedback = async(product,page=1, limit=24, ...column) => {
        let data = await caller.get(`products/${product}/feedbacks?page=${page}&limit=${limit}`)
        if(column.length===0)
            return data.items
        let subdata = data.items.map(item=>{
            let sub = {}
            for (const key of column) {
                sub[key] = item[key]
            }
            return sub
        })
        return subdata
    }

    const sendFeedback = async(product, data) => {
        await caller.post(`products/${product}/feedbacks`,data)
        return true
    }

    return{
        getFeedback,
        sendFeedback
    }
})()

export default FeedbackServices