import { useState } from "react";
import api from "../api/axios";

function BookSearch({ onAddBook }) {

    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);

    const searchBooks = async () => {
        try {
            const response = await api.get(
                `/books/search?q=${query}`
            );

            setBooks(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>

            <input
                placeholder="Search book"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />


            <button onClick={searchBooks}>
                Search
            </button>


            {books.map((book) => (

                <div key={book.google_id}>

                    <img
                        src={book.cover_image_url}
                        alt={book.title}
                        width="100"
                    />


                    <h3>
                        {book.title}
                    </h3>


                    <p>
                        {book.author}
                    </p>


                    <button
                        onClick={async () => {

                            await onAddBook(book);

                            setBooks([]);

                        }}
                    >
                        Add to Library
                    </button>


                </div>

            ))}

        </div>
    );
}

export default BookSearch;