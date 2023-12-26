import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSelector } from "react-redux"
import { currentUser } from "@/redux/features/authSlice"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import placeholder from "@/../public/assets/placeholder.png"
import { BsStar } from "react-icons/bs"
import { BiChevronDown } from "react-icons/bi"
import { FaFolderPlus } from "react-icons/fa"
import { platformIcons } from "@/utils/platformIcons"
import {
	useAddGamesToCollectionMutation,
	useFetchCollectionsQuery
} from "@/redux/features/collectionsApiSlice"
import { useToast } from "./ui/use-toast"
//types
import { GameT, UserT } from "@/types"

export default function GameCard({ game }: { game: GameT }) {
	const user = useSelector(currentUser)
	const [showCollections, setShowCollections] = useState(false)

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
			<CardFooter className="flex flex-col p-0 m-0">
				<button
					onClick={() => setShowCollections(!showCollections)}
					className={`flex justify-center items-center w-full bg-accentPrimary rounded-b-lg ${
						showCollections && "rounded-b-none"
					} p-2 font-bold`}
				>
					Collections <BiChevronDown size={25} />
				</button>
				<CollectionDropdown
					showCollections={showCollections}
					user={user}
					game={game}
				/>
			</CardFooter>
		</Card>
	)
}

function CollectionDropdown({
	showCollections,
	user,
	game
}: {
	showCollections: boolean
	user: UserT
	game: GameT
}) {
	const {
		data: collectionsData,
		isLoading,
		isFetching,
		isError
	} = useFetchCollectionsQuery({ userId: user?.uid })
	const [addGamesToCollection] = useAddGamesToCollectionMutation()
	const { toast } = useToast()

	const handleAddGameToCollection = async (
		gameData: GameT,
		userId: string,
		collectionId: string
	) => {
		try {
			await addGamesToCollection({
				data: {
					id: gameData.id,
					name: gameData.name,
					background_image: gameData.background_image
				},
				userId: userId,
				collectionId: collectionId
			})
			toast({
				variant: "default",
				description: "Game successfully added to your collection."
			})
		} catch (error) {
			console.error(error)
			toast({
				variant: "destructive",
				description: "Error: unable to add game to your collection."
			})
		}
	}

	return (
		<>
			{showCollections && user && (
				<div className="px-5 w-full">
					{collectionsData?.map((collection) => (
						<button
							key={collection.id}
							onClick={() =>
								handleAddGameToCollection(
									{
										id: game.id as string,
										name: game.name,
										background_image: game.background_image,
										slug: game.slug
									},
									user.uid,
									collection.id
								)
							}
							className="flex items-center gap-2 bg-gray-500 text-start text-lg font-bold w-full p-3 mt-4 rounded-md hover:opacity-70 duration-300"
						>
							<FaFolderPlus /> {collection.title}
						</button>
					))}
				</div>
			)}
			{showCollections && (
				<div className="p-4">
					<Link
						href={"/collections"}
						className="underline"
					>
						Start New Collection
					</Link>
				</div>
			)}
		</>
	)
}
