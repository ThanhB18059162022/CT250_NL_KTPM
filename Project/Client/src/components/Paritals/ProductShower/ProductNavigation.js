import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortDown, faBars } from "@fortawesome/free-solid-svg-icons"

const ProductNavigation = () => {
    return (
        <div className="ProductNavigation">
            <Filter />
            <Sort />
        </div>
    )
}

export default ProductNavigation

const Filter = () => {
    return (
        <div className="Filter">
            <label htmlFor="check_shortlist" className="bars"><FontAwesomeIcon icon={faBars} /></label>
            <input type="checkbox" id="check_shortlist" />
            <div className="sortlist">
                <span>Tất cả</span>
                <label htmlFor="check-list-trademade">Nhãn hiệu <FontAwesomeIcon icon={faSortDown} />
                    <input type="checkbox" id="check-list-trademade"/>
                    <div className="trademade-list">
                        
                            <p>iPhone</p>
                            <p>Nokia</p>
                            <p>Oppo</p>
                        </div>
                </label>
                <span>Bán chạy</span>
            </div>
        </div>
    )
}

const Sort = () => {
    return (
        <select className="Sort">
            <option>Mặc định</option>
            <option>Giá thấp</option>
            <option>Giá cao</option>
            <option>Ngày ra mắt</option>
        </select>
    )
}