
import { useEffect, useState } from "react";
import api from "../api/axios";
import LibraryBookCard from "./LibraryBookCard";
import Sidebar from "./Sidebar";
import "./Library.css";


function Library() {


    const [books, setBooks] = useState([]);

    const [activeTab, setActiveTab] = useState(
        "currently_reading"
    );

    const [error, setError] = useState("");

    const loadLibrary = async () => {

        try {

            const response = await api.get(
                "/reading-list/library/books"
            );

            setBooks(response.data);

        } catch(error) {

            console.log(error);

            setError("Unable to load library");

        }
    };

    useEffect(() => {


        loadLibrary();


    }, []);

    const filteredBooks = books.filter(

        (book) =>

            book.status === activeTab

    );

    if(error) {


        return <h2>{error}</h2>;

    }

    return (

        <div className="dashboard">

            {/* Sidebar */}

            <Sidebar />

            {/* Main Content */}

            <main className="dashboard-content">

                <div className="library-page">
                    <h1>
                        My Library
                    </h1>

                    {/* Tabs */}
                    <div className="library-tabs">

                        <button


                            className={

                                activeTab === "currently_reading"

                                ? "active-tab"

                                : ""

                            }
                            onClick={() =>

                                setActiveTab(
                                    "currently_reading"
                                )

                            }
                        >

                            Currently Reading


                        </button>

                        <button
                            className={

                                activeTab === "want_to_read"

                                ? "active-tab"

                                : ""

                            }

                            onClick={() =>

                                setActiveTab(
                                    "want_to_read"
                                )

                            }
                        >

                            Want To Read


                        </button>

                        <button
                            className={

                                activeTab === "completed"

                                ? "active-tab"

                                : ""

                            }

                            onClick={() =>

                                setActiveTab(
                                    "completed"
                                )

                            }

                        >

                            Completed

                        </button>
                    </div>

                    {/* Books */}

                    <div className="library-books">

                        {

                            filteredBooks.length === 0 && (


                                <p>

                                    No books here yet.

                                </p>


                            )

                        }

                        {

                            filteredBooks.map((book)=>(

                                <LibraryBookCard

                                    key={
                                        book.reading_list_id
                                    }

                                    book={book}

                                    refresh={
                                        loadLibrary
                                    }
                                />
                            ))

                        }

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Library;