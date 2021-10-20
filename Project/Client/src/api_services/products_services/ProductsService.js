// Mới thêm dùng test
import ApiCaller from "../ApiCaller";
const ProductServices = (() => {
    const caller = new ApiCaller();
    const getProducts = async (page = 1, limit = 24, ...column) => {
        let data = await caller.get(`products?page=${page}&limit=${limit}`);
        if (column.length > 0) {
            data.items = data.items.map((item, index) => {
                let subdata = {};
                for (let key of column) subdata[key] = item[key];
                return subdata;
            });
        }
        return data;
    };

    const getProduct = async (id, ...column) => {
        let data = await caller.get(`products/${id}`);
        if (column.length > 0) {
            let subdata = {};
            for (const key of column) {
                subdata[key] = data[key];
            }
            return subdata;
        }
        return data;
    };

    const searchProduct = async (flug) => {
        let data = await caller.get(`products/search/${flug}`);
        return data;
    };

    const getSuggests = async (id, ...column) => {
        id = Number(id);
        let price = (await getProduct(id, "prod_details")).prod_details[0].pd_price;
        let array = await caller.get(
            `products/price/?min=${price - 1500000}&max=${price + 1500000}`
        );
        array = array.items.filter((item) => item.prod_no !== id).map((item) => item.prod_no);
        array = Array.from(new Set(array));
        return await Promise.all(array.map((item) => getProduct(item, ...column)));
    };
    return {
        getProduct,
        getProducts,
        getSuggests,
        searchProduct,
    };
})();

export default ProductServices;
