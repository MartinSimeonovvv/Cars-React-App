import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

function Details({
    match,
    history
}) {
    const [singleCar, setSingleCar] = useState({});
    const { user } = useContext(AuthContext);
    const url = `https://cars-react-app-server.herokuapp.com/data/cars/${match.params.id}`

    useEffect(() => {
        return fetch(url)
            .then(res => res.json())
            .then(car => {
                setSingleCar(car);
            })
            .catch(err => alert(err.message));
    }, [match.params.id]);

    const deleteSingleCar = async () => {
        if (window.confirm('Please confirm to delete')) {
            await fetch(url, {
                method: 'DELETE',
                headers: { 'X-Authorization': user.authToken }
            });

            history.push('/all-listings');
        }
    }

    return (
        <section id="listing-details">
            <h1>Details</h1>
            <div className="details-info">
                <img src={singleCar.imageUrl} />
                <hr />
                <ul className="listing-props">
                    <li><span>Brand:</span>{singleCar.brand}</li>
                    <li><span>Model:</span>{singleCar.model}</li>
                    <li><span>Year:</span>{singleCar.year}</li>
                    <li><span>Price:</span>{singleCar.price}$</li>
                </ul>

                <p className="description-para">{singleCar.description}</p>

                {user.userId === singleCar._ownerId && (
                    <div className="listings-buttons">
                        <Link to={`/edit/${match.params.id}`} className="button-list">Edit</Link>
                        <a onClick={deleteSingleCar} className="button-list">Delete</a>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Details;