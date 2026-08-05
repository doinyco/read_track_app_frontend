import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";


function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();


    const logout = () => {

        navigate("/login");

    };


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
                        location.pathname === "/discover"
                        ? "active"
                        : ""
                    }
                    to="/discover"
                >
                    Discover
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

                <button
                    onClick={logout}
                >
                    Logout
                </button>


            </nav>


        </aside>

    );

}


export default Sidebar;