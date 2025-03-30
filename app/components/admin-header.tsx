"use client";

export default function AdminHeader(
    {
        addAction,
        backAction,
        title
    }
    : 
    {
        addAction?: () => void,
        backAction?: () => void,
        title: string
    }){

    return (
        <>
            <div className="w-screen h-12 bg-gray-400 p-2 flex flex-row items-center">
                <div className="md:hidden cursor-pointer" onClick={backAction}>
                    <p className="text-left p-2 rounded-lg bg-gray-700 hover:bg-gray-500">-</p>
                </div>
                <div className="flex-1">
                    <p className="md:text-2xl md:text-left max-md:text-center max-md:text-lg">{title}</p>
                </div>
                {addAction && <div className="md:hidden cursor-pointer" onClick={addAction}>
                    <p className="text-right p-2 rounded-lg bg-gray-700 hover:bg-gray-500">+</p>
                </div>}
            </div>
        </>
    )
}