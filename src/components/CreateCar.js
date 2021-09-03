import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";

import { useFormik } from 'formik';
import * as Yup from 'yup';

function CreateCar({
    history,
}) {
    const { user } = useContext(AuthContext);
    const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({
        initialValues: {
            brand: '',
            model: '',
            description: '',
            year: '',
            imageUrl: '',
            price: ''
        },
        validationSchema: Yup.object({
            year: Yup.number()
                .test(
                    'Is positive?',
                    'ERROR: The number must be greater than 0!',
                    (value) => value > 0
                ),
            price: Yup.number()
                .test(
                    'Is positive?',
                    'ERROR: The number must be greater than 0!',
                    (value) => value > 0
                ),
        }),
        onSubmit: async ({ brand, model, description, year, imageUrl, price }) => {
            try {
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
    })

    return (
        <section id="create-listing">
            <div className="container">
                <form onSubmit={handleSubmit} id="create-form">
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create a listing.</p>
                    <hr />

                    <p>Car Brand</p>
                    <input
                        value={values.brand}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Enter Car Brand"
                        name="brand"
                        required
                    />
                    {touched.brand && errors.brand ? (
                        <div>{errors.brand}</div>
                    ) : null}
                    <p>Car Model</p>
                    <input
                        value={values.model}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Enter Car Model"
                        name="model"
                        required
                    />
                    {touched.model && errors.model ? (
                        <div>{errors.model}</div>
                    ) : null}
                    <p>Description</p>
                    <input
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Enter Description"
                        name="description"
                        required
                    />
                    {touched.description && errors.description ? (
                        <div>{errors.description}</div>
                    ) : null}

                    <p>Car Year</p>
                    <input
                        value={values.year}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        placeholder="Enter Car Year"
                        name="year"
                        required
                    />
                    {touched.year && errors.year ? (
                        <div>{errors.year}</div>
                    ) : null}

                    <p>Car Image</p>
                    <input
                        value={values.imageUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Enter Car Image"
                        name="imageUrl"
                        required
                    />
                    {touched.imageUrl && errors.imageUrl ? (
                        <div>{errors.imageUrl}</div>
                    ) : null}

                    <p>Car Price</p>
                    <input
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        placeholder="Enter Car Price"
                        name="price"
                        required
                    />
                    {touched.price && errors.price ? (
                        <div>{errors.price}</div>
                    ) : null}
                    <hr />
                    <input type="submit" className="registerbtn" value="Create Listing" />
                </form>
            </div>
        </section>
    )
}

export default CreateCar;