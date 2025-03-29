"use server";

import { Author } from "@prisma/client";
import {prisma} from "../lib/prisma";

export async function getAuthors(){
    return await prisma.author.findMany() as Author[]
}

export async function getAuthorById(authorId: number){
    return await prisma.author.findFirst({
        where: {
            id: authorId
        }
    }) as Author
}

export async function addAuthor(name: string){
    return await prisma.author.create({
        data: {
            name
        }
    }) as Author
}

export async function searchAuthor(query: string){
    return await prisma.author.findMany({
        where: {
            name: {
                contains: query
            }
        }
    }) as Author[]
}