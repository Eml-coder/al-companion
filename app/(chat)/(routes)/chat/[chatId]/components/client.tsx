'use client';
import { useCompletion } from 'ai/react';
import { ChatHeader } from '@/components/ChatHeader';
import { Companion, Message } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatForm } from '@/components/ChatForm';

interface ChatClientProps {
	companion: Companion & {
		messages: Message[];
		_count: {
			messages: number;
		};
	};
}

export const ChatClient = ({ companion }: ChatClientProps) => {
	const router = useRouter();
	const [messages, setMessages] = useState<any[]>(companion.messages);

	const { input, isLoading, handleInputChange, handleSubmit, setInput } =
		useCompletion({
			api: `/api/chat/${companion.id}`,
			onFinish(promt, completion) {
				const systemMessage = {
					role: 'system',
					content: completion,
				};
				setMessages((current) => [...current, systemMessage]);
				setInput('');

				router.refresh();
			},
		});
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const userMessage = {
			role: 'user',
			content: input,
		};
        setMessages((current) => [...current, userMessage]);
        handleSubmit(e);
	};
	return (
		<div className='h-full p-4 space-y-2 flex flex-col'>
			<ChatHeader companion={companion} />
            <div>
                Messages todo
            </div>
            <ChatForm input={input} isLoading={isLoading} handleInputChange={handleInputChange} onSubmit={onSubmit} />
		</div>
	);
};
