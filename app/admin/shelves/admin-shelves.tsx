"use client";

import AdminHeader from "@/app/components/admin-header";
import { ADMIN_SHELF_STATE } from "@/app/lib/types";
import { useState } from "react";
import AdminAddShelf from "./admin-addshelf";
import { createShelf } from "@/app/actions/shelf";

export default function AdminShelves(){

    const [shelfState, setShelfState] = useState<ADMIN_SHELF_STATE>(ADMIN_SHELF_STATE.TABLE);

    const localCreateShelf = async (e: React.FormEvent, shelfName: string, rowCount: number, colCount: number) => {
        e.preventDefault();
        const newShelf = await createShelf(shelfName, rowCount, colCount);
        console.log(newShelf);
    }

    const tableState = () => (
        <div>
            <AdminHeader title="Admin Shelves" addAction={() => {setShelfState(ADMIN_SHELF_STATE.CREATE)}}></AdminHeader>
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