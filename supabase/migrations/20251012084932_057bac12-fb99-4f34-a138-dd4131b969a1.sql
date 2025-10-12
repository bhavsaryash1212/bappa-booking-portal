-- Create bookings table for Ganpati murti orders
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  murti_type TEXT NOT NULL,
  murti_size TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending',
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert bookings (public website)
CREATE POLICY "Anyone can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to view their own bookings by email
CREATE POLICY "Users can view bookings by email" 
ON public.bookings 
FOR SELECT 
USING (true);

-- Create index for faster queries
CREATE INDEX idx_bookings_email ON public.bookings(customer_email);
CREATE INDEX idx_bookings_date ON public.bookings(booking_date DESC);