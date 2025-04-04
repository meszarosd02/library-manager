"use server";

import { Shelf } from '@prisma/client';
import { prisma } from '../lib/prisma';

export async function createShelf(name: string, row_num: number, col_num: number){
    return await prisma.shelf.create({
        data: {
            name,
            row_num,
            col_num
        }
    }) as Shelf
}

export async function getAllShelf(){
    return await prisma.shelf.findMany() as Shelf[]
}

export async function getShelfById(shelfId: number){
    return await prisma.shelf.findFirst({
        where: {
            id: shelfId
        }
    }) as Shelf
}

export async function deleteShelfById(shelfId: number){
    return await prisma.shelf.delete({
        where: {
            id: shelfId
        }
    }) as Shelf
}