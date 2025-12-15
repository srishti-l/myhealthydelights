import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../data/products";

function AllProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (e) {
                console.error("Failed to fetch products: ", e)
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <div>
                <h2>Existing Products</h2>
                {products.length === 0 ? (
                    <p>No Products Found</p>
                ) : (
                    <ul>
                        {products.map((p) => (
                            <li key={p._id}>
                                <Link to={`/admin/editproduct/${p.id}`}>{p.name}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default AllProducts; 