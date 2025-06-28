import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface LeadershipCardProps {
  image: string;
  name: string;
  description: string;
}

export function LeadershipCard({ image, name, description }: LeadershipCardProps) {
  return (
    <Card className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg bg-background">
      <Image
        src={image}
        alt={name}
        width={120}
        height={120}
        className="rounded-full object-cover mb-4"
      />
      <CardContent>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}