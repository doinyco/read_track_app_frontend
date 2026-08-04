const BASE_URL = "http://127.0.0.1:5000";


export async function getUserLibrary(userId) {

    const res = await fetch(
        `${BASE_URL}/reading-list/library/books?user_id=${userId}`
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Failed to fetch library");
    }

    return data;
}


export async function addBookToLibrary(bookData) {

    const res = await fetch(
        `${BASE_URL}/reading-list/library/books`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookData)
        }
    );


    const data = await res.json();


    if (!res.ok) {
        throw new Error(data.error || "Failed to add book");
    }


    return data;
}