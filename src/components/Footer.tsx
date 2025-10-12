export const Footer = () => {
  return (
    <footer className="bg-card border-t py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Ganpati Murti Booking</h3>
            <p className="text-muted-foreground">
              Your trusted source for authentic, eco-friendly Ganpati murtis. Celebrating tradition with devotion.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Contact Us</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>📧 Email: info@ganpatibooking.com</p>
              <p>📱 Phone: +91 98765 43210</p>
              <p>📍 Mumbai, Maharashtra</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#catalog" className="hover:text-primary transition-colors">Our Collection</a></li>
              <li><a href="#booking" className="hover:text-primary transition-colors">Book Now</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Delivery Info</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>© 2024 Ganpati Murti Booking. All rights reserved. Ganpati Bappa Morya! 🙏</p>
        </div>
      </div>
    </footer>
  );
};