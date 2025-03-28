"use client";

import { getBooks, getBooksWithAuthors } from "@/app/actions/book";
import { BookWithAuthors } from "@/app/lib/types";
import { Book } from "@prisma/client";
import { useEffect, useState } from "react";

export default function AdminBooks(){
    const [books, setBooks] = useState<BookWithAuthors[] | undefined>(undefined);

    useEffect(() => {
        const fetchBooks = async () => {
            const fetchedBooks = await getBooksWithAuthors();
            setBooks(fetchedBooks);
            console.log(fetchedBooks);
        }
        fetchBooks();
    }, [])

    return (
        <>
            <table className="border-collapse border border-gray-700">
                <thead>
                    <tr className="[&>*]:p-2 [&>*]:border [&>*]:border-gray-700">
                        <td>ID</td>
                        <td>Title</td>
                        <td>Author(s)</td>
                    </tr>
                </thead>
                <tbody>
                    {books?.map((book) => (
                        <tr key={book.id} className="[&>*]:p-2 [&>*]:border [&>*]:border-gray-700">
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.authors[0].name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}