import React from "react";
import { Link } from "react-router-dom";

function Home(){

    return(
        <>
        <nav >
        <ul className="flex gap-4">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/weather"}>Weather</Link></li>
        </ul>
        </nav>
        </>
    )
}
export default Home