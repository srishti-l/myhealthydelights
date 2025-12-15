import { useState } from "react";
import { createProduct } from "../data/products";

function AddProduct() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [healthConcerns, setHealthConcerns] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct({ name, category, description, price: parseFloat(price), healthConcerns: healthConcerns.map(hc => hc.trim()) });
            setName("");
            setCategory("");
            setDescription("");
            setPrice("");
            setHealthConcerns([]);
            alert("Product added");
        } catch (e) {
            alert("Error: " + e.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
            <input placeholder="Health Concerns" value={healthConcerns} onChange={e => setHealthConcerns(e.target.value.split(","))} />
            <button type="submit">Add Product</button>
        </form>
    )
}

export default AddProduct;