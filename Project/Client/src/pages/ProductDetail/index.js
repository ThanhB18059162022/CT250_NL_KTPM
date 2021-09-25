import DetailAndRate from "../../components/Paritals/DetailAndRate"
import { SearchHeader } from "../../components/Paritals/Header"
import ProductBox from "../../components/Paritals/ProductBox/"
import ProductSuggestion from "../../components/Paritals/ProductSuggestion"
import Footer from "../../components/Paritals/Footer"
import ProductModalDetail from "../../components/Paritals/ProductModalDetail"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { caller } from "../../api_services/servicesContainer"
import Notifications from "../../common/Notifications"
const ProductDetail = (props) => {
    const { id } = useParams()
    const [show, setShow] = useState(false)

    const [product, setProduct] = useState(null)
    const showDetail = () => {
        setShow(true)
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        (async () => {
            let data = await caller.get(`products/${id}`)
            console.log(data)
            setProduct(data)
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            })
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
                    <ProductSuggestion  arr={[]}/>
                </>
                }
            </div>

            <ProductModalDetail active={show} productId={1} setActive={setShow} />
            <Footer />
        </div>
    )
}

export default ProductDetail