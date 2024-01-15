import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { currentUser } from "@/redux/features/authSlice"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import placeholder from "@/../public/assets/placeholder.png"
import { BsStar } from "react-icons/bs"
import { BiChevronDown } from "react-icons/bi"
import { platformIcons } from "@/utils/platformIcons"
import CollectionsDropdown from "../CollectionsDropdown"
import GameCardPopover from "./GameCardPopover"
import RemoveGameCardBtn from "./RemoveGameCardBtn"
import type { GameT } from "@/types"

type GameCardProps = {
	game: GameT
	ownerId?: string
}

export default function GameCard({ game, ownerId }: GameCardProps) {
	const user = useSelector(currentUser)
	const [showCollections, setShowCollections] = useState(false)
	const pathname = usePathname()
	const { collection_id } = useParams()

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

			<CardContent className="relative flex flex-col p-4">
				<div className="flex items-center gap-1">
					{game.parent_platforms?.map(({ platform }) => (
						<span key={platform.id}>{platformIcons[platform.name]}</span>
					))}
				</div>

				{user && (
					<div className="absolute top-1 right-1 flex items-center">
						<GameCardPopover
							user={user}
							game={game}
							ownerId={ownerId}
							collectionId={collection_id}
						/>
						{pathname.includes("collections") && user?.uid === ownerId && (
							<RemoveGameCardBtn
								game={game}
								user={user}
								collectionId={collection_id}
							/>
						)}
					</div>
				)}

				<h4 className="w-fit uppercase text-lg font-bold tracking-wide hover:underline mt-3">
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
							{game.genres?.slice(0, 3).map((genre, idx, array) => (
								<li key={genre.name}>
									<Link
										href={`/genres/${genre.slug}`}
										className="underline hover:text-primaryText duration-300"
									>
										{genre.name + (idx < array.length - 1 ? "," : "")}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</CardContent>

			{pathname.includes("collections") ? null : (
				<CardFooter className="flex flex-col p-0 m-0">
					<button
						onClick={() => setShowCollections(!showCollections)}
						className={`flex justify-center items-center w-full bg-accentPrimary rounded-b-lg ${
							showCollections && "rounded-b-none"
						} p-2 font-bold`}
					>
						Collections <BiChevronDown size={25} />
					</button>
					<CollectionsDropdown
						showCollections={showCollections}
						user={user}
						game={game}
					/>
				</CardFooter>
			)}
		</Card>
	)
}
