"use client";

import AdminHeader from "@/app/components/admin-header";
import { ADMIN_SHELF_STATE } from "@/app/lib/types";
import { useEffect, useState } from "react";
import AdminAddShelf from "./admin-addshelf";
import { createShelf, getAllShelf } from "@/app/actions/shelf";
import { Shelf } from "@prisma/client";
import ShelvesTable from "./shelves-table";

export default function AdminShelves(){

    const [shelfState, setShelfState] = useState<ADMIN_SHELF_STATE>(ADMIN_SHELF_STATE.TABLE);
    const [shelves, setShelves] = useState<Shelf[]>([]);

    useEffect(() => {
        const fetchShelves = async () => {
            const fetchedShelves = await getAllShelf();
            setShelves(fetchedShelves);
        }
        fetchShelves();
    }, [])

    const localCreateShelf = async (e: React.FormEvent, shelfName: string, rowCount: number, colCount: number) => {
        e.preventDefault();
        const newShelf = await createShelf(shelfName, rowCount, colCount);
        console.log(newShelf);
    }

    const tableState = () => (
        <div>
            <AdminHeader title="Admin Shelves" addAction={() => {setShelfState(ADMIN_SHELF_STATE.CREATE)}}></AdminHeader>
            <ShelvesTable shelves={shelves} onShelfClicked={(shelf) => {console.log(shelf)}}></ShelvesTable>
        </div>
    )

    const createState = () => (
        <div>
            <AdminAddShelf cancelAction={() => {setShelfState(ADMIN_SHELF_STATE.TABLE)}} submitAction={localCreateShelf}></AdminAddShelf>
        </div>
    )

    const renderSwitch = (state: ADMIN_SHELF_STATE) => {
        switch(state){
            case ADMIN_SHELF_STATE.TABLE: return tableState()
            case ADMIN_SHELF_STATE.CREATE: return createState()
        }
    }

    return (
        <>
            {renderSwitch(shelfState)}
        </>
    )
}