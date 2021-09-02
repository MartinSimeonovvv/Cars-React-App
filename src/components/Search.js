import { useState, useRef } from "react";
import CarCard from "./CarCard";

function Search() {
    const [cars, setCars] = useState([]);
    const searchInput = useRef('');
    
    function onSearch() {
        const query = Number(searchInput.current.value);
        if (Number.isNaN(query) === false && Number(query) > 0) {
            fetch(`https://cars-react-app-server.herokuapp.com/data/cars?where=year%3D${query}`)
                .then(res => res.json())
                .then(cars => {
                    setCars(cars)
                })
                .catch(err => err.message);
        } else {
            alert('Year must be a positive number!')
        }
    }

    return (
        <section id="search-cars">
            <h1>Filter by year</h1>

            <div className="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year" ref={searchInput} />
                <button onClick={onSearch} className="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            <div className="listings">

                {cars.length === 0 ?
                    <p className="no-cars"> No results.</p>
                    : cars.map(car => {
                        return <CarCard key={car._id} {...car} />
                    })}
            </div>
        </section>
    )
}

export default Search;