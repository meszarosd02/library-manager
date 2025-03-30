"use client";

import { addBook, getBooksWithAuthors } from "@/app/actions/book";
import { ADMIN_BOOK_STATE, BookWithAuthors } from "@/app/lib/types";
import React, { useEffect, useState } from "react";
import BooksTable from "./books-table";
import AdminHeader from "../../components/admin-header";
import AdminAddBook from "./admin-addbook";
import { Author } from "@prisma/client";
import AdminBookDetails from "./admin-book-details";

export default function AdminBooks(){
    const [books, setBooks] = useState<BookWithAuthors[]>([]);
    const [selectedBook, setSelectedBook] = useState<BookWithAuthors | undefined>(undefined);

    const [adminBookState, setAdminBookState] = useState<ADMIN_BOOK_STATE>(ADMIN_BOOK_STATE.TABLE);

    useEffect(() => {
        const fetchBooks = async () => {
            const fetchedBooks = await getBooksWithAuthors();
            setBooks(fetchedBooks);
        }
        fetchBooks();
    }, [])
    const bookDetails = (book: BookWithAuthors) => {
        setSelectedBook(book);
        setAdminBookState(ADMIN_BOOK_STATE.DETAILS);
    }

    const showDialog = () => {
        setAdminBookState(ADMIN_BOOK_STATE.CREATE)
    }

    const cancelAction = (e: React.MouseEvent) => {
        e.preventDefault();
        setAdminBookState(ADMIN_BOOK_STATE.TABLE);
    }

    const submitBook = async (e: React.FormEvent, bookTitle: string, author: Author) => {
        e.preventDefault();
        if(bookTitle.length === 0) return;
        await addBook(bookTitle, author.id);
    }

    const renderSwitch = (state: ADMIN_BOOK_STATE) => {
        switch(state){
            case ADMIN_BOOK_STATE.TABLE: return tableState();
            case ADMIN_BOOK_STATE.CREATE: return createState();
            case ADMIN_BOOK_STATE.DETAILS: 
                if(!selectedBook) return;
                return detailsState(selectedBook);
        }
    }

    const tableState = () => (
        <div>
            <AdminHeader showDialog={showDialog} title="Admin Books"></AdminHeader>
            <BooksTable books={books} onBookClicked={bookDetails} />
        </div>
    )

    const createState = () => (
        <div>
            <AdminAddBook cancelAction={cancelAction} submitAction={submitBook}></AdminAddBook>
        </div>
    )

    const detailsState = (book: BookWithAuthors) => (
        <div>
            <AdminBookDetails book={book} />
        </div>
    )

    return (
        <>
            {renderSwitch(adminBookState)}
        </>
    )
}