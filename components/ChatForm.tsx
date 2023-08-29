'use client';

import { ChangeEvent, FormEvent } from 'react';
import { ChatRequestOptions } from 'ai';

interface ChatFormProps {
	input: string;
	handleInputChange: (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => void;
	onSubmit: (
		e: FormEvent<HTMLFormElement>,
		chatRequestOptions?: ChatRequestOptions | undefined
	) => void;
	isLoading: boolean;
}

export const ChatForm = ({
	input,
	handleInputChange,
	onSubmit,
	isLoading,
}: ChatFormProps) => {
	return (
		<form
			onSubmit={onSubmit}
			className='border-t border-primary/10 py-4 flex items-center border-dotted gap-x-2'></form>
	);
};
