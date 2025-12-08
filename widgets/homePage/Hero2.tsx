import React from "react";
import { HeroSection } from "@/components/ui/hero-section-2"; // Adjust the import path as needed

export default function Hero2() {
  return (
    <div className="w-full">
      <HeroSection
        logo={{
          url: "https://vucvdpamtrjkzmubwlts.supabase.co/storage/v1/object/public/users/user_2zMtrqo9RMaaIn4f8F2z3oeY497/avatar.png",
          alt: "Company Logo",
          text: "Meraj Ali",
        }}
        slogan="Serve City"
        title={
          <>
            Always Ready <br />
            <span className="text-primary">For your Service</span>
          </>
        }
        subtitle="From cleaning and repairs to beauty and wellness—book in minutes and enjoy peace of mind.."
        callToAction={{
          text: "Explore Platform",
          href: "/all-categories",
        }}
        backgroundImage="/homepage/pure.jpg"
        contactInfo={{
          website: "servecity.com",
          phone: "+91 6386578131 ",
          address: "available all over kanpur",
        }}
      />
    </div>
  );
}
