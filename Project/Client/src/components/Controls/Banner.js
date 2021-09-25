import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
const Banner = () => {
    const banners = [
        {
            src: "./banners/banner1.png",
            alt: "banner 1"
        },
        {
            src: "./banners/banner2.png",
            alt: "banner 2"
        },
        {
            src: "./banners/banner3.png",
            alt: "banner 3"
        },
        {
            src: "./banners/banner4.png",
            alt: "banner 4"
        },
        {
            src: "./banners/banner6.jpeg",
            alt: "banner 5"
        }
    ],
        stack = [
            {
                src: "./banners/a1.jpeg",
                alt: "banner a1"
            },
            {
                src: "./banners/a2.jpeg",
                alt: "banner a2"
            },
            {
                src: "./banners/a1.jpeg",
                alt: "banner a1"
            }
        ]

    const [show,setShow] = useState(0)

    useEffect(()=>{
        let interval = setInterval(()=>setShow(show=>show>0?show-1:banners.length-1),7500)
        return ()=>clearInterval(interval);
    },[banners.length])
    return (
        <div className="Banner">
            <div className="banner-slider">
                <img src={banners[show].src} alt={banners[show].alt}/>
                <button onClick={()=>setShow(show>0?show-1:banners.length-1)} aria-label="Previous banner">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                <button onClick={()=>setShow(show===banners.length-1?0:show+1)} aria-label="Next banner">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div className="banner-stack">
                <ul className="banner-image">
                    {stack.map((item, index) =>
                        <li  key={index}><img src={item.src} alt={item.alt} /></li>
                    )}
                </ul>
            </div>
        </div>
    )
}
export default Banner