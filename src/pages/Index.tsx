import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MurtiCatalog } from "@/components/MurtiCatalog";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <MurtiCatalog />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default Index;