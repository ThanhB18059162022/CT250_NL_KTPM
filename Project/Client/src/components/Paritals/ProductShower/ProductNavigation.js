import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ProductNavigation = ({ setOrderStyle, setTrademadeStyle, orderStyle, trademadeList }) => {
    return (
        <div className='ProductNavigation'>
            <Filter
                trademadeList={trademadeList}
                setOrderStyle={setOrderStyle}
                setTrademadeStyle={setTrademadeStyle}
            />
            <Sort setOrderStyle={setOrderStyle} orderStyle={orderStyle} />
        </div>
    );
};

export default ProductNavigation;

const Filter = ({ trademadeList, setTrademadeStyle, setOrderStyle }) => {
    const [isChecked, setIsChecked] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    const onTrademadeChoose = (flag) => {
        setIsChecked(false);
        setTrademadeStyle(flag);
        setCurrentIndex(1);
    };

    return (
        <div className='Filter'>
            <label htmlFor='check_shortlist' className='bars'>
                <FontAwesomeIcon icon={faBars} />
            </label>
            <input type='checkbox' id='check_shortlist' />
            <div className='sortlist'>
                <span
                    style={
                        currentIndex === 0
                            ? { background: "orange", color: "var(--backgroundColor)" }
                            : {}
                    }
                    onClick={() =>{
                        setTrademadeStyle("ALL")
                        setCurrentIndex(0)
                    }}
                >
                    Tất cả
                </span>
                <label
                    style={
                        currentIndex === 1
                            ? { background: "orange", color: "var(--backgroundColor)" }
                            : {}
                    }
                    htmlFor='check-list-trademade'
                >
                    Nhãn hiệu <FontAwesomeIcon icon={faSortDown} />
                    <input
                        type='checkbox'
                        id='check-list-trademade'
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <div className='trademade-list'>
                        {trademadeList.map((item, index) => (
                            <button onClick={() => onTrademadeChoose(item)} key={index}>
                                {item.toLowerCase()}
                            </button>
                        ))}
                    </div>
                </label>
                <span
                style={currentIndex===2?{background:'orange', color:'var(--backgroundColor)'}:{}}
                    onClick={() => {
                        setOrderStyle("DEFAULT");
                        setTrademadeStyle("MAXSELL");
                        setCurrentIndex(2)
                    }}
                >
                    Thịnh hành
                </span>
            </div>
        </div>
    );
};

const Sort = ({ setOrderStyle, orderStyle }) => {
    return (
        <select
            id='sort_product_list'
            value={orderStyle}
            onChange={(e) => setOrderStyle(e.target.value)}
            className='Sort'
        >
            <option value='DEFAULT'>Mặc định</option>
            <option value='UPPRICE'>Giá thấp</option>
            <option value='DOWNPRICE'>Giá cao</option>
        </select>
    );
};
