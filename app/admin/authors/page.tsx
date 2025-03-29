"use server";

import AdminAuthors from "./admin-authors";

export default async function Home(){
    return (
        <>
            <AdminAuthors></AdminAuthors>
        </>
    )
}