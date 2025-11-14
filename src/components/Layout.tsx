import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030016] text-white">
      <Navigation />
      <main className="flex-grow pt-24"> {/* Push content below navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
