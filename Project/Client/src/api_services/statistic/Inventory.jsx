// Tham khảo https://www.npmjs.com/package/react-chartjs-2
// https://www.youtube.com/watch?v=Ly-9VTXJlnA

import React, { useState, useEffect } from "react";
import { Pie, defaults } from "react-chartjs-2";
import "./TotalSellSeasonsBarChart.jsx.css";
import StatisticService from "./StatisticService";
import expSer from "./exportExcelService";
import exp_ico from "./exp-ico.png";

const service = new StatisticService();

function Inventory() {
    const [invetory, setInvetory] = useState([]);
    const [data, setData] = useState({});
    const [products, setProducts] = useState([]);
    const [prodName, setProdName] = useState("");

    //#region Init

    async function initValues() {
        const invetory = await service.getInventory();
        setInvetory(invetory);

        const products = await service.getProducts();
        setProducts(products);
    }

    function initDefaults() {
        defaults.color = "black";
        defaults.font.size = 18;
    }

    useEffect(() => {
        initValues();
        initDefaults();
    }, []);

    useEffect(() => {
        setData({
            labels: invetory.map((item) => item.label),
            datasets: [
                {
                    label: "Hàng tồn",
                    data: invetory.map((item) => item.value),
                    backgroundColor: backgroundColors,
                    borderWidth: 1,
                    borderColor: "hsl(0, 0%, 47%)",
                    hoverBorderColor: "hsl(0, 0%, 0%)",
                    borderRadius: 3,
                },
            ],
        });
    }, [invetory]);

    //#endregion

    function exportReport() {
        let rp = [["Tên sản phẩm", "Số lượng"]];

        for (let i = 0; i < invetory.length; i++) {
            const { label, value } = invetory[i];
            var r = getRp(label, value);
            rp = rp.concat(r);
        }

        expSer(rp, "report.xlsx");
    }

    function getRp(label, value) {
        return [[label, value]];
    }

    async function addProduct() {
        if (!prodName) return;

        const product = await service.getInventoryOfProducts(prodName);

        if (product === undefined) {
            alert("Sản phẩm không tồn tại");
            return;
        }
        setInvetory((prev) => {
            return [
                ...prev,
                {
                    label: product.label,
                    value: product.value,
                },
            ];
        });
    }

    return (
        <>
            <div className='exp-ico' onClick={exportReport}>
                <h4> Xuất báo ra file excel</h4>
                <img src={exp_ico} alt='No Img' />
            </div>

            <div className='pie'>
                <Pie data={data} options={options} />
            </div>

            <div className='exp-ico'>
                <label for='product'>Tìm các sản phẩm khác: </label>
                <input
                    list='products'
                    name='product'
                    id='product'
                    className='lefty'
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                />
                <datalist id='products'>
                    {products.map((item) => (
                        <option value={item} key={item} />
                    ))}
                </datalist>

                <button onClick={addProduct} className='lefty'>
                    Thêm
                </button>
            </div>
        </>
    );
}

const backgroundColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 99, 132, 0.6)",
];

const options = {
    plugins: {
        title: {
            display: true,
            text: "Sản Phẩm Gần Hết Hàng",
            font: {
                size: 30,
            },
            color: "blue",
            padding: {
                bottom: 20,
            },
        },
        legend: {
            position: "right",
            labels: {
                color: "black",
                weight: "900",
            },
        },
    },
};

export default Inventory;
