import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import placeholder from "@/../public/assets/placeholder.png"
import { BsStar } from "react-icons/bs"
import { platformIcons } from "@/utils/platformIcons"
//types
import { GameT } from "@/types"

export default function GameCard({ game }: { game: GameT }) {
	return (
		<Card className="flex flex-col justify-between bg-[#15142e] text-primaryText">
			<div className="relative">
				<Image
					src={game?.background_image || placeholder}
					alt={game?.name}
					width={400}
					height={250}
					style={{ objectFit: "cover" }}
					className="w-full h-[250px] rounded-t-md"
				/>
				<div className="absolute bottom-1 left-2 flex justify-center items-center bg-white w-20 text-black font-bold rounded-3xl">
					{game?.ratings_count}
					<BsStar
						className="ms-1"
						size={12}
					/>
				</div>
			</div>

			<CardContent className="flex flex-col p-4">
				<div className="flex items-center gap-1">
					{game.parent_platforms?.map(({ platform }) => (
						<span key={platform.id}>{platformIcons[platform.name]}</span>
					))}
				</div>

				<h4 className="uppercase text-lg font-bold tracking-wide hover:underline mt-2">
					<Link
						href={`/games/${game?.id}`}
						className=""
					>
						{game?.name}
					</Link>
				</h4>
				<div className="text-gray-400 text-sm">
					<div className="mt-5">
						<div className="flex items-center">
							<p className="font-bold">Release Date: &nbsp;</p>
							<p className="details-item-value">{game?.released} </p>
						</div>
						<ul className="flex items-center gap-2">
							{game.genres?.slice(0, 3).map((genre) => (
								<li key={genre.name}>{genre.name}</li>
							))}
						</ul>
					</div>
				</div>
			</CardContent>
			<CardFooter className="p-0 m-0">
				<button className="w-full bg-accentPrimary rounded-b-lg p-2 font-bold">
					Add to collection
				</button>
			</CardFooter>
		</Card>
	)
}
