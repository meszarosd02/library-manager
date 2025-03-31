"use client";

import { addBook, createBookWithAuthor, deleteBookById, getBooksWithAuthors } from "@/app/actions/book";
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

    const fetchBooks = async () => {
        const fetchedBooks = await getBooksWithAuthors();
        setBooks(fetchedBooks);
    }

    useEffect(() => {
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

    const submitBook = async (e: React.FormEvent, bookTitle: string, author: Author | string) => {
        e.preventDefault();
        if(bookTitle.length === 0) return;
        if(typeof author === "object" && "name" in author){ // author param is Author type
            await addBook(bookTitle, author.id);
        }else{
            await createBookWithAuthor(bookTitle, author);
        }
        await fetchBooks();
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
            <AdminHeader addAction={showDialog} title="Admin Books"></AdminHeader>
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
            <AdminBookDetails book={book} backAction={() => setAdminBookState(ADMIN_BOOK_STATE.TABLE)} onBookDelete={bookDelete} />
        </div>
    )

    const bookDelete = async (book: BookWithAuthors) => {
        const deletedBook = await deleteBookById(book.id);
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== deletedBook.id))
        setAdminBookState(ADMIN_BOOK_STATE.TABLE);
    }

    return (
        <>
            {renderSwitch(adminBookState)}
        </>
    )
}