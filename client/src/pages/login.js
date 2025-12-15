import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { CurrentUserContext } from "../App";
import { validateLogin } from "../data/users";

import Header from "../components/Header";

function Login() {
    const { setCurrentUser } = useContext(CurrentUserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Header />
            <h2>Welcome Back!</h2>
            <div className="form-generic">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button onClick={async () => {
                    try {
                        const user = await validateLogin(username, password);
                        if (user.role === 'admin') {
                            setCurrentUser(user);
                            navigate("/admin");
                        } if (user.role === 'customer') {
                            setCurrentUser(user);
                            navigate("/");
                        } else {
                            setErrorMessage("Error validating login.");
                        }
                    } catch (error) {
                        setErrorMessage(error.message);
                    }
                }}>Login</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
        </>
    )
}

export default Login; 