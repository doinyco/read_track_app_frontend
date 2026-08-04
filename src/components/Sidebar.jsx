import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";


function Sidebar() {

    const location = useLocation();


    return (

        <aside className="sidebar">


            <h1>
                📚 Read Track
            </h1>


            <nav>


                <Link
                    className={
                        location.pathname === "/dashboard"
                        ? "active"
                        : ""
                    }
                    to="/dashboard"
                >
                    Dashboard
                </Link>



                <Link
                    className={
                        location.pathname === "/library"
                        ? "active"
                        : ""
                    }
                    to="/library"
                >
                    My Library
                </Link>




                <Link
                    className={
                        location.pathname === "/discover"
                        ? "active"
                        : ""
                    }
                    to="/discover"
                >
                    Discover
                </Link>

                <Link
                    to="/login"
                >
                    Logout
                </Link>



            </nav>


        </aside>

    );

}


export default Sidebar;