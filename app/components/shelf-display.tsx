'use client';

import { Shelf } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAllShelf } from "../actions/shelf";
import { SHELF_STATE } from "../lib/types";
import ShelfView from "./shelf-view";

export default function ShelfDisplay() {
    const [shelves, setShelves] = useState<Shelf[]>([]);
    const [selectedShelf, setSelectedShelf] = useState<Shelf | undefined>(undefined);

    const [shelfState, setShelfState] = useState<SHELF_STATE>(SHELF_STATE.LIST);

    useEffect(() => {
        const fetchShelves = async () => {
            const fetchedShelves = await getAllShelf();
            setShelves(fetchedShelves);
        }
        fetchShelves();
    }, []);

    useEffect(() => {
        if (!selectedShelf) return;
    }, [selectedShelf])

    const shelfClick = (shelf: Shelf) => {
        setSelectedShelf(shelf);
        setShelfState(SHELF_STATE.SINGE_VIEW);
    }

    const renderList = () => {
        return (
            <div className="flex flex-row">
                {shelves.map((shelf) => (
                    <div onClick={() => shelfClick(shelf)} className="p-2 border border-gray-200 hover:bg-gray-600 cursor-pointer">
                        {shelf.name}
                    </div>
                ))}
            </div>
        )
    }

    const renderSingleView = () => {
        if(!selectedShelf) return;
        return (
            <ShelfView shelf={selectedShelf}></ShelfView>
        )
    }

    const renderSwitch = (state: SHELF_STATE) => {
        switch (state) {
            case SHELF_STATE.LIST: return renderList();
            case SHELF_STATE.SINGE_VIEW: return renderSingleView();
        }
    }

    return (
        <>
            {renderSwitch(shelfState)}
        </>
    )
}