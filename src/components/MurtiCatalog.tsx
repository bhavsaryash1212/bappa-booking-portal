import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import smallMurti from "@/assets/murti-small.jpg";
import mediumMurti from "@/assets/murti-medium.jpg";
import largeMurti from "@/assets/murti-large.jpg";

const murtis = [
  {
    id: 1,
    name: "Eco-Friendly Small Murti",
    size: "12 inches",
    price: "₹999",
    image: smallMurti,
    description: "Perfect for home puja, handcrafted with eco-friendly materials",
    features: ["Eco-friendly clay", "Traditional design", "Easy immersion"]
  },
  {
    id: 2,
    name: "Traditional Medium Murti",
    size: "18 inches",
    price: "₹2,499",
    image: mediumMurti,
    description: "Beautifully decorated with traditional ornaments and flowers",
    features: ["Premium decorations", "Vibrant colors", "Detailed craftsmanship"],
    popular: true
  },
  {
    id: 3,
    name: "Grand Large Murti",
    size: "24 inches",
    price: "₹4,999",
    image: largeMurti,
    description: "Magnificent large murti for grand celebrations",
    features: ["Ornate design", "Premium quality", "Ceremonial flowers"]
  }
];

export const MurtiCatalog = () => {
  return (
    <section id="catalog" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Sacred Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of beautifully handcrafted Ganpati murtis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {murtis.map((murti) => (
            <Card key={murti.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <div className="relative">
                <img 
                  src={murti.image} 
                  alt={murti.name}
                  className="w-full h-80 object-cover"
                />
                {murti.popular && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                    Most Popular
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{murti.name}</CardTitle>
                <CardDescription className="text-base">{murti.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-muted-foreground">Size: <span className="font-semibold text-foreground">{murti.size}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {murti.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary">{feature}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-3xl font-bold text-primary">{murti.price}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};