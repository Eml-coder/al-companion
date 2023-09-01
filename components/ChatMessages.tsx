'use client';

import { Companion } from '@prisma/client';
import { ChatMessage } from '@/components/ChatMessage';

interface ChatMessagesProps {
	messages: any[];

	companion: Companion;
	isLoading: boolean;
}
export const ChatMessages = ({
	messages = [],
	isLoading,
	companion,
}: ChatMessagesProps) => {
	return <div className='flex-1 overflow-y-auto pr-4'><ChatMessage /></div>;
};
