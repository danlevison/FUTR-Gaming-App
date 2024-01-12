import Link from "next/link"
import {
	useFetchCollectionsQuery,
	useAddGameToCollectionMutation
} from "@/redux/features/collectionsApiSlice"
import { useToast } from "./ui/use-toast"
import { FaFolderPlus } from "react-icons/fa"
import type { UserT, GameT } from "@/types"

export default function CollectionsDropdown({
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
	} = useFetchCollectionsQuery({ userId: user?.uid as string })
	const [addGameToCollection] = useAddGameToCollectionMutation()
	const { toast } = useToast()

	const handleAddGameToCollection = async (
		gameData: GameT,
		userId: string,
		collectionId: string
	) => {
		try {
			await addGameToCollection({
				data: gameData,
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
				description:
					"Error: Unable to add game to your collection, please try again."
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
								handleAddGameToCollection({ ...game }, user.uid, collection.id)
							}
							className="flex items-center gap-2 bg-gray-500 text-start text-lg font-bold w-full p-3 mt-4 rounded-md hover:opacity-70 duration-300"
						>
							<FaFolderPlus /> {collection.title}
						</button>
					))}
				</div>
			)}
			{showCollections && (
				<div className="flex justify-center p-4">
					<Link
						href={"/collections"}
						className="underline"
					>
						Start a new collection +
					</Link>
				</div>
			)}
		</>
	)
}
