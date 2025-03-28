"use client";

import { useState } from "react";

export default function AdminHeader({showDialog} : {showDialog: () => void}){

    return (
        <>
            <div className="w-screen h-12 bg-gray-400 p-2 flex flex-row items-center">
                <div className="flex-1">
                    <p className="md:text-2xl md:text-left max-md:text-center max-md:text-lg">Admin Books</p>
                </div>
                <div className="md:hidden cursor-pointer" onClick={showDialog}>
                    <p className="text-right p-2 rounded-lg bg-gray-700 hover:bg-gray-500">+</p>
                </div>
            </div>
        </>
    )
}