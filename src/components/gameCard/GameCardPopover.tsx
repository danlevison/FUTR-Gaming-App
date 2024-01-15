import { useState } from "react"
import { useParams, usePathname } from "next/navigation"
import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import { BsThreeDots } from "react-icons/bs"
import {
	useAddGameToWishlistMutation,
	useRemoveGameFromWishlistMutation
} from "@/redux/features/wishlistApiSlice"
import { useUpdateCollectionBgMutation } from "@/redux/features/collectionsApiSlice"
import type { GameT, UserT } from "@/types"

type GameCardPopoverProps = {
	user: UserT
	game: GameT
	ownerId?: string
	collectionId: string | string[]
}

export default function GameCardPopover({
	user,
	game,
	ownerId,
	collectionId
}: GameCardPopoverProps) {
	const [open, setOpen] = useState(false)
	const [addGameToWishlist] = useAddGameToWishlistMutation()
	const [removeGameFromWishlist] = useRemoveGameFromWishlistMutation()
	const [updateCollectionBg] = useUpdateCollectionBgMutation()
	const { wishlist_id } = useParams()
	const { toast } = useToast()
	const pathname = usePathname()

	const handleAddGameToWishlist = async (gameData: GameT) => {
		try {
			await addGameToWishlist({
				data: gameData,
				userId: user?.uid,
				owner: user?.displayName,
				ownerId: user?.uid,
				wishlistId: user?.uid
			})
			toast({
				variant: "default",
				description: "Game successfully added to your wishlist."
			})
		} catch (error) {
			console.error(error)
			toast({
				variant: "destructive",
				description:
					"Error: Unable to add game to your wishlist, please try again."
			})
		} finally {
			setOpen(false)
		}
	}

	const handleRemoveGameFromWishlist = async (gameData: GameT) => {
		try {
			await removeGameFromWishlist({
				data: gameData,
				userId: user?.uid,
				wishlistId: wishlist_id
			})
			toast({
				variant: "default",
				description: "Game successfully removed from your wishlist."
			})
		} catch (error) {
			console.error(error)
			toast({
				variant: "destructive",
				description:
					"Error: Unable to remove game from your wishlist, please try again."
			})
		}
	}

	const changeCollectionBg = async (gameBgImage: string) => {
		try {
			await updateCollectionBg({
				data: gameBgImage,
				userId: user?.uid,
				collectionId: collectionId
			})
		} catch (error) {
			console.error(error)
			toast({
				variant: "destructive",
				description: "Error: Unable to set collection background"
			})
		} finally {
			setOpen(false)
		}
	}
	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger className="hover:bg-accent hover:text-accent-foreground duration-150 h-10 px-4 py-2 rounded-md">
				<BsThreeDots />
			</PopoverTrigger>
			<PopoverContent
				align="end"
				className="p-0 rounded-none w-full max-w-[240px]"
			>
				{pathname.includes("wishlist") && user?.uid === ownerId ? (
					<Button
						onClick={() => handleRemoveGameFromWishlist({ ...game })}
						className="w-full rounded-none"
					>
						Remove from wishlist
					</Button>
				) : (
					<Button
						onClick={() => handleAddGameToWishlist({ ...game })}
						className="w-full rounded-none"
					>
						Add to your wishlist ❤️
					</Button>
				)}
				{pathname.includes("collections") && user?.uid === ownerId && (
					<Button
						onClick={() => changeCollectionBg(game.background_image)}
						className="w-full rounded-none"
					>
						Set as collection background
					</Button>
				)}
			</PopoverContent>
		</Popover>
	)
}
