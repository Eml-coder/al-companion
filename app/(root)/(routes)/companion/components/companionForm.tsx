'use client';

import * as z from 'zod';
import { Category, Companion } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	FormLabel,
	FormDescription,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { ImageUpload } from '@/components/ImageUpload';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface CompanionFormProps {
	initialData: Companion | null;
	categories: Category[];
}

const formSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	description: z.string().min(1, { message: 'Description is required' }),
	instructions: z
		.string()
		.min(200, { message: 'Instructions are required, minimum 200 characters' }),
	src: z.string().min(1, { message: 'Image is required' }),
	seed: z
		.string()
		.min(200, { message: 'Seed is required, minimum 200 characters' }),
	categoryId: z.string().min(1, { message: 'Category is required' }),
});

export const CompanionForm = ({
	initialData,
	categories,
}: CompanionFormProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			description: '',
			instructions: '',
			src: '',
			seed: '',
			categoryId: undefined,
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};
	return (
		<div className='mt-10 h-full p-4 space-y-2 max-w-3xl mx-auto'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pb-10'>
					<div>
						<div>
							<h3 className='text-l font-medium'>General Information</h3>
							<p className='text-sm text-muted-foreground'>
								General Companion Information
							</p>
						</div>
						<Separator className='bg-primary/10' />
					</div>
					<FormField
						name='src'
						render={({ field }) => (
							<FormItem className='flex flex-col items-center justify-center space-y-4'>
								<FormControl>
									<ImageUpload
										disabled={isLoading}
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem className='col-span-2 md:col-span-1'>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<input
											{...field}
											disabled={isLoading}
											placeholder='Cleopatra'
											className='w-full rounded-md border-primary/25 border-2 p-2 focus:outline-none focus:border-primary/50'
										/>
									</FormControl>
									<FormDescription>
										Naming convention of the ai Companion
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem className='col-span-2 md:col-span-1'>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<input
											{...field}
											disabled={isLoading}
											placeholder='Queen of the Nile'
											className='w-full rounded-md border-primary/25 border-2 p-2 focus:outline-none focus:border-primary/50'
										/>
									</FormControl>
									<FormDescription>Description of the ai Companion</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='categoryId'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className='bg-background'>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a Category'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem key={category.id} value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>Select you ai Category</FormDescription>
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
		</div>
	);
};
