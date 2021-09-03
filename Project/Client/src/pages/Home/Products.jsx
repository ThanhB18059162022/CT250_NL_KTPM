import React, { useState, useEffect } from "react";

import "./Products.jsx.css";

// Mới thêm dùng test

import {
  ApiCaller,
  ProductsService,
} from "../../api_services/servicesContainer";

const service = new ProductsService(new ApiCaller());

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Async kinh vl
    (async () => {
      try {
        const {
          items: prods,
          next: nextPage,
          previous: prePage,
        } = await service.getProducts();

        setProducts(prods);

        console.log(nextPage, prePage);
      } catch (error) {
        console.log("Lỗi r");
      }
    })();
  }, []);

  function renderList() {
    return products.map((p) => (
      <li className="product" key={p.prod_no}>
        {p.prod_name}
        <img
          src={"http://localhost:8000" + p.prod_img}
          alt="Chả có hình"
          width={150}
        />
        <p>Ram {p.prod_ram}</p>
        <p>CPU {p.prod_cpu}</p>
        <p>Pin {p.prod_battery}</p>
      </li>
    ));
  }

  return (
    <>
      <hr />
      <h3 style={{ color: "white" }}>Hiện danh sách ở đây</h3>
      <hr />
      <ul className="products">{products ? renderList() : "Loading ...."}</ul>
    </>
  );
}
