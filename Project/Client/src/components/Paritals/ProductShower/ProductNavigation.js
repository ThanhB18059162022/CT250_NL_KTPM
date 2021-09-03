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
                <span>Nhãn hiệu <FontAwesomeIcon icon={faSortDown} /></span>
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