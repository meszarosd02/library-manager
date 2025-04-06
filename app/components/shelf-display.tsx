'use client';

import { Author, Shelf } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAllShelf } from "../actions/shelf";
import { SHELF_STATE, ShelfSection } from "../lib/types";
import ShelfView from "./shelf-view";
import GeneralHeader from "./general-header";
import SubShelfView from "./subshelf-view";
import AdminHeader from "./admin-header";
import { addBook, createBookWithAuthor } from "../actions/book";
import AddBook from "./add-book";

export default function ShelfDisplay() {
    const [shelves, setShelves] = useState<Shelf[]>([]);
    const [selectedShelf, setSelectedShelf] = useState<Shelf | undefined>(undefined);

    const [shelfState, setShelfState] = useState<SHELF_STATE>(SHELF_STATE.LIST);
    const [selectedSection, setSelectedSection] = useState<ShelfSection>();

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
        setShelfState(SHELF_STATE.SINGLE_VIEW);
    }

    const renderList = () => {
        return (
            <>
                <GeneralHeader title="Shelves"></GeneralHeader>
                <div className="flex flex-row">
                    {shelves.map((shelf) => (
                        <div key={shelf.id} onClick={() => shelfClick(shelf)} className="p-2 border border-gray-200 hover:bg-gray-600 cursor-pointer">
                            {shelf.name}
                        </div>
                    ))}
                </div>
            </>
        )
    }

    const renderSingleView = () => {
        if (!selectedShelf) return;

        const sectionClick = (row: number, col: number) => {
            setSelectedSection({ shelfId: selectedShelf.id, row_index: row, col_index: col })
            setShelfState(SHELF_STATE.SECTION_VIEW);
        }

        return (
            <>
                <AdminHeader title={selectedShelf.name} backAction={() => setShelfState(SHELF_STATE.LIST)}></AdminHeader>
                <ShelfView shelf={selectedShelf} onSectionClick={sectionClick}></ShelfView>
            </>
        )
    }

    //SHELF_STATE.SECTION_VIEW
    const renderSectionView = () => {
        if (!selectedSection) return;
        const addAction = async () => {
            /*await addBook("Teszt", 1, {
                shelfId: selectedSection.shelfId,
                row_index: selectedSection.row_index,
                col_index: selectedSection.col_index
            })*/
            setShelfState(SHELF_STATE.ADD_BOOK);
        }
        return (
            <>
                <AdminHeader title={`Section row:${selectedSection.row_index + 1}, col:${selectedSection.col_index + 1}`} addAction={addAction} backAction={() => setShelfState(SHELF_STATE.SINGLE_VIEW)}></AdminHeader>
                <SubShelfView shelfId={selectedSection?.shelfId} row_index={selectedSection?.row_index} col_index={selectedSection?.col_index}></SubShelfView>
            </>
        )
    }

    const renderAddBook = () => {
        if (!selectedSection) return;

        const submitBook = async (e: React.FormEvent, bookTitle: string, author: Author | string) => {
            e.preventDefault();
            if (typeof author === "object" && "name" in author) { // author param is Author type
                await addBook(bookTitle, author.id, selectedSection);
            } else {
                await createBookWithAuthor(bookTitle, author, selectedSection);
            }
        }

        return (
            <>
                <AdminHeader title={`Add book row:${selectedSection.row_index + 1}, col:${selectedSection.col_index + 1}`}></AdminHeader>
                <AddBook cancelAction={() => { setShelfState(SHELF_STATE.SINGLE_VIEW) }} submitAction={submitBook}></AddBook>
            </>
        )
    }

    const renderSwitch = (state: SHELF_STATE) => {
        switch (state) {
            case SHELF_STATE.LIST: return renderList();
            case SHELF_STATE.SINGLE_VIEW: return renderSingleView();
            case SHELF_STATE.SECTION_VIEW: return renderSectionView();
            case SHELF_STATE.ADD_BOOK: return renderAddBook();
        }
    }

    return (
        <>
            {renderSwitch(shelfState)}
        </>
    )
}