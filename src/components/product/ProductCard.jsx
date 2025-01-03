import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ images, name, price, _id, age }) => {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg p-2">
      <div className="relative h-48 overflow-hidden">
        {images && images[0]?.url ? (
          <Image
            src={images[0].url || "/placeholder.svg?height=200&width=300"}
            alt={name}
            style={{ objectFit: "cover" }}
            fill
            className="transition-transform duration-300 ease-in-out hover:scale-105"
          />
        ) : null}
      </div>
      {/* <CardContent> */}
      <div className="flex flex-col justify-center gap-[3px]">
        <h2 className="text-lg font-semibold text-foreground">{name}</h2>
        <p className="text-sm text-muted-foreground ">{age} years old</p>
        <p className="text-lg font-bold text-primary">
          Rs {Math.round(Number(price.toFixed(2))).toLocaleString("pkr")}
        </p>
      </div>
      <Link href={`/product/${_id}`}>
        <Button className="w-full">View Detail</Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
