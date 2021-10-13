import { AccessCount, Sales, ProductTrendRating} from "../../components/Paritals/Admin";

const OverView = () => {
    return(
        <div className="OverViewContainer">
            <AccessCount/>
            <Sales/>
            <ProductTrendRating/>
        </div>
    )
}

export default OverView