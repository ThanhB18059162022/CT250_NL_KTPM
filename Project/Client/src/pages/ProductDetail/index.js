import DetailAndRate from "../../components/Paritals/DetailAndRate"
import { SearchHeader } from "../../components/Paritals/Header"
import ProductBox from "../../components/Paritals/ProductBox/"
import ProductSuggestion from "../../components/Paritals/ProductSuggestion"
import Footer from "../../components/Paritals/Footer"
import ProductModalDetail from "../../components/Paritals/ProductModalDetail"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
const ProductDetail = () => {
    const { id } = useParams()
    const [show, setShow] = useState(false)

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
        return ()=>document.querySelector('body').style.overflowY = 'auto'
    }, [show])

    useEffect(() => {
        (async () => {
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
                    <ProductBox id={id} />
                    <br />
                    <DetailAndRate id={id}  showDetail={showDetail} />
                    <br />
                    <ProductSuggestion compare={true} id={id} />
            </div>
            <ProductModalDetail active={show} id={id} setActive={setShow} />
            <Footer />
        </div>
    )
}

export default ProductDetail