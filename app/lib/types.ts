import { Author, Book } from "@prisma/client";

export type BookWithAuthors = (Book & {authors: Author[]});

export enum ADMIN_BOOK_STATE {
    TABLE,
    CREATE,
    DETAILS
}