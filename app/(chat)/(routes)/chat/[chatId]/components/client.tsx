'use client';
import { useCompletion } from 'ai/react';
import { ChatHeader } from '@/components/ChatHeader';
import { Companion, Message } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatForm } from '@/components/ChatForm';
import { ChatMessages } from '@/components/ChatMessages';
import { ChatMessageProps } from '@/components/ChatMessage';

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
	const [messages, setMessages] = useState<ChatMessageProps[]>(companion.messages);

	const { input, isLoading, handleInputChange, handleSubmit, setInput } =
		useCompletion({
			api: `/api/chat/${companion.id}`,
			onFinish(promt, completion) {
				const systemMessage: ChatMessageProps = {
					role: 'system',
					content: completion,
				};
				setMessages((current) => [...current, systemMessage]);
				setInput('');

				router.refresh();
			},
		});
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const userMessage: ChatMessageProps = {
			role: 'user',
			content: input,
		};
        setMessages((current) => [...current, userMessage]);
        handleSubmit(e);
	};
	return (
		<div className='h-full p-4 space-y-2 flex flex-col'>
			<ChatHeader companion={companion} />
			<ChatMessages messages={messages}
			companion={companion}
			isLoading={isLoading}
			/>
            <div>
                Messages todo
            </div>
            <ChatForm input={input} isLoading={isLoading} handleInputChange={handleInputChange} onSubmit={onSubmit} />
		</div>
	);
};
