"use client";

import { addBook, getBooksWithAuthors } from "@/app/actions/book";
import { BookWithAuthors } from "@/app/lib/types";
import React, { useEffect, useState } from "react";
import BooksTable from "./books-table";
import AdminHeader from "../../components/admin-header";
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

    const submitBook = async (e: React.FormEvent, bookTitle: string, authorId: string) => {
        e.preventDefault();
        if(bookTitle.length === 0 || authorId.length === 0) return;
        const newBook = await addBook(bookTitle, Number(authorId));
    }

    return (
        <>
            {!addDialogState ? <div>
                <AdminHeader showDialog={showDialog} title="Admin Books"></AdminHeader>
                <BooksTable books={books} />
            </div> : 
            <div>
                <AdminAddBook cancelAction={cancelAction} submitAction={submitBook}></AdminAddBook>
            </div> }
        </>
    )
}