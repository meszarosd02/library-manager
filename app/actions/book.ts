"use server";

import { Author, Book } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { BookWithAuthors } from "../lib/types";

export async function getBooks(){
    return await prisma.book.findMany();
}

export async function getBooksWithAuthors(){
    return await prisma.book.findMany({
        include: {
            authors: true
        }
    }) as BookWithAuthors[];
}

export async function addBook(title: string, authorId: number){
    return await prisma.book.create({
        data: {
            title: title,
            authors: {
                connect: {
                    id: authorId
                }
            }
        }
    }) as Book;
}

export async function createBookWithAuthor(title: string, authorName: string){
    return await prisma.book.create({
        data: {
            title: title,
            authors: {
                create: {
                    name: authorName
                }
            }
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