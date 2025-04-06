"use server";

import { Book } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { BookWithAuthors, PlaceInShelf, ShelfSection } from "../lib/types";

export async function getBooks(){
    return await prisma.book.findMany() as Book[];
}

export async function getBooksWithAuthors(){
    return await prisma.book.findMany({
        include: {
            authors: true
        }
    }) as BookWithAuthors[];
}

export async function getBooksByShelfId(shelfId: number){
    return await prisma.book.findMany({
        where: {
            shelfId
        },
        include: {
            authors: true
        }
    }) as BookWithAuthors[]
}

export async function getBookCountInShelf(shelfId: number){
    return await prisma.book.groupBy({
        by: ["col_index", "row_index"],
        where: {
            id: shelfId
        }
    })
}

export async function getBooksByPlaceInShelf(section: ShelfSection){
    return await prisma.book.findMany({
        where: {
            shelfId: section.shelfId,
            row_index: section.row_index,
            col_index: section.col_index
        },
        include: {
            authors: true
        }
    }) as BookWithAuthors[]
}

export async function addBook(title: string, authorId: number, section: ShelfSection){
    return await prisma.book.create({
        data: {
            title: title,
            authors: {
                connect: {
                    id: authorId
                }
            },
            shelfId: section.shelfId,
            row_index: section.row_index,
            col_index: section.col_index,
            place: 0
        }
    }) as Book;
}

export async function createBookWithAuthor(title: string, authorName: string, shelfId: number | undefined, placeInShelf: PlaceInShelf | undefined){
    if(placeInShelf && !shelfId) throw new Error("Invalid arguments: If placeInShelf exists, shelfId cannot be undefined")
    return await prisma.book.create({
        data: {
            title: title,
            authors: {
                create: {
                    name: authorName
                }
            },
            shelfId: shelfId || -1,
            row_index: placeInShelf?.row_index,
            col_index: placeInShelf?.col_index,
            place: placeInShelf?.place
        }
    }) as Book;
}

export async function deleteBookById(bookId: number){
    return await prisma.book.delete({
        where: {
            id: bookId
        }
    }) as Book;
}