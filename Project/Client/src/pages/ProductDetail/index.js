import DetailAndRate from "../../components/Paritals/DetailAndRate";
import { SearchHeader } from "../../components/Paritals/Header";
import ProductBox from "../../components/Paritals/ProductBox/";
import ProductSuggestion from "../../components/Paritals/ProductSuggestion";
import Footer from "../../components/Paritals/Footer";
import ProductModalDetail from "../../components/Paritals/ProductModalDetail";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./style.scss";
const ProductDetail = () => {
    const { id } = useParams();
    const [show, setShow] = useState(false);

    const showDetail = () => {
        setShow(true);
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        if (show) document.querySelector("html").style.overflow = "hidden";
        else document.querySelector("html").style.overflowY = "visible";
        return () => (document.querySelector("html").style.overflowY = "visible");
    }, [show]);

    useEffect(() => {
        (async () => {
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: "smooth",
            });
        })();
    }, [id]);

    return (
        <div className='Home'>
            <SearchHeader />
            <br />
            <div className='home-body-content'>
                <ProductBox id={id} />
                <br />
                <DetailAndRate id={id} showDetail={showDetail} />
                <br />

                {id && <div className='facebook_comment'>
                    <h3>Bình luận về sản phẩm</h3>
                    <div
                        style={{ width: "100%" }}
                        className='fb-comments'
                        data-width='100%'
                        data-href={`http://octopuszyuw.com:3000/product/${id}`}
                        data-numposts='5'
                    ></div>
                     </div>}
                    <ProductSuggestion id={id} />
               
            </div>

            <ProductModalDetail active={show} id={id} setActive={setShow} />
            <Footer />
        </div>
    );
};

export default ProductDetail;
