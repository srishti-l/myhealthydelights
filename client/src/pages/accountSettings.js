import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import { updateUser, deleteUser, getUserById } from "../data/users";
import { CurrentUserContext } from "../App";

function AccountSettings() {
    const { setCurrentUser } = useContext(CurrentUserContext);
    const [user, setUser] = useState({ firstName: "", lastName: "", username: "", password: "" });
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUserById();
            console.log("ME RESPONSE:", data);
            setUser(data);
            setUsername(data.username);
        };
        fetchUser();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateUser(null, {
            username,
            password,
        });
        alert("Account updated!")
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your account?")) return;
        await deleteUser();
        setCurrentUser(null);
        alert("User deleted");
        navigate('/');
    }

    return (
        <>
            <Header />
            <h3>Hi there, {user.firstName} {user.lastName}</h3>
            <p>Username: {username} </p>
            <form className="account-information" onSubmit={handleUpdate}>
                <label>
                    Username:
                    <input placeholder="Change Username" onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" placeholder="Update Password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Update Account</button>
                    <button type="button" onClick={handleDelete}>Delete Account</button>
                </div>

            </form>
        </>
    )
}

export default AccountSettings; 