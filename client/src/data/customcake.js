const API_URL = process.env.REACT_APP_API_URL;

const createCakeOrder = async (formData) => {
    const res = await fetch(`${API_URL}/customcakeorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit order");
    }

    return await res.json();
};

export { createCakeOrder };