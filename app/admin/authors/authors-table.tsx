import { Author } from "@prisma/client";

export default function AuthorssTable({authors}: {authors: Author[]}){
    return (
        <>
            {authors.length > 0 && <table className="border-collapse border border-gray-700">
                <thead>
                    <tr className="[&>*]:p-2 [&>*]:border [&>*]:border-gray-700">
                        <td>ID</td>
                        <td>Name</td>
                    </tr>
                </thead>
                <tbody>
                    {authors?.map((author) => (
                        <tr key={author.id} className="[&>*]:p-2 [&>*]:border [&>*]:border-gray-700">
                            <td>{author.id}</td>
                            <td>{author.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </>
    )
}