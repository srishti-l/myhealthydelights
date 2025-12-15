import Header from "./Header";
import { useState, useEffect } from "react";
import { getProductsByCategory } from "../data/products";


function Menu({ categoryName, displayName }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProductsByCategory(categoryName.toLowerCase())
            .then((data) => {
                setItems(Array.isArray(data) ? data : [data]);
                setLoading(false);
            })
            .catch((err) => {
                console.log(`Error fetching ${categoryName}:`, err);
                setLoading(false);
            });
    }, [categoryName]);

    return (

        <>
            <Header />

            <main className="home-body">
                <h2>{displayName}</h2>
                {loading ? (
                    <p>Loading {categoryName}...</p>
                ) : items.length === 0 ? (
                    <p>No {categoryName} available.</p>
                ) : (
                    <ul>
                        {items.map((item) => (
                            <li key={item._id}>
                                <h3>{item.name}</h3>
                                <p>${item.price}</p>
                                <p>Description: {item.description}</p>
                                {item.healthConcerns &&
                                    <p>Health Concerns: {item.healthConcerns}</p>
                                }

                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </>
    );
}

export default Menu;