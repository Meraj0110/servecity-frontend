"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FAQ } from "@/components/ui/faq-section";
import { AddFAQs } from "@/widgets/dashboard/AddFaqs";
import { Cta } from "@/widgets/homePage/Cta";
import { Hero } from "@/widgets/homePage/Hero";
import PopularServiceSection from "@/widgets/homePage/serviceSection/PopularServices";
import SpaMenSection from "@/widgets/homePage/serviceSection/SpaMen";
import CategoriesSection from "@/widgets/homePage/serviceSection/CategoriesCarouselSection";
import Hero2 from "@/widgets/homePage/Hero2";
import { BannerHomepage } from "@/widgets/homePage/Banner";
function Component() {
  return (
    <div>
      <Hero2 />
      <PopularServiceSection />
      <SpaMenSection />
      {/* <CategoriesSection /> */}
<BannerHomepage/>
      <Cta />
      <div className="w-full">
        <FAQ />
      </div>
    </div>
  );
}

export default Component;
