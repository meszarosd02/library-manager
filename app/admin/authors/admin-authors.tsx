"use client";

import AdminHeader from "@/app/components/admin-header";
import { useEffect, useState } from "react";
import AuthorsTable from "./authors-table";
import { Author } from "@prisma/client";
import { addAuthor, getAuthors } from "@/app/actions/author";
import AdminAddAuthor from "./admin-addauthor";

export default function AdminAuthors() {
    const [addDialogState, setAddDialogState] = useState<boolean>(false);
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const fetchedBooks = await getAuthors();
            setAuthors(fetchedBooks);
        }
        fetchBooks();
    }, [])

    const showDialog = () => {
        setAddDialogState(true);
    }

    const cancelAction = (e: React.MouseEvent) => {
        e.preventDefault();
        setAddDialogState(false);
    }

    const submitAuthor = async (e: React.FormEvent, authorName: string) => {
        e.preventDefault();
        if (authorName.length === 0) return;
        const newAuthor = await addAuthor(authorName);
        authors.push(newAuthor);
        setAddDialogState(false);
    }
    return (
        <>
            {!addDialogState ? <div>
                <AdminHeader addAction={showDialog} title="Admin Authors"></AdminHeader>
                <AuthorsTable authors={authors} />
            </div> :
                <div>
                    <AdminAddAuthor cancelAction={cancelAction} submitAction={submitAuthor}></AdminAddAuthor>
                </div>}
        </>
    )
}