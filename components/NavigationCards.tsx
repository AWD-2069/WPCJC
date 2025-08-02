import { Card } from "@/components/ui/card";

export interface NavigationCardItem {
	title: string;
	image?: string;
	link?: string;
}

export function NavigationCards({ items }: { items: NavigationCardItem[] }) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-2 sm:mx-8 mt-10">
				{items.map((item) => (
					item.link ? (
						<a
							key={item.title}
							href={item.link}
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
						</a>
					) : (
						<div
							key={item.title}
							className="relative group overflow-hidden h-80 rounded-3xl shadow-xl bg-cover bg-center"
							style={{
								backgroundImage: `url('${item.image}')`,
							}}
						>
							{/* Overlay */}
							<div className="absolute inset-0 bg-black/40 rounded-3xl z-0" />
							{/* Content */}
							<div className="relative z-10 flex flex-col h-full justify-end">
								<div className="p-6 text-left">
									<h3 className="text-2xl font-extrabold text-white drop-shadow-lg">
										{item.title}
									</h3>
								</div>
							</div>
						</div>
					)
				))}
			</div>
		);
	}

