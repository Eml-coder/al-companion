'use client';
import { Menu, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { UserButton } from '@clerk/nextjs';

import { cn } from '@/lib/utils';

import  {ModeToggle}  from '@/components/ModeToggle';
import { Button } from './ui/button';
import { MobileSidebar } from './MobileSidebar';


const font = Poppins({
	weight: '500',
	subsets: ['latin'],
});

const Navbar = () => {
	return (
		<div className='justify-between fixed w-full z-50 border-b border-primary/10 bg-secondary  px-4 py-4 flex h-20'>
			<div className='flex items-center'>
				{/* <Menu className='block md:hidden' /> */}
                <MobileSidebar />
				<Link href='/'>
					<h1
						className={cn(
							'hidden md:block text-xl md:text-2xl font-bold text-primary',
							font.className
						)}>
						ai..companion
					</h1>
				</Link>
			</div>
			<div className='flex items-center gap-x-4'>
				<Button size='sm' variant='primary' className='rounded-xl'>
					Dashboard
					<Sparkles className='h-4 w-4 fill-white ml-2' />
				</Button>
                <ModeToggle />
				<UserButton afterSignOutUrl='/' />
			</div>
		</div>
	);
};

export default Navbar;
