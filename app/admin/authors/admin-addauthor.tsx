"use client";

import { useState } from "react";

export default function AdminAddAuthor(
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
    const [authorName, setAuthorName] = useState<string>("");

    //call the submit function passed down from prop, and also reset the input fields
    const localSubmit = (e: React.FormEvent) => {
        submitAction(e, authorName);
        setAuthorName("");
    }

    return (
        <>
            <div className="bg-gray-400 rounded-lg absolute inset-0 m-4">
                <form className="p-2" onSubmit={localSubmit}>
                    <div className="flex flex-col items-center [&>*]:my-1">
                        <p className="text-lg font-bold text-gray-200">Add new author</p>
                        <input placeholder="Author Name" value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="block w-full p-2 bg-gray-700 rounded-lg"></input>
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