'use client';

import { Shelf } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAllShelf } from "../actions/shelf";

export default function ShelfDisplay() {
    const [shelves, setShelves] = useState<Shelf[]>([]);

    useEffect(() => {
        const fetchShelves = async () => {
            const fetchedShelves = await getAllShelf();
            setShelves(fetchedShelves);
        }
        fetchShelves();
    }, []);

    const shelfClick = (shelf: Shelf) => {

    }

    return (
        <>
            <div className="flex flex-row">
                {shelves.map((shelf) => (
                    <div onClick={() => shelfClick(shelf)} className="p-2 border border-gray-200 hover:bg-gray-600 cursor-pointer">
                        {shelf.name}
                    </div>
                ))}
            </div>
        </>
    )
}