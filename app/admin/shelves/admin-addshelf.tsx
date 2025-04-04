"use client";

import { useState } from "react";

export default function AdminAddShelf(
    {
        cancelAction, 
        submitAction
    }
     : 
    {
        cancelAction : (e: React.MouseEvent) => void,
        submitAction : (e: React.FormEvent, authorName: string) => void
    }
){
    const [shelfName, setShelfName] = useState<string>("");
    const [rowCount, setRowCount] = useState<number>(0);
    const [colCount, setColCount] = useState<number>(0);

    //call the submit function passed down from prop, and also reset the input fields
    const localSubmit = (e: React.FormEvent) => {
        submitAction(e, shelfName);
        setShelfName("");
    }

    return (
        <>
            <div className="bg-gray-400 rounded-lg absolute inset-0 m-4">
                <form className="p-2" onSubmit={localSubmit}>
                    <div className="flex flex-col items-center [&>*]:my-1">
                        <p className="text-lg font-bold text-gray-200">Add new shelf</p>
                        <input placeholder="Shelf Name" value={shelfName} onChange={(e) => setShelfName(e.target.value)} className="block w-full p-2 bg-gray-700 rounded-lg"></input>
                        <input placeholder="Number of rows" type="number" value={rowCount} onChange={(e) => setRowCount(Number(e.target.value))} className="block w-full p-2 bg-gray-700 rounded-lg"></input>
                        <input placeholder="Number of columns" type="number" value={colCount} onChange={(e) => setColCount(Number(e.target.value))} className="block w-full p-2 bg-gray-700 rounded-lg"></input>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={(e) => cancelAction(e)} className="p-2 bg-gray-200 rounded-lg text-gray-700 cursor-pointer">Cancel</button>
                        <button type="submit" className="p-2 bg-gray-700 rounded-lg cursor-pointer">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}