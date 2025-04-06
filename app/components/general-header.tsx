"use client";

export default function GeneralHeader(
    {
        backAction,
        title
    }
    : 
    {
        backAction?: () => void,
        title: string
    }){

    return (
        <>
            <div className="w-screen h-12 bg-gray-400 p-2 flex flex-row items-center">
                {backAction && <div className="md:hidden cursor-pointer" onClick={backAction}>
                    <p className="text-left p-2 rounded-lg bg-gray-700 hover:bg-gray-500">-</p>
                </div>}
                <div className="flex-1">
                    <p className="md:text-2xl md:text-left max-md:text-center max-md:text-lg">{title}</p>
                </div>
            </div>
        </>
    )
}