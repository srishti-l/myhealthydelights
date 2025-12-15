import './App.css';
import './styles.css';

import { createContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Admin from "./pages/admin";
import Home from './pages/home';
import Cakes from './pages/menus/cakes';
import Breads from './pages/menus/breads';
import Bars from './pages/menus/bars';
import Vegan from './pages/menus/vegan';
import PartyFavorites from './pages/menus/partyfavorites';
import CustomCakeOrder from './pages/customcake';
import Login from './pages/login';
import AddProduct from './pages/addProduct';
import EditProduct from './pages/editProduct';
import AllProducts from './pages/allProducts';
import AccountSettings from './pages/accountSettings';
import SignUp from './pages/signUp';

const CurrentUserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setCurrentUser({ jwt: token });
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "menus/cakes",
          element: <Cakes />,
        },
        {
          path: "menus/breads",
          element: <Breads />,
        },
        {
          path: "menus/bars",
          element: <Bars />,
        },
        {
          path: "menus/partyfavorites",
          element: <PartyFavorites />,
        },
        {
          path: "menus/vegan",
          element: <Vegan />,
        },
        {
          path: "customcakeorder",
          element: <CustomCakeOrder />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "account",
          element: <AccountSettings />
        },
        {
          path: "admin",
          element: <Admin />,
          children: [
            {
              path: "allproducts",
              element: <AllProducts />,
            },
            {
              path: "addproduct",
              element: <AddProduct />,
            },
            {
              path: "editproduct/:id",
              element: <EditProduct />,
            }
          ]
        },
      ],
    },
  ]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <RouterProvider router={router} />
    </CurrentUserContext.Provider>
  );
}

export default App;
export { CurrentUserContext };