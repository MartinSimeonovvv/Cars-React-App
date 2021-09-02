import { Link } from "react-router-dom";

function CarCard({
    brand,
    model,
    year,
    price,
    imageUrl,
    _id
}) {
    return (
        <div className="listing">
            <div className="preview">
                <img src={imageUrl} />
            </div>
            <h2>{brand} {model}</h2>
            <div className="info">
                <div className="data-info">
                    <h3>Year: {year}</h3>
                    <h3>Price: {price} $</h3>
                </div>
                <div className="data-buttons">
                    <Link to={`/details/${_id}`} className="button-carDetails">Details</Link>
                </div>
            </div>
        </div>
    )
}

export default CarCard;