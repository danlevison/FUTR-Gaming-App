import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { useRemoveGameFromCollectionMutation } from "@/redux/features/collectionsApiSlice"
import { FaRegTrashAlt } from "react-icons/fa"
import useUser from "@/hooks/useUser"
import type { GameT } from "@/types"

type RemoveGameCardBtnProps = {
	game: GameT
	collectionId: string | string[]
}

export default function RemoveGameCardBtn({
	game,
	collectionId
}: RemoveGameCardBtnProps) {
	const user = useUser()
	const [removeGameFromCollection] = useRemoveGameFromCollectionMutation()
	const { toast } = useToast()

	const handleRemoveGameFromCollection = async (
		gameData: GameT,
		userId: string,
		collectionId: string
	) => {
		try {
			await removeGameFromCollection({
				data: gameData,
				userId: userId,
				collectionId: collectionId
			})
			toast({
				variant: "default",
				description: "Game successfully removed from your collection."
			})
		} catch (error) {
			console.error(error)
			toast({
				variant: "destructive",
				description:
					"Error: Unable to remove game from your collection, please try again."
			})
		}
	}
	return (
		<Button
			onClick={() =>
				handleRemoveGameFromCollection(
					{ ...game },
					user?.uid as string,
					collectionId as string
				)
			}
			variant={"ghost"}
			aria-label="Delete collection"
		>
			<FaRegTrashAlt size={17} />
		</Button>
	)
}
