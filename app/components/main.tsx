"use client";

import { addBook } from "../actions/book";

export default function Main(){
    const handleAddBook = async () => {
        const fetchedBook = await addBook("Teszt könyv", 1);
        console.log(fetchedBook);
    }

    return (
        <>
            <button className="p-4 m-4 bg-gray-400 border border-gray-700 rounded-xl">CLICK!</button>
        </>
    )
}