'use client';
import { BeatLoader } from 'react-spinners';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { BotAvatar } from '@/components/BotAvatar';

export interface ChatMessageProps {
	role: 'system' | 'user';
	content?: string;
	isLoading?: boolean;
	src?: string;
}

export const ChatMessage = ({
	role,
	content,
	isLoading,
	src,
}: ChatMessageProps) => {
	const { toast } = useToast();
	const { theme } = useTheme();

	const onCopy = () => {
		if (!content) {
			return;
		}
		navigator.clipboard.writeText(content);
		toast({
			description: 'Copied to clipboard',
		});
	};
	return (
		<div
			className={cn(
				'flex items-start gap-x-3 py-4 w-full',
				role === 'user' && 'justify-end'
			)}>
			{role !== 'user' && src && <BotAvatar src={src} />}
			<div className=' rounded-md px-4 py-2 max-w-sm bg-primary/10 text-primary/80'>
				{isLoading ? (
					<BeatLoader color={theme === 'light' ? 'black' : 'white'} size={5} />
				) : (
					content
				)}
			</div>
		</div>
	);
};
