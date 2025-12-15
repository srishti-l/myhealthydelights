import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../App";

import { createUser } from "../data/users";

import Header from "../components/Header";

function SignUp() {
    const { setCurrentUser } = useContext(CurrentUserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const data = await createUser(formData);
            localStorage.setItem('token', data.token);
            setCurrentUser(data.user);
            navigate('/login');
        } catch (err) {
            setErrorMessage(err.message || "Signup failed");
        }
    };

    return (
        <>
            <Header />
            <h2> Sign Up </h2>
            <form className="form-generic" onSubmit={handleSubmit}>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />

                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />

                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit">Create Account</button>
            </form>
        </>
    )
}

export default SignUp; 