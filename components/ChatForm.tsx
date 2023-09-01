'use client';

import { ChangeEvent, FormEvent } from 'react';
import { SendHorizonal } from 'lucide-react';
import { ChatRequestOptions } from 'ai';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
			className='border-t border-primary/10 py-4 flex items-center border-dotted gap-x-2'>
			<Input
				disabled={isLoading}
				value={input}
				onChange={handleInputChange}
				placeholder='Type a message'
				className='rounded-lg bg-primary/10'
			/>
			<Button
				disabled={isLoading}
				type='submit'
				className='bg-primary/10 text-primary/80 hover:bg-primary/20 hover:text-primary/100 transition-colors duration-200 ease-in-out'>
				Send
				<SendHorizonal className='w-4 h-4 ml-2' />
			</Button>
		</form>
	);
};
