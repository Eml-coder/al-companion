import prismadb from "@/lib/prismadb";
import { CompanionForm } from "../components/companionForm";

interface CompanionIdPageProps {
    params : {
        companionid : string;
    }
}

const CompanionIdPage = async ({
   params 
}: CompanionIdPageProps) => {
    const companion = await prismadb.companion.findUnique({
        where : {
            id : params.companionid,
        }
    });

    const categories = await prismadb.category.findMany();
    return (
   <CompanionForm initialData={companion} categories={categories} />
    );
}
export default CompanionIdPage;
