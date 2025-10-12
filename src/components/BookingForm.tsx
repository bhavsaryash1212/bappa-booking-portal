import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const bookingSchema = z.object({
  customer_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  customer_email: z.string().trim().email("Invalid email address").max(255),
  customer_phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(15),
  murti_type: z.string().min(1, "Please select a murti type"),
  murti_size: z.string().min(1, "Please select a size"),
  delivery_address: z.string().trim().min(10, "Please provide complete address").max(500),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const murtiOptions = [
  { name: "Eco-Friendly Small Murti", price: 999 },
  { name: "Traditional Medium Murti", price: 2499 },
  { name: "Grand Large Murti", price: 4999 },
];

export const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      murti_type: "",
      murti_size: "",
      delivery_address: "",
    },
  });

  const selectedMurtiType = form.watch("murti_type");
  const selectedPrice = murtiOptions.find(m => m.name === selectedMurtiType)?.price || 0;

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("bookings").insert({
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        murti_type: data.murti_type,
        murti_size: data.murti_size,
        delivery_address: data.delivery_address,
        total_price: selectedPrice,
        status: "pending",
        user_id: user?.id || null,
      });

      if (error) throw error;

      toast.success("Booking Confirmed!", {
        description: "We'll contact you shortly with delivery details. Ganpati Bappa Morya!",
      });
      
      form.reset();
    } catch (error) {
      toast.error("Booking failed", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 px-4 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-2xl border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Book Your Ganpati Murti
            </CardTitle>
            <CardDescription className="text-base">
              Fill in your details and we'll deliver your divine murti to your doorstep
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="customer_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="customer_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customer_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="murti_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Murti Type *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose murti" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {murtiOptions.map((option) => (
                              <SelectItem key={option.name} value={option.name}>
                                {option.name} - ₹{option.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="murti_size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="12 inches">12 inches</SelectItem>
                            <SelectItem value="18 inches">18 inches</SelectItem>
                            <SelectItem value="24 inches">24 inches</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="delivery_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your complete delivery address" 
                          className="min-h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedPrice > 0 && (
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-lg font-semibold">
                      Total Amount: <span className="text-2xl text-primary">₹{selectedPrice}</span>
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};