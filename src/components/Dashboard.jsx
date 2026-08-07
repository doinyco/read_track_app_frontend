import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import React from "react";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");

    const [yearlyGoal, setYearlyGoal] = useState(
        localStorage.getItem("readingGoal") || ""
    );

    const [goalInput, setGoalInput] = useState("");



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

    const saveGoal = () => {

        if (!goalInput || Number(goalInput) <= 0) {

            return;

        }

        localStorage.setItem(
            "readingGoal",
            goalInput
        );


        setYearlyGoal(goalInput);

        setGoalInput("");

    };


    const changeGoal = () => {

        localStorage.removeItem(
            "readingGoal"
        );


        setYearlyGoal("");

        setGoalInput("");

    };




    if(error) {

        return <h2>{error}</h2>;

    }



    if(!dashboard) {

        return <h2>Loading...</h2>;

    }

    const today = new Date();


    const greeting =

        today.getHours() < 12

        ? "Good Morning"

        : today.getHours() < 18

        ? "Good Afternoon"

        : "Good Evening";

    const formattedDate = today.toLocaleDateString(
        "en-US",
        {
            weekday:"long",
            month:"long",
            day:"numeric"
        }
    );

    const completedBooks = dashboard.stats.books_read;

    const goalPercentage = yearlyGoal

        ? Math.min(
            (completedBooks / Number(yearlyGoal)) * 100,
            100
        )

        : 0;

    return (

        <div className="dashboard">

            <Sidebar />

            <main className="dashboard-content">

                {/* Welcome */}

                <section className="welcome">

                    <h1>

                        {greeting}, {dashboard.username} 

                    </h1>

                    <p>

                        {formattedDate}

                    </p>

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

                {/* Reading Goal */}

                <section className="goal-card">

                    <div className="goal-header">


                        <h2>

                            Reading Goal for 2026

                        </h2>

                    </div>

                    {

                        !yearlyGoal ? (



                            <div>


                                <h3>
                                    Set your reading goal
                                </h3>



                                <input

                                    type="text"

                                    placeholder="Number of books"

                                    value={goalInput}

                                    onChange={(e)=>
                                        setGoalInput(e.target.value)
                                    }

                                />



                                <button
                                    onClick={saveGoal}
                                >

                                    Save Goal

                                </button>



                            </div>

                        ) : (

                            <>
                                <h3>

                                    {completedBooks} of {yearlyGoal} Books Completed

                                </h3>

                                <p className="goal-percentage">

                                    {Math.round(goalPercentage)}% completed

                                </p>

                                <div className="goal-progress">


                                    <div

                                        className="goal-progress-fill"

                                        style={{
                                            width:`${goalPercentage}%`
                                        }}

                                    >

                                    </div>

                                </div>


                                <p>

                                    {

                                        Number(yearlyGoal) - completedBooks > 0

                                        ?

                                        `${Number(yearlyGoal) - completedBooks} books left to reach your goal.`

                                        :

                                        "🎉 Goal completed!"

                                    }


                                </p>

                                <button
                                    onClick={changeGoal}
                                >

                                    Change Goal

                                </button>

                            </>

                        )

                    }

                </section>


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