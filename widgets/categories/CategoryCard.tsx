import Link from "next/link";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
}

export function CategoryCard({ id, name, image }: CategoryCardProps) {
  return (
    <Link
      href={`/all-categories/${id}`}
      className="block w-[200px] sm:w-[230px] group"
    >
      <div className="
        w-full h-[200px] sm:h-[230px] rounded-2xl border 
        bg-white overflow-hidden 
        shadow-[6px_6px_0_#000000] 
        transition-transform duration-300 
        group-hover:-translate-y-2 group-hover:shadow-[10px_10px_0_#000]
      ">
        <img
          src={image}
          className="w-full h-full object-cover rounded-2xl"
          alt={name}
        />
      </div>

      <h2 className="mt-3 text-xl sm:text-2xl font-semibold capitalize tracking-wide">
        {name}
      </h2>
    </Link>
  );
}
