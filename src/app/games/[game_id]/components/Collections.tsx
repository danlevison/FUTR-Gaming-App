import { useState } from "react"
import { useSelector } from "react-redux"
import { currentUser } from "@/redux/features/authSlice"
import { Button } from "@/components/ui/button"
import { BiChevronDown } from "react-icons/bi"
import CollectionsDropdown from "@/components/CollectionsDropdown"
//types
import { GameT } from "@/types"

export default function Collections({ gameData }: { gameData: GameT }) {
	const user = useSelector(currentUser)
	const [showCollections, setShowCollections] = useState(false)
	return (
		<div className="bg-foreground mt-5 rounded-b-md">
			<Button
				onClick={() => setShowCollections(!showCollections)}
				variant={"outline"}
				className={`w-full text-base font-bold h-12 duration-300 ${
					showCollections && "rounded-b-none"
				}`}
			>
				Collections <BiChevronDown size={25} />
			</Button>
			<CollectionsDropdown
				showCollections={showCollections}
				user={user}
				game={gameData}
			/>
		</div>
	)
}
