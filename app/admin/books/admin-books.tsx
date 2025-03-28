"use client";

import { getBooks } from "@/app/actions/book";
import { Book } from "@prisma/client";
import { useEffect, useState } from "react";

export default function AdminBooks(){
    const [books, setBooks] = useState<Book[] | undefined>(undefined);

    useEffect(() => {
        const fetchBooks = async () => {
            const fetchedBooks = await getBooks();
            setBooks(fetchedBooks);
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
                            <td>{book.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}