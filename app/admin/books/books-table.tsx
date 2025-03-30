import { BookWithAuthors } from "@/app/lib/types";

export default function BooksTable(
    {
        books, 
        onBookClicked 
    }
    :
    { 
        books: BookWithAuthors[],
        onBookClicked: (book: BookWithAuthors) => void
    }
) {
    return (
        <>
            {books.length > 0 && <table className="border-collapse border border-gray-700">
                <thead>
                    <tr className="[&>*]:p-2 [&>*]:border [&>*]:border-gray-700">
                        <td>ID</td>
                        <td>Title</td>
                        <td>Author(s)</td>
                    </tr>
                </thead>
                <tbody>
                    {books?.map((book) => (
                        <tr key={book.id} className="[&>*]:p-2 [&>*]:border [&>*]:border-gray-700 cursor-pointer" onClick={() => onBookClicked(book)}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.authors[0].name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </>
    )
}