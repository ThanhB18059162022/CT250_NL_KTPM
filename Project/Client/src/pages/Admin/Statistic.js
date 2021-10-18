import { AccessCount, ProductTrendRating, Sales } from "../../components/Paritals/Admin"

const Statistic = () => {
    return(
        <div className="StatisticContainer">
            <AccessCount/>
            <Sales/>
            <ProductTrendRating/>
        </div>
    )
}

export default Statistic