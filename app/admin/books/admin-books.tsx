"use client";

import { getBooks, getBooksWithAuthors } from "@/app/actions/book";
import { BookWithAuthors } from "@/app/lib/types";
import { ChangeEvent, useEffect, useState } from "react";
import BooksTable from "./books-table";
import AdminHeader from "./admin-header";
import AdminAddBook from "./admin-addbook";

export default function AdminBooks(){
    const [books, setBooks] = useState<BookWithAuthors[]>([]);
    const [addDialogState, setAddDialogState] = useState<boolean>(false);

    useEffect(() => {
        const fetchBooks = async () => {
            const fetchedBooks = await getBooksWithAuthors();
            setBooks(fetchedBooks);
        }
        fetchBooks();
    }, [])

    const showDialog = () => {
        setAddDialogState(true);
    }

    const cancelAction = (e: React.MouseEvent) => {
        e.preventDefault();
        setAddDialogState(false);
    }

    return (
        <>
            {!addDialogState ? <div>
                <AdminHeader showDialog={showDialog}></AdminHeader>
                <BooksTable books={books} />
            </div> : 
            <div>
                <AdminAddBook cancelAction={cancelAction} submitAction={() => {}}></AdminAddBook>
            </div> }
        </>
    )
}