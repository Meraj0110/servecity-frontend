import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

// You would replace this with your actual image source
const BATHROOM_IMAGE_URL = "/images/classic-cleaning-3baths.jpg";

interface ClassicCleaningProps {
  rating: number;
  reviewCount: string;
  duration: string;
  bathroomCount: number;
  originalPrice: number;
  offerPrice: number;
  pricePerBathroom: number;
}

const serviceData: ClassicCleaningProps = {
  rating: 4.82,
  reviewCount: "1.5M reviews",
  duration: "2 hrs 15 mins",
  bathroomCount: 3,
  originalPrice: 1287, // Assuming currency is in a local format like Indian Rupees (₹)
  offerPrice: 1141,
  pricePerBathroom: 380,
};

export function ClassicCleaningCard() {
  const {
    rating,
    reviewCount,
    duration,
    bathroomCount,
    originalPrice,
    offerPrice,
    pricePerBathroom,
  } = serviceData;

  // Function to format the price (e.g., adding commas or a currency symbol)
  const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

  return (
    <Card className="flex w-full flex-col md:flex-row p-4 shadow-lg hover:shadow-xl transition-shadow">
      {/* LEFT SECTION (Content) */}
      <div className="flex-1 space-y-3 pr-4 border-b md:border-b-0 md:border-r pb-4 md:pb-0 md:pr-6">
        <CardHeader className="p-0">
          <Badge className="w-fit mb-2 bg-green-500 hover:bg-green-600 text-white">
            COMBO DEALS
          </Badge>
          <CardTitle className="text-xl font-bold">
            Classic cleaning ({bathroomCount} bathrooms)
          </CardTitle>
          {/* Rating and Duration */}
          <div className="flex items-center space-x-3 text-sm text-muted-foreground pt-1">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 fill-yellow-500 text-yellow-500" />
              <span>
                {rating} ({reviewCount})
              </span>
            </div>
            <span>•</span>
            <span>{duration}</span>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-1">
          {/* Pricing */}
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(offerPrice)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          </div>
          {/* Price per unit */}
          <p className="text-sm font-semibold text-green-600">
            {formatPrice(pricePerBathroom)} per bathroom
          </p>

          {/* Details Link */}
          <p className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer pt-2">
            View details
          </p>
        </CardContent>

        <CardFooter className="p-0 pt-4">
          {/* Additional Service Info (e.g., scrub machine) */}
          <p className="text-sm text-gray-700">
            Floor & tile cleaning with a scrub machine (Implied from the
            "Intense" card style)
          </p>
        </CardFooter>
      </div>

      {/* RIGHT SECTION (Image and Action) */}
      <div className="flex-shrink-0 flex flex-col items-end justify-between ml-4 mt-4 md:mt-0">
        <div className="relative w-40 h-28 overflow-hidden rounded-lg">
          {/* The image is placeholder logic. Use Next.js <Image> component in a real app */}
          <div className="absolute top-0 right-0 bg-secondary px-2 py-0.5 text-xs font-medium rounded-bl-lg">
            {bathroomCount} BATHROOMS
          </div>
          {/* Placeholder for Image */}
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
            [Image of service]
          </div>
          {/* <Image src={BATHROOM_IMAGE_URL} alt="Bathroom Cleaning" fill className="object-cover" /> */}
        </div>

        <Button className="w-full md:w-auto mt-4 md:mt-0">Add</Button>
      </div>
    </Card>
  );
}

// Example usage in a Next.js Page/Component:
/*
export default function ServicesPage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Service Packages</h2>
      <ClassicCleaningCard />
    </div>
  )
}
*/
