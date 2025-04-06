'use client';

import { getBooksByPlaceInShelf } from "../actions/book";
import BooksTable from "../admin/books/books-table";
import { BookWithAuthors } from "../lib/types";
import { useEffect, useState } from "react";

export default function SubShelfView(
    {
        shelfId,
        row_index,
        col_index
    } : {
        shelfId: number
        row_index: number,
        col_index: number
    }
){
    const [books, setBooks] = useState<BookWithAuthors[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const fetchedBooks = await getBooksByPlaceInShelf({shelfId, row_index, col_index});
            setBooks(fetchedBooks);
        }
        fetchBooks();
    }, [])
    return (
        <>
            <BooksTable books={books} onBookClicked={() => {}}></BooksTable>
        </>
    )
}