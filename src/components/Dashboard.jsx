
import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Dashboard.css";
import Sidebar from "./Sidebar";


function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");

    const loadDashboard = async () => {

        try {

            const response = await api.get("/dashboard");

            setDashboard(response.data);

        } catch(error) {

            console.log(error);

            setError("Unable to load dashboard");

        }

    };
    useEffect(() => {


        loadDashboard();


    }, []);

    if(error) {


        return <h2>{error}</h2>;


    }

    if(!dashboard) {


        return <h2>Loading...</h2>;


    }

    return (


        <div className="dashboard">

            {/* Shared Sidebar */}

            <Sidebar />

            {/* Main Content */}


            <main className="dashboard-content">

                {/* Profile */}


                <section className="profile">



                    <div className="avatar">


                        {
                            dashboard.username
                            .slice(0,2)
                            .toUpperCase()
                        }


                    </div>

                    <div>

                        <h2>

                            {dashboard.username}

                        </h2>

                        <p>

                            avid reader

                        </p>

                    </div>

                </section>

                {/* Welcome */}


                <section className="welcome">


                    <h1>

                        Good evening, {dashboard.username}

                    </h1>

                    <p>

                        Welcome back to your reading journey.

                    </p>

                </section>

                {/* Statistics */}


                <section className="stats-container">

                    <div className="stat-card">

                      <h3>

                            Books Read

                        </h3>

                        <h1>

                            {dashboard.stats.books_read}

                        </h1>

                        <p>

                            all time

                        </p>

                    </div>

                    <div className="stat-card">

                        <h3>

                            Currently Reading

                        </h3>

                        <h1>

                            {dashboard.stats.currently_reading}

                        </h1>



                        <p>

                            books

                        </p>

                    </div>

                    <div className="stat-card">


                        <h3>

                            Wishlist

                        </h3>

                        <h1>

                            {dashboard.stats.want_to_read}

                        </h1>



                        <p>

                            books

                        </p>



                    </div>

                </section>

                {/* Book Preview */}

                <BookSection

                    title="Currently Reading"

                    books={dashboard.currently_reading}

                />

                <BookSection

                    title="Completed Books"

                    books={dashboard.completed_books}

                />

                <BookSection

                    title="Wishlist"

                    books={dashboard.wishlist}

                />

            </main>

        </div>
    );

}









function BookSection({title, books}) {


    return (


        <section className="book-section">



            <h2>

                {title}

            </h2>





            <div className="book-grid">



                {

                    books.map((book)=>(



                        <div

                            className="book-card"

                            key={book.reading_list_id}

                        >




                            {

                                book.cover_image_url && (


                                    <img

                                        src={book.cover_image_url}

                                        alt={book.title}

                                    />


                                )


                            }






                            <h3>

                                {book.title}

                            </h3>






                            <p>

                                {book.author}

                            </p>




                        </div>



                    ))


                }



            </div>



        </section>


    );

}


export default Dashboard;