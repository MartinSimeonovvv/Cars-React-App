import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";

import CarCard from "./CarCard";

function MyCars() {
    const [myCars, setMyCars] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        return fetch(`https://cars-react-app-server.herokuapp.com/data/cars?where=_ownerId%3D%22${user.userId}%22&sortBy=_createdOn%20desc`)
            .then(res => res.json())
            .then(cars => {
                setMyCars(cars);
            })
            .catch(err => alert(err.message));
    }, [user.userId]);

    if (!myCars.length) {
        return <p className="no-cars"> You haven't listed any cars yet.</p>;
    }

    return (
        <section id="my-listings">
            <h1>My car listings</h1>
            <div className="listings">
                {
                    myCars.map((car, index) => {
                        return <CarCard key={index} {...car} />
                    })
                }
            </div>
        </section>
    )
}

export default MyCars;