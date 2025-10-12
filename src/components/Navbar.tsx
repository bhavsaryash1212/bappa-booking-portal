import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout failed");
    } else {
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🙏 Ganpati Booking
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/#catalog">
            <Button variant="ghost">Collection</Button>
          </Link>
          <Link to="/#booking">
            <Button variant="ghost">Book Now</Button>
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">My Bookings</Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-primary to-accent">
                Login / Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};