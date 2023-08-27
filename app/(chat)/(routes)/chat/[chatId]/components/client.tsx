'use client'

import { ChatHeader } from "@/components/ChatHeader";
import { Companion, Message } from "@prisma/client"


interface ChatClientProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
}


export const ChatClient = ({companion}:ChatClientProps) => {
    return (
        <div className='h-full p-4 space-y-2 flex flex-col'>
          <ChatHeader companion={companion} />
        </div>
    )
}

