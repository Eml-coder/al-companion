import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

//try to add a sidebar

const RootLayout = ({
    children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>
            <Navbar />
            <div className='hidden md:flex mt-20 w-20 flex-col fixed inset-y-0'>
                <Sidebar />

            </div>
            <main className='md:pl-20 pt-16 h-full'>
            {children}
     
            </main>
        </div>
    );
};

export default RootLayout;