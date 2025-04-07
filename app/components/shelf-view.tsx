'use client';

import { Shelf } from "@prisma/client";
import { useEffect } from "react";
import { getBookCountInShelf } from "../actions/book";

export default function ShelfView(
    {
        shelf,
        onSectionClick
    }: {
        shelf: Shelf,
        onSectionClick: (row: number, col: number) => void
    }
) {

    return (
        <>
            <div className={`grid`} style={{ gridTemplateColumns: `repeat(${shelf.col_num}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${shelf.row_num}, minmax(0, 1fr))` }}>
                {Array.from({ length: (shelf.col_num) * (shelf.row_num) }).map((_, i) => (
                    <div key={i} className="border border-gray-200 p-2 h-10 cursor-pointer hover:bg-gray-600" onClick={() => onSectionClick(Math.floor(i / shelf.col_num), i % shelf.col_num)}>{Math.floor(i / shelf.col_num)+1},{(i % shelf.col_num) + 1}</div>
                ))}
            </div>
        </>
    )
}