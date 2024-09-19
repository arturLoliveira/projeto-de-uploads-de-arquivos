import { CirclePlus } from "lucide-react";
import LogoUfop from '../assets/ufop.png'
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


interface CardBoxProps {
    title: string;
    subjects: string[];
    openDialog: (subjects: string[]) => void;
}



export function CardBox({ title, subjects, openDialog }: CardBoxProps) {
    return (
        <DialogTrigger>
            <div className="border-4 border-zinc-500 flex flex-col gap-4 py-4 px-1 items-center justify-center cursor-pointer" onClick={() => openDialog(subjects)}>
                <img src={LogoUfop} alt="hello" className="px-4" />
                <h1 className="text-lg font-bold">{title}</h1>
                    <button className="flex gap-4 py-5">
                        <CirclePlus size={32} className="cursor-pointer" />
                    </button>
            </div>
        </DialogTrigger>
    )
}