import { auth, redirectToSignIn } from "@clerk/nextjs";
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
    const { userId} = auth()
    if(!userId) {
        return redirectToSignIn();
    }
    const companion = await prismadb.companion.findUnique({
        where : {
            id : params.companionid,
            userId
        }
    });

    const categories = await prismadb.category.findMany();
    return (
   <CompanionForm initialData={companion} categories={categories} />
    );
}
export default CompanionIdPage;
