"use client";

import AdminHeader from "@/app/components/admin-header";
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
            <AdminHeader title={book.title}></AdminHeader>
        </>
    )
}