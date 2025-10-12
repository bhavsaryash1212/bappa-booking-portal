import heroImage from "@/assets/hero-ganpati.jpg";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
          Ganpati Bappa Morya
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-foreground/90">
          Book Your Divine Ganpati Murti Online
        </p>
        <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
          Handcrafted eco-friendly Ganpati murtis delivered to your doorstep. Celebrate the festival with devotion and tradition.
        </p>
        <Button 
          onClick={scrollToBooking}
          size="lg"
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Book Your Murti Now
        </Button>
      </div>
    </section>
  );
};