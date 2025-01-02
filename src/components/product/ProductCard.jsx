import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ images, name, description, price, _id }) => {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg">
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
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-foreground">{name}</h2>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <p className="text-lg font-bold text-primary">
          Rs {Math.round(Number(price.toFixed(2)))}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/product/${_id}`}>
          <Button className="w-full">View Detail</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
