'use client';

import * as z from 'zod';
import { Category, Companion } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { ImageUpload } from '@/components/ImageUpload';

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
								<FormControl><ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value}/></FormControl>
                                <FormMessage  />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
};
