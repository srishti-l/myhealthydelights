import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { getProductsByCategory } from "../../data/products";
import Menu from "../../components/Menu";


function Cakes() {
    return (
        <Menu categoryName={"Cakes"} displayName={"Cakes"}/>
    )
}

export default Cakes;