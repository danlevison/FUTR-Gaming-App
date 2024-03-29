import { useState } from "react"
import Link from "next/link"
import { useAddGameToWishlistMutation } from "@/redux/features/wishlistApiSlice"
import { Button } from "@/components/ui/button"
import { BiChevronDown } from "react-icons/bi"
import CollectionsDropdown from "@/components/CollectionsDropdown"
import { useToast } from "@/components/ui/use-toast"
import useUser from "@/hooks/useUser"
import type { GameT } from "@/types"

export default function Collections({ gameData }: { gameData: GameT }) {
	const user = useUser()
	const [showCollections, setShowCollections] = useState(false)
	const [addGameToWishlist] = useAddGameToWishlistMutation()
	const { toast } = useToast()

	const handleAddGameToWishlist = async (gameData: GameT) => {
		try {
			await addGameToWishlist({
				data: gameData,
				userId: user?.uid as string,
				owner: user?.displayName as string,
				ownerId: user?.uid as string,
				wishlistId: user?.uid as string
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
		}
	}

	return (
		<div
			className={`${showCollections ? "bg-foreground" : ""} mt-5 rounded-b-md`}
		>
			<div className="flex items-center gap-5">
				{user ? (
					<Button
						onClick={() => handleAddGameToWishlist({ ...gameData })}
						variant={"outline"}
						className={`w-full text-base font-bold h-12 duration-300 ${
							showCollections && "rounded-b-none"
						}`}
					>
						Add to wishlist ❤️
					</Button>
				) : (
					<Link
						href={"/wishlist"}
						className="w-full text-center font-bold border-input border h-12 px-4 py-3 rounded-md bg-background hover:bg-accent hover:text-accent-foreground duration-300"
					>
						Add to wishlist ❤️
					</Link>
				)}
				<Button
					onClick={() => setShowCollections(!showCollections)}
					variant={"outline"}
					className={`w-full text-base font-bold h-12 duration-300 ${
						showCollections && "rounded-b-none"
					}`}
				>
					Collections <BiChevronDown size={25} />
				</Button>
			</div>
			<CollectionsDropdown
				showCollections={showCollections}
				game={gameData}
			/>
		</div>
	)
}
