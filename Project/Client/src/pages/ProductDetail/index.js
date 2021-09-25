import DetailAndRate from "../../components/Paritals/DetailAndRate"
import { SearchHeader } from "../../components/Paritals/Header"
import ProductBox from "../../components/Paritals/ProductBox/"
import ProductSuggestion from "../../components/Paritals/ProductSuggestion"
import Footer from "../../components/Paritals/Footer"
import ProductModalDetail from "../../components/Paritals/ProductModalDetail"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { caller } from "../../api_services/servicesContainer"

const ProductDetail = () => {
    const { id } = useParams()
    const [show, setShow] = useState(false)

    const [product, setProduct] = useState(null)

    const [suggest, setSuggest] = useState([])
    const showDetail = () => {
        setShow(true)
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        show ? document.querySelector('body').style.overflowY = 'hidden' : document.querySelector('body').style.overflowY = 'auto'
    }, [show])

    useEffect(() => {
        (async () => {
            let data = await caller.get(`products/${id}`)
            setProduct(data)
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            })
            let sg = await caller.get(`products/price?min=${data.prod_details[0].price - 1000000}&max=${data.prod_details[0].price + 1000000}&page=1&limit=24`)
            setSuggest(sg.items)
        })()
    }, [id])

    return (
        <div className="Home">
            <SearchHeader />
            <br />
            <div className="home-body-content">
                {product !== null && <>
                    <ProductBox product={product} />
                    <br />
                    <DetailAndRate product={product} showDetail={showDetail} />
                    <br />
                    <ProductSuggestion arr={suggest} />
                </>
                }
            </div>
            {product !== null &&
                <ProductModalDetail active={show} product={product} setActive={setShow} />
            }
          
            <Footer />
        </div>
    )
}

export default ProductDetail