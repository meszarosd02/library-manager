import { Author, Book } from "@prisma/client";

export type BookWithAuthors = (Book & {authors: Author[]});

export type PlaceInShelf = {
    row_index: number,
    col_index: number,
    place: number
}

export enum ADMIN_BOOK_STATE {
    TABLE,
    CREATE,
    DETAILS
}