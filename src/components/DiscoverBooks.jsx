import { useState } from "react";
import api from "../api/axios";
import BookSearch from "./BookSearch";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function DiscoverBooks() {

    const [message, setMessage] = useState("");

    const addBook = async (selectedBook) => {

        try {

            await api.post(
                "/reading-list/library/books",
                {
                    title: selectedBook.title,
                    author: selectedBook.author,
                    isbn: selectedBook.isbn,
                    total_pages: selectedBook.total_pages,
                    cover_image_url: selectedBook.cover_image_url,
                    description: selectedBook.description,
                    source: selectedBook.source
                }
            );

            setMessage("Book added to library!");

        } catch(error) {

            console.log(error);


            setMessage(
                error.response?.data?.error ||
                "Failed to add book"
            );

        }

    };

    return (

        <div className="dashboard">

            {/* Shared Sidebar */}

            <Sidebar />

            {/* Main Content */}

            <main className="dashboard-content">

                <section className="welcome">

                    <h1>
                        Discover Books
                    </h1>

                    <p>
                        Search for books and add them to your reading list.
                    </p>

                </section>

                {
                    message && (

                        <p>
                            {message}
                        </p>

                    )
                }

                <BookSearch
                    onAddBook={addBook}
                />
            </main>

        </div>
    );

}

export default DiscoverBooks;