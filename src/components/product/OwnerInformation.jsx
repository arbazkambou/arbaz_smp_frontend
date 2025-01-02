import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OwnerInfo({ owner }) {
  return (
    <Card className="bg-green-50">
      <CardHeader>
        <CardTitle className="text-green-800">Owner Details</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={owner.avatar} alt={owner.name} />
          <AvatarFallback className="bg-green-200 text-green-800">
            {owner.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-green-800">{owner.name}</p>
          <p className="text-sm text-green-600">{owner.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
