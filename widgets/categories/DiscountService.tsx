import { Eye } from "lucide-react";
// Update the import to the new animated component
import { AnimatedFeatureSpotlight } from "@/components/ui/feature-spotlight";

// The demo showcases the component with animations firing on load.
export default function DiscountService() {
  return (
    <div className="flex items-center justify-center w-full min-h-auto p-4">
      <AnimatedFeatureSpotlight
        preheaderIcon={<Eye className="h-4 w-4" />}
        preheaderText="See the Market From Every Angle"
        heading={
          <>
            <span className="text-primary">Take Your Store Online</span>
          </>
        }
        description="Make your shop discoverable to nearby customers with real-time product listings, easy order management, and fast delivery support.
No technical skills needed — just simple tools for everyday shopkeepers."
        buttonText="Become Vendor Now"
        buttonProps={{
          onClick: () => (window.location.href = "/vendor/add-vendor"),
        }}
        imageUrl="/homepage/products.png"
        imageAlt="A screenshot of the market screener feature"
      />
    </div>
  );
}
