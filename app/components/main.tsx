"use client";

import { useEffect, useState } from "react";
import { addAuthor, getAuthorById } from "../actions/author";
import { Author } from "@prisma/client";
import { addBook } from "../actions/book";

export default function Main(){
    const [testAuthor, setTestAuthor] = useState<Author | undefined>(undefined);
    useEffect(() => {
        const getAuthor = async () => {
            const fetchedAuthor = await getAuthorById(1);
            setTestAuthor(fetchedAuthor);
        }
        getAuthor();
    }, [])

    const handleAddBook = async () => {
        if(!testAuthor) return;
        const fetchedBook = await addBook("Teszt könyv", testAuthor);
        console.log(fetchedBook);
    }

    return (
        <>
            <button className="p-4 m-4 bg-gray-400 border border-gray-700 rounded-xl">CLICK!</button>
        </>
    )
}