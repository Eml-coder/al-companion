import { Companion } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { MessagesSquare } from 'lucide-react';

interface CompanionProps {
	data: (Companion & {
		_count: {
			messages: number;
		};
	})[];
}
export const Companions = ({ data }: CompanionProps) => {
	if (data.length === 0) {
		return (
			<div className='pt-10 flex flex-col items-center jusity-center space-y-3'>
				<div className='relative w-60 h-60'>
					<Image fill src='/empty.png' alt='Empty' className='dark:grayscale' />
				</div>
				<p className='text-center text-gray-500 dark:text-gray-400'>
					Companions not found.
				</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10'>
			{data.map((item) => (
				<Card
					key={item.id}
					className='bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0'>
					<Link href={`/chat/${item.id}`}>
						<CardHeader className='flex items-center justify-center text-center text-muted-forground'>
							<div className='relative w-32 h-32'>
								<Image
									className='rounded-full object-cover'
									src={item.src}
									alt='companion image'
									fill
								/>
							</div>
							<p className='font-bold'>{item.name}</p>
							<p className='text-xs'>{item.description}</p>
						</CardHeader>
						<CardFooter className='flex justify-between text-center text-muted-forground'>
							<p className='lowercase'>@{item.userName}</p>
							<div className='flex items-center '>
								<MessagesSquare className='h-5 w-5 mr-1' />
								{item._count.messages}
							</div>
						</CardFooter>
					</Link>
				</Card>
			))}
		</div>
	);
};

export default Companions;
