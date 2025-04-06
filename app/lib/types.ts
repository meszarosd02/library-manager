import { Author, Book } from "@prisma/client";

export type BookWithAuthors = (Book & {authors: Author[]});

export type PlaceInShelf = {
    row_index: number,
    col_index: number,
    place: number
}

export type ShelfSection = {
    shelfId: number,
    row_index: number,
    col_index: number
}

export enum ADMIN_BOOK_STATE {
    TABLE,
    CREATE,
    DETAILS
}

export enum ADMIN_SHELF_STATE {
    TABLE,
    CREATE
}

export enum SHELF_STATE {
    LIST,
    SINGLE_VIEW,
    SECTION_VIEW,
    ADD_BOOK
}