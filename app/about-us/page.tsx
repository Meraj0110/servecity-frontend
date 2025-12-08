import { CreativePricing } from "@/components/ui/creative-pricing";
import type { PricingTier } from "@/components/ui/creative-pricing";
import { Button } from "@/components/ui/button";
import { Check, Pencil, Star, Sparkles } from "lucide-react";

const sampleTiers: PricingTier[] = [
  {
    name: "Anshika",
    icon: <Pencil className="w-6 h-6" />,
    image: "/team/anshika.jpeg",
    linkedinUrl: "",
    description: "Frontend Developer",
    color: "amber",
    features: ["60-second Video Export"],
  },
  {
    name: "Meraj",
    icon: <Star className="w-6 h-6" />,
    image: "/team/meraj.jpeg",
    linkedinUrl: "",
    description: "Backend Developer",
    color: "blue",
    features: ["3-minute Video Export"],
    popular: true,
  },
  {
    name: "Akshat",
    icon: <Sparkles className="w-6 h-6" />,
    linkedinUrl: "",
    description: "Frontend Developer",
    image: "/team/akshat.jpeg",
    color: "purple",
    features: ["Multi-clip Editing"],
  },
  {
    name: "Anshul",
    icon: <Pencil className="w-6 h-6" />,
    linkedinUrl: "",
    image: "/team/anshul.jpeg",
    description: "Database Handling",
    color: "amber",
    features: ["60-second Video Export"],
  },
  {
    name: "Moorat",
    icon: <Pencil className="w-6 h-6" />,
    image: "/team/moorat.jpeg",
    linkedinUrl: "",
    description: "Backend Developer",
    color: "amber",
    features: ["60-second Video Export"],
  },
];

function CreativePricingDemo() {
  return <CreativePricing tiers={sampleTiers} />;
}

export default CreativePricingDemo;
