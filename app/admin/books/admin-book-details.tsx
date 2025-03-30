"use client";

import AdminHeader from "@/app/components/admin-header";
import { BookWithAuthors } from "@/app/lib/types";
import BookDetails from "./book-details";

export default function AdminBookDetails(
    {
        book,
        backAction,
        onBookDelete
    } : {
        book: BookWithAuthors,
        backAction: () => void,
        onBookDelete: (book: BookWithAuthors) => void
    }
){
    return (
        <>
            <AdminHeader title={book.title} backAction={backAction}></AdminHeader>
            <BookDetails book={book} onBookDelete={onBookDelete}></BookDetails>
        </>
    )
}