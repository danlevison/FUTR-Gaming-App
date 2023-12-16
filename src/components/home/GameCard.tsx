import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { BsStar } from "react-icons/bs"
import { GameT } from "@/types"

export default function GameCard({ game }: { game: GameT }) {
	return (
		<Card className="bg-[#15142e] text-primaryText">
			<div className="relative">
				<Image
					src={game?.background_image}
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
				<h4 className="uppercase text-lg font-bold tracking-wide hover:underline ">
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
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	)
}
