import { Shelf } from '@prisma/client';
import { prisma } from '../lib/prisma';
"use server";

export async function createShelf(row_num: number, col_num: number){
    return await prisma.shelf.create({
        data: {
            row_num,
            col_num
        }
    }) as Shelf
}