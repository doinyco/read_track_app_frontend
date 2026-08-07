import { useEffect, useState } from "react";
import api from "../api/axios";
import "./LibraryBookCard.css";
import React from "react";


function LibraryBookCard({ book, refresh }) {

    const [pages, setPages] = useState("");
    const [progress, setProgress] = useState(null);


    const loadLatestProgress = async () => {

        try {

            const response = await api.get(
                `/reading-list/books/${book.reading_list_id}/progress/latest`
            );

            setProgress(response.data);


        } catch(error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadLatestProgress();

    }, []);

    const updateProgress = async () => {


        if (!pages) {

            alert("Enter pages read");

            return;

        }

        try {


            await api.post(

                `/reading-list/books/${book.reading_list_id}/progress`,

                {
                    pages_read: Number(pages)
                }

            );

            setPages("");

            await loadLatestProgress();

            refresh();

        } catch(error) {


            console.log(error);


            alert(
                error.response?.data?.error ||
                "Could not update progress"
            );


        }

    };

    const markComplete = async () => {

        try {


            await api.patch(

                `/reading-list/books/${book.reading_list_id}`,

                {
                    status:"completed"
                }

            );


            refresh();

        } catch(error) {


            console.log(error);


            alert("Could not complete book");


        }

    };

    const startReading = async () => {

        try {


            await api.patch(

                `/reading-list/books/${book.reading_list_id}`,

                {
                    status:"currently_reading"
                }

            );

            refresh();

        } catch(error) {


            console.log(error);


            alert("Could not start reading");

        }

    };
    const deleteBook = async () => {


        const confirmDelete = window.confirm(
            "Remove this book from your library?"
        );


        if(!confirmDelete){

            return;

        }

        try {


            await api.delete(

                `/reading-list/books/${book.reading_list_id}`

            );

            refresh();

        } catch(error) {

            console.log(error);

            alert("Could not remove book");


        }

    };

    return (
        <div className="library-card">

            {
                book.cover_image_url && (

                    <img

                        src={book.cover_image_url}

                        alt={book.title}

                    />

                )
            }

            <div className="book-info">

                <h2>
                    {book.title}
                </h2>

                <p>
                    {book.author}
                </p>


                {
                    book.status === "want_to_read" && (

                        <>

                            <span className="badge">
                                Want To Read
                            </span>


                            <div className="button-group">


                                <button
                                    onClick={startReading}
                                >
                                    Start Reading
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={deleteBook}
                                >
                                    Remove
                                </button>


                            </div>


                        </>

                    )
                }

                {
                    book.status === "currently_reading" && (

                        <>

                            <span className="badge">
                                Reading
                            </span>

                            {/* Reading Progress Bar */}

                            <div className="reading-progress">


                                <div className="progress-info">


                                    <span>

                                        Page {progress?.pages_read || 0}

                                        {" "}of{" "}

                                        {book.total_pages}

                                    </span>



                                    <span>

                                        {progress?.percentage_completed || 0}%

                                    </span>


                                </div>

                                <div className="progress-bar">


                                    <div

                                        className="progress-fill"

                                        style={{
                                            width:`${progress?.percentage_completed || 0}%`
                                        }}

                                    >

                                    </div>


                                </div>
                            </div>

                            <input

                                type="number"

                                placeholder="Pages read"

                                value={pages}

                                onChange={(e)=>
                                    setPages(e.target.value)
                                }

                            />

                            <div className="button-group">

                                <button
                                    onClick={updateProgress}
                                >
                                    Update Progress
                                </button>

                                <button
                                    onClick={markComplete}
                                >
                                    Mark Complete
                                </button>


                            </div>

                            <div className="button-group">


                                <button
                                    className="delete-button"
                                    onClick={deleteBook}
                                >
                                    Remove
                                </button>


                            </div>

                        </>

                    )
                }

                {
                    book.status === "completed" && (

                        <>

                            <span className="badge">
                                Completed ✓
                            </span>

                            <div className="button-group">

                                <button
                                    className="delete-button"
                                    onClick={deleteBook}
                                >
                                    Remove
                                </button>


                            </div>


                        </>

                    )
                }

            </div>


        </div>


    );

}

export default LibraryBookCard;