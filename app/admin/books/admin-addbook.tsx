"use client";

import { searchAuthor } from "@/app/actions/author";
import { Author } from "@prisma/client";
import { useEffect, useState } from "react";

export default function AdminAddBook(
    {
        cancelAction, 
        submitAction
    }
     : 
    {
        cancelAction : (e: React.MouseEvent) => void,
        submitAction : (e: React.FormEvent, bookTitle: string, author: Author | string) => void
    }
){

    const [bookTitle, setBookTitle] = useState<string>("");
    const [authorName, setAuthorName] = useState<string>("");

    const [queryResults, setQueryResults] = useState<Author[]>([]);

    const [selectedAuthor, setSelectedAuthor] = useState<Author | undefined>(undefined);

    useEffect(() => {
        if(selectedAuthor) return;
        if(authorName.length < 3){
            setQueryResults([]);
            return;
        }
        let isLatestRequest = true;
        const localAuthorSearch = async () => {
            const authorQuery = await searchAuthor(authorName);
            if(isLatestRequest){
                setQueryResults(authorQuery);
            }
        }
        const debounceTimer = setTimeout(() => {
            localAuthorSearch();
        }, 500);

        return () => {
            clearTimeout(debounceTimer);
            isLatestRequest = false;
        }
    }, [authorName])

    //call the submit function passed down from prop, and also reset the input fields
    const localSubmit = (e: React.FormEvent) => {
        if(!selectedAuthor){
            submitAction(e, bookTitle, authorName);
        }else{
            submitAction(e, bookTitle, selectedAuthor);
        }
        setBookTitle("");
        setAuthorName("");
    }

    const queryClick = (author: Author) => {
        setSelectedAuthor(author);
        setAuthorName(author.name);
        setQueryResults([]);
    }

    return (
        <>
            <div className="bg-gray-400 rounded-lg absolute inset-0 m-4">
                <form className="p-2" onSubmit={localSubmit}>
                    <div className="flex flex-col items-center [&>*]:my-1">
                        <p className="text-lg font-bold text-gray-200">Add new book</p>
                        <input placeholder="Title" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} className="block w-full p-2 bg-gray-700 rounded-lg"></input>
                        <input placeholder="Author Name" value={authorName} onChange={(e) => {if(selectedAuthor) setSelectedAuthor(undefined);setAuthorName(e.target.value)}} className="block w-full p-2 bg-gray-700 rounded-lg"></input>
                        {queryResults.length > 0 && <div className="block w-full overflow-y-auto max-h-30">
                            <div className="flex flex-col">
                                {queryResults.map((author) => (
                                    <div key={author.id} onClick={() => queryClick(author)} className="cursor-pointer block w-full h-10 divide-y divide-gray-400 bg-gray-700 p-2 hover:bg-gray-500">{author.name}</div>
                                ))}
                            </div>
                        </div>}
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