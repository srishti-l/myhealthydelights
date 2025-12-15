import { useState } from "react";
import CustomCakeForm from "../components/CustomCakeForm";
import Header from "../components/Header";
import { createCakeOrder } from "../data/customcake";

function CustomCakeOrder() {
    const initialFormData = {
        name: "",
        contactNumber: "",
        guestCount: "",
        tierCount: "",
        baseFlavor: "",
        filling: "",
        size: "",
        shape: "",
        colors: "",
        writing: "",
        inspiration: null,
        dietaryRestrictions: "",
        misc: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createCakeOrder(formData)
            console.log('Order: ', response)
            alert("Cake Request Submitted! We'll be in touch shortly");
            setFormData(initialFormData);
        } catch (err) {
            console.error(err);
            alert("Sorry! There was a problem submitting your order");
        }

    }

    return (
        <>
            <Header />
            <CustomCakeForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </>
    )
}

export default CustomCakeOrder;