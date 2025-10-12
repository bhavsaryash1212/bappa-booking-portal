import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  murti_type: string;
  murti_size: string;
  delivery_address: string;
  booking_date: string;
  status: string;
  total_price: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user?.id)
        .order("booking_date", { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (error: any) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-green-500";
      case "delivered":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-xl text-muted-foreground">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Bookings
          </h1>
          <p className="text-muted-foreground">Manage and track your Ganpati murti orders</p>
        </div>

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-xl text-muted-foreground mb-4">No bookings yet</p>
              <p className="text-muted-foreground">Book your first Ganpati murti to get started!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{booking.murti_type}</CardTitle>
                      <CardDescription>
                        Booked on {new Date(booking.booking_date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Size</p>
                      <p className="font-semibold">{booking.murti_size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Price</p>
                      <p className="font-semibold text-primary text-xl">₹{booking.total_price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-semibold">{booking.customer_phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Delivery Address</p>
                      <p className="font-semibold">{booking.delivery_address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;