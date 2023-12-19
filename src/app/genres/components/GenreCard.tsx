import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import placeholder from "@/../public/assets/placeholder.png"
import { BsStar } from "react-icons/bs"
//types
import { GenresT } from "@/types"

export default function GameCard({ genre }: { genre: GenresT }) {
	return (
		<Card className="relative flex items-center text-primaryText h-[150px]">
			<Image
				src={genre.image_background || placeholder}
				alt={genre.name}
				width={100}
				height={100}
				style={{ objectFit: "cover" }}
				className="absolute w-full h-full rounded-lg"
			/>
			<Link
				href={`genres/${genre.slug}`}
				className="flex flex-col justify-between gap-4 h-full w-full rounded-md bg-primary/80 p-4 backdrop-blur-[2px] backdrop-filter transition-all duration-300 hover:cursor-pointer hover:bg-primary/20 hover:backdrop-blur-sm"
			>
				<span className="capitalize text-xl">{genre?.name}</span>

				<span className="text-sm text-white/50">
					Games count: {genre?.games_count}
				</span>
			</Link>
		</Card>
	)
}
