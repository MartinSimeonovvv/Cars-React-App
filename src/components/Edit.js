import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";

function Edit({
    match,
    history
}) {
    const [singleCar, setSingleCar] = useState([]);
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

    const onEditSubmitHandler = async (e) => {
        e.preventDefault();
        const { brand, model, description, year, imageUrl, price } = e.target;

        try {
            if (Number(year.value) <= 0 || Number(price.value) <= 0) {
                throw new Error('Year and price must be positive numbers!');
            } 

            await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'X-Authorization': user.authToken },
                body: JSON.stringify({
                    brand: brand.value,
                    model: model.value,
                    description: description.value,
                    year: year.value,
                    imageUrl: imageUrl.value,
                    price: price.value
                })
            })
        } catch (error) {
            return alert(error.message);
        }

        return history.push(`/details/${match.params.id}`);
    }

    return (
        <section id="edit-listing">
            <div className="container">

                <form onSubmit={onEditSubmitHandler} id="edit-form">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr />

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" defaultValue={singleCar.brand} required/>

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" defaultValue={singleCar.model} required/>

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" defaultValue={singleCar.description} required/>

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" defaultValue={singleCar.year} required/>

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" defaultValue={singleCar.imageUrl} required/>

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" defaultValue={singleCar.price} required/>

                    <hr />
                    <input type="submit" class="registerbtn" value="Edit Listing" />
                </form>
            </div>
        </section>
    )
}

export default Edit;