import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import placeholder from "@/../public/assets/placeholder.png"
import { usePathname } from "next/navigation"
//types
import { PageItemT } from "@/types"

export default function PageItemCard<T extends PageItemT>({
	item
}: {
	item: T
}) {
	const pathname = usePathname()

	return (
		<Card className="relative flex items-center text-primaryText h-[150px]">
			<Image
				src={item.image_background || placeholder}
				alt={item.name}
				fill
				style={{ objectFit: "cover" }}
				className="absolute w-full h-full rounded-lg"
			/>
			<Link
				href={`${pathname}/${item.slug}`}
				className="flex flex-col justify-between gap-4 h-full w-full rounded-md bg-primary/80 p-4 backdrop-blur-[2px] backdrop-filter transition-all duration-300 hover:cursor-pointer hover:bg-primary/20 hover:backdrop-blur-sm"
			>
				<span className="capitalize text-xl">{item?.name}</span>

				<span className="text-sm text-white/50">
					Games count: {item?.games_count}
				</span>
			</Link>
		</Card>
	)
}
