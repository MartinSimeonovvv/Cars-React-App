import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";

function CreateCar({
    history,
}) {
    const { user } = useContext(AuthContext);
    const [createFormInput, setCreateFormInput] = useState({
        brand: '',
        model: '',
        description: '',
        year: '',
        imageUrl: '',
        price: '',
    });
    const onCreateSubmitHandler = async (e) => {
        e.preventDefault();
        const { brand, model, description, year, imageUrl, price } = createFormInput;

        try {
            if (Number(year) < 0 || Number(price) < 0) {
                throw new Error('Year and price must be positive numbers!');
            }

            if (!brand || !model || !description || !year || !imageUrl || !price) {
                throw new Error('All fields must be filled!');
            }

            const response = await fetch('https://cars-react-app-server.herokuapp.com/data/cars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Authorization': user.authToken },
                body: JSON.stringify({ brand, model, description, year, imageUrl, price })
            })

            if (!response.ok) {
                throw new Error((await response.json()).message);
            }

            history.push('/all-listings');
        } catch (error) {
            alert(error.message);
        }
    }

    const handleChange = (e) => {
        setCreateFormInput({
            ...createFormInput,
            [e.target.name]: e.target.value
        })
    }

    return (
        <section id="create-listing">
            <div className="container">
                <form onSubmit={onCreateSubmitHandler} id="create-form">
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create a listing.</p>
                    <hr />

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" onChange={handleChange} value={createFormInput.brand} />

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" onChange={handleChange} value={createFormInput.model} />

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" onChange={handleChange} value={createFormInput.description} />

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" onChange={handleChange} value={createFormInput.year} />

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" onChange={handleChange} value={createFormInput.imageUrl} />

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" onChange={handleChange} value={createFormInput.price} />

                    <hr />
                    <input type="submit" className="registerbtn" value="Create Listing" />
                </form>
            </div>
        </section>
    )
}

export default CreateCar;