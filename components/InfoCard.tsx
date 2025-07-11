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
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-2 sm:mx-8 mt-10">
			{items.map((item) => (
				<Card
					key={item.title}
					className="relative group overflow-hidden h-80 rounded-3xl shadow-xl bg-cover bg-center transition-transform duration-300 hover:scale-105"
					style={{
						backgroundImage: `url('${item.image}')`,
					}}
				>
					{/* Overlay */}
					<div className="absolute inset-0 bg-black/40 rounded-3xl z-0 transition duration-300 group-hover:bg-black/60" />
					{/* Content */}
					<div className="relative z-10 flex flex-col h-full justify-end">
						<div className="p-6 text-left">
							<h3 className="text-2xl font-extrabold text-white drop-shadow-lg">
								{item.title}
							</h3>
						</div>
					</div>
				</Card>
			))}
		</div>
	);
}

export { InfoCard };