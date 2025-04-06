"use client";

import GeneralHeader from "./general-header";
import ShelfDisplay from "./shelf-display";

export default function Main(){

    return (
        <>
            <GeneralHeader title="Library Manager"></GeneralHeader>
            <ShelfDisplay></ShelfDisplay>
        </>
    )
}