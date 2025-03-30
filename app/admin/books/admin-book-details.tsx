"use client";

import { BookWithAuthors } from "@/app/lib/types";

export default function AdminBookDetails(
    {
        book
    } : {
        book: BookWithAuthors
    }
){
    return (
        <>
            {book.id}
        </>
    )
}