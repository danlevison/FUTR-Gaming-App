import { useState } from "react"
//types
import { GameT } from "@/types"

export default function Description({ gameData }: { gameData: GameT }) {
	const [showMore, setShowMore] = useState(false)

	const displayDescription = showMore
		? gameData.description
		: `${gameData.description!.slice(0, 200)}...`
	return (
		<>
			<h3 className="font-bold text-gray-500 text-xl">About</h3>
			<p
				dangerouslySetInnerHTML={{ __html: displayDescription || "" }}
				className="space-y-4"
			/>
			<button
				onClick={() => setShowMore(!showMore)}
				className="mt-2 bg-white text-black text-sm rounded-sm p-[0.15rem] hover:opacity-60 duration-300"
			>
				{showMore ? "Show Less" : "Read More"}
			</button>
		</>
	)
}
