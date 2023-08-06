'use client';
import { use, useEffect, useState } from 'react';
import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';

export const SearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const categoryId = searchParams.get('categoryId');
	const name = searchParams.get('name');

	const [searchValue, setSearchValue] = useState(name || '');
	const debouncedSearchValue = useDebounce<string>(searchValue, 500);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	useEffect(() => {
		const query = {
			name: debouncedSearchValue,
			categoryId: categoryId,
		};
		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query,
			},
			{ skipEmptyString: true, skipNull: true }
		);
		router.push(url);
	}, [debouncedSearchValue, categoryId, router]);

	return (
		<div className='relative'>
			<Search className='absolute h-5 w-5 top-3 left-4 text-muted-foreground' />
			<Input
				className='pl-12 mt-4 bg-primary/10'
				placeholder='Search...'
				onChange={handleSearchChange}
				value={searchValue}
			/>
		</div>
	);
};
