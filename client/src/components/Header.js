import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App";
import { useContext } from "react";

function Header() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
        navigate("/login");
    }
    return (
        <header className="site-header">
            <div className="main-header">
                <h1 className="center" onClick={() => navigate('/')}>Healthy Delights</h1>
                <div className="right-header">
                    {currentUser ? (
                        <>
                            <p className="logout" onClick={handleLogout}>Logout</p>
                            <Link to="/account">Account Settings</Link>
                        </>

                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>

                    )}
                    {currentUser?.role === 'admin' && (
                        <Link to="/admin">Add & Edit Products</Link>
                    )}
                </div>
            </div>
            <nav className="nav-bar">
                <ol className="nav-bar-items">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to="/menus/cakes">Cakes</Link></li>
                    <li><Link to="/menus/breads">Breads</Link></li>
                    <li><Link to="/menus/bars">Bars</Link></li>
                    <li><Link to="/menus/partyfavorites">Party Favorites</Link></li>
                    <li><Link to="/menus/vegan">Vegan</Link></li>
                    <li><Link to="/customcakeorder">Custom Cake Orders</Link></li>
                </ol>
            </nav>
        </header>
    )
}

export default Header;