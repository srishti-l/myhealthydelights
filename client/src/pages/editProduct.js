import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById, updateProductById, deleteProduct } from "../data/products";

function EditProduct() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [healthConcerns, setHealthConcerns] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await getProductById(id);
            setName(product.name);
            setCategory(product.category);
            setDescription(product.description);
            setPrice(product.price);
            setHealthConcerns(Array.isArray(product.healthConcerns)
                ? product.healthConcerns
                : product.healthConcerns?.split(",") || []);
        };
        fetchProduct();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateProductById(id, {
            name,
            category,
            description,
            price: parseFloat(price),
            healthConcerns: healthConcerns.map(hc => hc.trim())
        });
        alert("Product updated!")
    };

    const handleDelete = async () => {
        await deleteProduct(id);
        alert("Product deleted");
    }

    return (
        <form onSubmit={handleUpdate}>
            <h2>Edit Product</h2>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
            <input placeholder="Health Concerns" value={healthConcerns} onChange={e => setHealthConcerns(e.target.value.split(","))} />
            <button type="submit">Update Product</button>
            <button type="button" onClick={handleDelete}>Delete Product</button>
        </form>
    )

}
export default EditProduct;