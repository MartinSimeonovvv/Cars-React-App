import { useEffect, useState } from "react";

import CarCard from './CarCard';

function AllListings() {
    const [cars, setCars] = useState([]); 

    useEffect(() => {
        return fetch('https://cars-react-app-server.herokuapp.com/data/cars?sortBy=_createdOn%20desc')
            .then(res => res.json())
            .then(data => {
                setCars(data)
            })
            .catch(err => alert(err.message));
    }, []);

    if (!cars.length) {
        return <p className="no-cars">No cars in database.</p>
    }

    return (
        <section id="car-listings">
            <h1>Car Listings</h1>
            <div className="listings">
                {cars.map((car, index) => {
                    return <CarCard key={index} {...car} />
                })}
            </div>
        </section>
    )
}

export default AllListings;
