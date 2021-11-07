import ProductNavigation from "./ProductNavigation";
import ProductList from "./ProductList";
import "./ProductShower.Style.scss";
import { useState, useEffect, useCallback } from "react";
import ProductServices from "../../../api_services/products_services/ProductsService";
import { caller } from "../../../api_services/servicesContainer";
const ProductShower = () => {
    const [list, setList] = useState([]);

    const [nextPage, setNextPage] = useState(1);

    const [isNextPage, setIsNextPage] = useState(true);

    const [trademadeList, setTrademadeList] = useState([]);

    const [orderStyle, setOrderStyle] = useState("DEFAULT");

    const [trademadeStyle, setTrademadeStyle] = useState("ALL");

    const toNextPage = () => {
        isNextPage && setNextPage(nextPage + 1);
    };

    const orderItems = useCallback(
        (data) => {
            switch (orderStyle) {
                case "UPPRICE":
                    setList(
                        data.sort((a, b) => a.prod_price - b.prod_price).map((item) => item.prod_no)
                    );
                    break;
                case "DOWNPRICE":
                    setList(
                        data
                            .sort((a, b) => a.prod_price - b.prod_price)
                            .reverse()
                            .map((item) => item.prod_no)
                    );
                    break;
                default:
                    setList(data.map((item) => item.prod_no));
            }
        },
        [setList, orderStyle]
    );

    const trademadeItems = useCallback(
        (data) => {
            if(trademadeStyle==='ALL'){
                orderItems(data)
                return
            }
            if(trademadeStyle==='MAXSELL'){
                const items = data.map(item=>{
                    const totalSell = item.prod_details.reduce((pre, item)=>pre + item.pd_sold,0)
                    item.totalSell =totalSell
                    return item
                })
                orderItems(items.sort((a,b)=>a.totalSell - b.totalSell).reverse())
                return
            }
                
            const filterList = data.filter(item=>item.prod_manufacturer.brand_name.toLowerCase()===trademadeStyle.toLowerCase())
            orderItems(filterList);
        },
        [orderItems, trademadeStyle]
    );

    useEffect(() => {
        (async () => {
            let data = await ProductServices.getProducts(1, 24 * nextPage);
            data.items = await Promise.all(
                data.items.map(async (item) => {
                    let dataItem = await ProductServices.getProduct(item.prod_no);
                    return {
                        ...item,
                        ...dataItem,
                    };
                })
            );
            !data.next && setIsNextPage(false);
            trademadeItems(data.items);
        })();
    }, [nextPage, orderStyle,trademadeItems, trademadeStyle]);

    useEffect(()=>{
        let load = true;
        (async()=>{
            let data = (await caller.get('products/brands')).map(item=>item.brand_name)
            if(!load) return
            setTrademadeList(data)
        })()
        return () => load = false
    },[])
    return (
        <div className='ProductShower'>
            <ProductNavigation
                setTrademadeStyle={setTrademadeStyle}
                trademadeList={trademadeList}
                setOrderStyle={setOrderStyle}
                orderStyle={orderStyle}
            />
            <ProductList list={list} toNextPage={toNextPage} isNextPage={isNextPage} />
        </div>
    );
};

export default ProductShower;
