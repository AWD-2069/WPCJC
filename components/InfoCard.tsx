import Image from "next/image";
import { Card } from "@/components/ui/card";

const items = [
	{
		title: "Who We Are",
		image: "/uploads/who-we-are.webp",
	},
	{
		title: "Our Worship",
		image: "/uploads/our-worship.webp",
	},
	{
		title: "Church Leadership",
		image: "/uploads/church-leadership.webp",
	},
];

export default function InfoCard() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{items.map((item) => (
				<Card
					key={item.title}
					className="relative group overflow-hidden h-72"
				>
					<Image
						src={item.image}
						alt={item.title}
						fill
						className="object-cover transition duration-300 filter group-hover:grayscale"
					/>
					<div className="absolute bottom-4 left-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded transition duration-300 group-hover:bg-blue-600">
						{item.title}
					</div>
				</Card>
			))}
		</div>
	);
}

export { InfoCard };