import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the type for a single offer item
export interface Props {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  title: string;
  description: string;
  brandLogoSrc: string;
  brandName: string;
  promoCode?: string;
  href: string;
}

// Props for the OfferCard component
interface BasicCardProps {
  item: Props;
}

// ------------------------------
// 🚀 OFFER CARD (Fixed group hover logic)
// ------------------------------
const BasicCard = React.forwardRef<HTMLAnchorElement, BasicCardProps>(
  ({ item }, ref) => (
    <motion.a
      ref={ref}
      href={item.href}
      className="
        relative flex-shrink-0 w-[300px] h-[380px] rounded-2xl 
        overflow-hidden snap-start 
        group/card     /* per-card hover group */
      "
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: "1000px" }}
    >
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.imageAlt}
        className="
          absolute inset-0 w-full h-2/4 object-cover 
          transition-transform duration-500
          group-hover/card:scale-110      /* only this card zooms */
        "
      />

      {/* Card Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 h-2/4 bg-card p-5 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Tag */}
          <div className="flex item-center text-xs text-muted-foreground">
            <Tag className="w-4 h-4 mr-2 text-primary" />
            <span>{item.totalDuration}</span>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-bold text-card-foreground leading-tight">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground">{item.price}</p>
        </div>

     

         
      </div>
    </motion.a>
  )
);
BasicCard.displayName = "BasicCard";

// ------------------------------
// 🚀 OFFER CAROUSEL
// ------------------------------

export interface OfferCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: Props[];
}

const BasicCarousel = React.forwardRef<HTMLDivElement, OfferCarouselProps>(
  ({ items, className, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const current = scrollContainerRef.current;
        const amount = current.clientWidth * 0.8;
        current.scrollBy({
          left: direction === "left" ? -amount : amount,
          behavior: "smooth",
        });
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full group",
          className
        )} /* group for arrows only */
        {...props}
      >
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="
            absolute top-1/2 -translate-y-1/2 left-0 z-10 
            w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm 
            border border-border flex items-center justify-center 
            text-foreground opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 hover:bg-background/80
          "
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {items?.map((item) => (
            <BasicCard key={item.id} item={item} />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="
            absolute top-1/2 -translate-y-1/2 right-0 z-10 
            w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm 
            border border-border flex items-center justify-center 
            text-foreground opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 hover:bg-background/80
          "
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  }
);

BasicCarousel.displayName = "BasicCarousel";

export { BasicCarousel, BasicCard };
