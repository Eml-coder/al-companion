'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@prisma/client';
import qs from 'query-string';

import { cn } from '@/lib/utils';

interface CategoriesProps {
	data: Category[];
}

export const Categories = ({ data }: CategoriesProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const categoryId = searchParams.get('categoryId');
	const onClick = (id: string | undefined) => {
		const query = { categoryId: id };
		const url = qs.stringifyUrl(
			{ url: window.location.href, query },
			{ skipNull: true }
		);

		router.push(url);
	};
	return (
		<div className='w-full overflow-x-auto space-x-2 flex flex-wrap p-1 gap-5 mx-10 TODO:adjust-categories-bttns-ui'>
			<button
				onClick={() => onClick(undefined)}
				className={cn(
					`transition hover:opacity-75 bg-primary/10 rounded-md md:py-3 py-2 md:px-4 px-2 md:text-sm text-xs text-center items-center flex`,
					!categoryId ? 'bg-primary/25' : 'bg-primary/10'
				)}>
				Newest
			</button>
			{data.map((item) => (
				<button
					onClick={() => onClick(item.id)}
					key={item.id}
					className={cn(
						`transition hover:opacity-75 bg-primary/10 rounded-md md:py-3 py-2 md:px-4 px-2 md:text-sm text-xs text-center items-center flex `,
						item.id === categoryId ? 'bg-primary/30' : 'bg-primary/10'
					)}>
					{item.name}
				</button>
			))}
		</div>
	);
};
