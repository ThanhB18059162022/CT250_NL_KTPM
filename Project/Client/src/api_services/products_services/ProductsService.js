// Mới thêm dùng test
import ApiCaller from '../ApiCaller'
const ProductServices = (() => {
  const caller = new ApiCaller()

  return {
    getProducts: async (page = 1, limit = 24, ...column) => {
      let data = await caller.get(`products?page=${page}&limit=${limit}`)
      if (column.length > 0) {
        data.items = data.items.map((item, index) => {
          let subdata = {}
            for(let key of column)
              subdata[key] =item[key]
          return subdata
        })
      }
      return data
    },

    getProduct: async (id, ...column) => {
      let data = await caller.get(`products/${id}`)
      if(column.length>0){
        let subdata = {}
        for (const key of column) {
          subdata[key] = data[key]
        }
        return subdata
      }
      return data
    }
  }

})()

export default ProductServices
