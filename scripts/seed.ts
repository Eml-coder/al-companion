const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
	try {
		await db.category.createMany({
			data: [
				{ name: 'Movies & TV' },
				{ name: 'Musicians' },
				{ name: 'Philosophy' },
				{ name: 'Scientists' },
				{ name: 'Animals' },
				{ name: 'Sports' },
				{ name: 'Movies & TV' },
				{ name: 'Famous People' },
				{ name: 'History' },
				{ name: 'Politics' },
				{ name: 'Technology' },
			],
		});
	} catch (error) {
		console.log('error with seeding categories', error);
	} finally {
		await db.$disconnect();
	}
}

main();
