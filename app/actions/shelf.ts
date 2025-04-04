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