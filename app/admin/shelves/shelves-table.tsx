"use client";

import { Shelf } from "@prisma/client";

export default function ShelvesTable(
    {
        shelves,
        onShelfClicked
    } : {
        shelves: Shelf[],
        onShelfClicked: (shelf: Shelf) => void
    }
){
    return (
        <>
            {shelves.length > 0 && <table className="border-collapse border border-gray-700">
                <thead>
                    <tr className="[&>*]:p-2 [&>*]:border [&>*]:border-gray-700">
                        <td>ID</td>
                        <td>Name</td>
                        <td>Row count</td>
                        <td>Column count</td>
                    </tr>
                </thead>
                <tbody>
                    {shelves?.map((shelf) => (
                        <tr key={shelf.id} className="[&>*]:p-2 [&>*]:border [&>*]:border-gray-700 cursor-pointer" onClick={() => onShelfClicked(shelf)}>
                            <td>{shelf.id}</td>
                            <td>{shelf.name}</td>
                            <td>{shelf.row_num}</td>
                            <td>{shelf.col_num}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </>
    )
}