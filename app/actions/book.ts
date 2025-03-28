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

export async function addBook(title: string, author: Author){
    return await prisma.book.create({
        data: {
            title: title,
            authors: {
                connect: author
            }
        }
    }) as Book;
}