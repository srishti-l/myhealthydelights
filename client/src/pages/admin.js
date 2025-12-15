import Header from "../components/Header";
import { Link, Outlet } from "react-router-dom";

function Admin() {
    return (
        <>
            <Header />
            <div>
                <h2>Admin Dashboard</h2>
            </div>
            <div className="admin-ops">
                <ol>
                    <li className="admin-items"><Link to="addproduct">Add Product</Link></li>
                    <li className="admin-items"><Link to="allproducts">Edit Product</Link></li>
                </ol>
            </div>
            <Outlet />
        </>
    );
}

export default Admin;