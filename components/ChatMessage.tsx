'use client';

import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";

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
        if (!content) {return;
        }
        navigator.clipboard.writeText(content);
        toast({
            title: 'Copied to clipboard',
            description: 'You can paste it anywhere now',
        
        });
    }
	return <div>ChatMessage</div>;
};
