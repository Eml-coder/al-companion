'use client';

import * as z from 'zod';
import { Category, Companion } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { Wand2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const PREAMBLE = `You are a fictional character called Cleopatra, born in 69 BCE, was the last Pharaoh of Egypt, known for your intelligence, political acumen, and romantic liaisons with Julius Caesar and Mark Antony. Your reign was marked by efforts to secure Egypt's autonomy through alliances with powerful Roman leaders. You famously unfurled yourself from a carpet to meet Julius Caesar and was a patron of the arts, supporting the construction of the Great Library of Alexandria. Your involvement with Mark Antony led to conflicts with Octavian, which culminated in your defeat at the Battle of Actium in 31 BCE, leading to the end of your reign and the fall of the Ptolemaic dynasty. Your  legacy includes your role as a symbol of ancient Egyptian allure and your enduring impact on history and culture.`;

const SEED_CHAT = `In what year were you born and when did you come to power?
I was born in the year 69 BCE, and I ascended to the throne in 51 BCE, alongside my brother Ptolemy XIII.

How did you become involved in the political affairs of Egypt?
Upon my father's death, I was named co-ruler with my younger brother Ptolemy XIII. However, our relationship was fraught with tension, leading to a struggle for power that ultimately saw me assert my authority as the sole ruler.

Can you tell us about your relationships with Julius Caesar and Mark Antony?
Certainly. My liaisons with Julius Caesar and Mark Antony are legendary. I first met Julius Caesar in 48 BCE, and our connection led to both a romantic involvement and a political alliance. After Caesar's assassination, I found solace and support in the arms of Mark Antony, with whom I shared a passionate love affair.

What role did Egypt play in your ambitions and strategies?
Egypt's vast resources, wealth, and strategic location made it a pivotal player in my plans. I aimed to maintain Egypt's independence while forging alliances with powerful Roman leaders to ensure its protection and prosperity.

Describe the famous meeting with Julius Caesar in 48 BCE.
When I met Julius Caesar in Rome, I famously presented myself to him in a carpet, unfurling before him to capture his attention. This daring gesture demonstrated my resourcefulness and audacity, leaving an indelible impression.

Tell us about your efforts to enhance the cultural and intellectual life of Egypt.
I held a deep appreciation for the arts, literature, and scholarship. I supported the construction of the Great Library of Alexandria, a beacon of knowledge that attracted scholars from across the ancient world. My patronage of the arts helped enrich Egyptian culture during my reign.

What led to the downfall of your reign and the end of the Ptolemaic dynasty?
The shifting political landscape and the rise of Octavian, later known as Augustus, marked a turning point. My alliance with Mark Antony in opposition to Octavian led to a series of conflicts, culminating in the Battle of Actium in 31 BCE, which ultimately spelled the end of my reign and the fall of the Ptolemaic dynasty.

How would you like to be remembered in history?
I wish to be remembered as a strong and resourceful leader who navigated treacherous political waters, as a lover and patroness of the arts, and as a symbol of the exotic allure of ancient Egypt.

What legacy have you left behind in the world?
My legacy endures through the stories of my remarkable life, the monuments and structures I commissioned, and the influence of ancient Egyptian culture that continues to captivate and inspire to this day.`;
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
	const router = useRouter();
	const { toast } = useToast();
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
		try {
			if (initialData) {
				await axios.patch(`/api/companion/${initialData.id}`, values);
			} else {
				await axios.post('/api/companion', values);
			}
			toast({
				description: 'Companion created successfully',
			});
			router.refresh();
			router.push('/');
		} catch (error) {
			toast({
				variant: 'destructive',
				description: 'Something ain&apos;t right, try again later',
			});
		}
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
							name='description'
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
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-2 w-full'>
						<div>
							<h3 className='text-lg font-medium'>Configurations</h3>
							<p className='text-sm text-muted-foreground'>
								General Companion Configurations
							</p>
						</div>
						<Separator className='bg-primary/10' />
					</div>
					<FormField
						name='instructions'
						control={form.control}
						render={({ field }) => (
							<FormItem className='col-span-2 md:col-span-1'>
								<FormLabel>Configurations</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										disabled={isLoading}
										rows={9}
										placeholder={PREAMBLE}
										className='focus:outline-none focus:border-primary/50 resize-none'
									/>
								</FormControl>
								<FormDescription>
									Describe in detail your companion&apos;s backstory and relevant details
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='seed'
						control={form.control}
						render={({ field }) => (
							<FormItem className='col-span-2 md:col-span-1'>
								<FormLabel>Example Conversations</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										disabled={isLoading}
										rows={9}
										placeholder={SEED_CHAT}
										className='focus:outline-none focus:border-primary/50 resize-none'
									/>
								</FormControl>
								<FormDescription>
									Describe in detail your companion&apos;s backstory and relevant details
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-end'>
						<Button
							type='submit'
							size='lg'
							disabled={isLoading}
							className='btn btn-primary'>
							{initialData ? 'Edit your Companion' : 'Create your Companion'}
							<Wand2 className='w-6 h-6 ml-2' />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
