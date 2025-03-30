"use client";

import { BookWithAuthors } from "@/app/lib/types";

export default function BookDetails(
    {
        book,
        onBookDelete
    } : {
        book: BookWithAuthors,
        onBookDelete: (book: BookWithAuthors) => void
    }
){
    return (
        <>
            <div className="bg-gray-400 m-2 rounded-xl p-2">
                <div className="flex flex-col mb-4">
                    <ul>
                        <li>ID: {book.id}</li>
                        <li>Title: {book.title}</li>
                        <li>Author(s): {book.authors[0].name}</li>
                    </ul>
                </div>
                <div className="grid grid-cols-1 gap-2">
                        <button onClick={() => onBookDelete(book)} className="p-2 bg-red-700 rounded-lg cursor-pointer">Delete</button>
                    </div>
            </div>
        </>
    )
}