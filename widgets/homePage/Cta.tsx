import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/blocks/cta-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const IMAGES = [
  "/homepage/uc1.jpg",
  "/homepage/uc2.jpeg",
  "/homepage/uc3.png",
  "/homepage/uc4.jpeg",
];

export const Cta = ({ isVendor }: any) => {
  return (
    <section>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
        <ContainerStagger>
          <ContainerAnimated className="mb-4 block text-xs font-medium text-rose-500 md:text-sm">
            Select service and get done 👍
          </ContainerAnimated>
          <ContainerAnimated className="text-4xl font-semibold md:text-[2.4rem] tracking-tight">
            Bring Local Services Online — Fast, Easy, and Convenient
          </ContainerAnimated>
          <ContainerAnimated className="my-4 text-base text-slate-700 md:my-6 md:text-lg">
            ServeCity connects local professionals and customers on one powerful
            platform. Browse trusted experts, compare prices, check real-time
            availability, and book instantly. Grow your business or find the
            right service — all in one place.
          </ContainerAnimated>
          <ContainerAnimated>
            {isVendor ? (
              <Link href="/vendor/dashboard/product-add">
                {" "}
                <Button className=" bg-rose-500 ">Start Scaling Today</Button>
              </Link>
            ) : (
              <Link href="/vendor/add-vendor">
                <Button className=" bg-rose-500 ">Become Vendor</Button>
              </Link>
            )}
          </ContainerAnimated>
        </ContainerStagger>

        <GalleryGrid>
          {IMAGES.map((imageUrl, index) => (
            <GalleryGridCell index={index} key={index}>
              <img
                className="size-full object-cover object-center"
                width="100%"
                height="100%"
                src={imageUrl}
                alt=""
              />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  );
};
