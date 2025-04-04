"use server";

import AdminShelves from "./admin-shelves";

export default async function Home(){
    return (
        <>
            <AdminShelves></AdminShelves>
        </>
    )
}