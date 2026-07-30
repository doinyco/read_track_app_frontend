import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Dashboard.css";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        api.get("/dashboard")
            .then((response) => {
                setDashboard(response.data);
            })
            .catch((error) => {
                console.log(error);
                setError("Unable to load dashboard");
            });

    }, []);

    if (error) {
        return <h2>{error}</h2>;
    }
    if (!dashboard) {
        return <h2>Loading...</h2>;
    }
    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <h1>
                    📚 Read Track
                </h1>
                <nav>
                    <p className="active">
                        Dashboard
                    </p>
                    <p>
                        My Library
                    </p>
                    <p>
                        Discover
                    </p>
                </nav>
            </aside>

            {/* Main Dashboard */}
            <main className="dashboard-content">

                {/* User Profile */}
                <section className="profile">

                    <div className="avatar">
                        {dashboard.username
                            .slice(0, 2)
                            .toUpperCase()}
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
                        Good evening, {dashboard.username}.
                    </h1>
                    <p>
                        Welcome back to your reading journey.
                    </p>
                    <button>
                        Add Book
                    </button>
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

                {/* Currently Reading */}
                <section className="book-section">

                    <h2>
                        Currently Reading
                    </h2>
                    <div className="book-grid">
                        {dashboard.currently_reading.map((book) => (
                            <div
                                className="book-card"
                                key={book.reading_list_id}
                            >
                                {book.cover_image_url && (

                                    <img
                                        src={book.cover_image_url}
                                        alt={book.title}
                                    />

                                )}
                                <div>
                                    <h3>
                                        {book.title}
                                    </h3>
                                    <p>
                                        {book.author}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Completed Books */}

                <section className="book-section">
                    <h2>
                        Completed Books
                    </h2>
                    <div className="book-grid">
                        {dashboard.completed_books.map((book) => (
                            <div
                                className="book-card"
                                key={book.reading_list_id}
                            >
                                {book.cover_image_url && (
                                    <img
                                        src={book.cover_image_url}
                                        alt={book.title}
                                    />
                                )}
                                <h3>
                                    {book.title}
                                </h3>
                                <p>
                                    {book.author}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Wishlist */}

                <section className="book-section">
                    <h2>
                        Wishlist
                    </h2>
                    <div className="book-grid">
                        {dashboard.wishlist.map((book) => (
                            <div
                                className="book-card"
                                key={book.reading_list_id}
                            >
                                {book.cover_image_url && (
                                    <img
                                        src={book.cover_image_url}
                                        alt={book.title}
                                    />
                                )}
                                <h3>
                                    {book.title}
                                </h3>
                                <p>
                                    {book.author}
                                </p>
                            </div>

                        ))}

                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;